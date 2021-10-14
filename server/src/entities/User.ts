import { prop, plugin, modelOptions, getModelForClass, Severity } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator'
import schemaCleaner from '../utils/schemaCleaner'
import { Field, ID, Int, ObjectType, Root } from 'type-graphql';
import { Answer } from './Answer';
import { Question } from './Question';
import { ObjectId } from 'mongodb';
import { Ref } from '../types';
import { RoleType } from './'

@ObjectType()
class QuestionRep {
  @Field(type => Question)
  @prop({ ref: () => Question })
  quesId: Ref<Question>

  @Field({ nullable: false })
  @prop({ default: 0 })
  rep?: number;
}


@ObjectType()
class AnswerRep {
  @Field(type => Answer)
  @prop({ ref: () => Answer })
  ansId: Ref<Answer>

  @Field({ nullable: false })
  @prop({ default: 0 })
  rep?: number
}

@ObjectType()
export class RecentActivity {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  title: string

  @Field(type => Int)
  points: number

  @Field(type => Date)
  createdAt: Date
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
@plugin(uniqueValidator)
export class User {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => ID)
  id: string;

  @Field()
  @prop({ required: true, minlength: 3, maxlength: 20, trim: true, unique: true })
  username: string;

  @prop({ required: true })
  passwordHash: string

  @Field(type => RoleType)
  @prop({ default: "user" })
  role: RoleType;

  @Field(type => [QuestionRep], { nullable: 'items' })
  @prop({ default: [] })
  questions: QuestionRep[];

  @Field(type => [AnswerRep], { nullable: 'items' })
  @prop({ default: [] })
  answers: AnswerRep[];

  @Field()
  @prop({ default: Date.now })
  createdAt: number;

  @Field(() => Int)
  reputation(@Root() parent: User): number {
    const questionRep = parent.questions.reduce((sum, q) => sum + q.rep!, 0)
    const answerRep = parent.answers.reduce((sum, a) => sum + a.rep!, 0)
    return 1 + questionRep + answerRep
  }

  @Field(type => [RecentActivity], { nullable: 'items' })
  recentQuestions: RecentActivity[];

  @Field(type => [RecentActivity], { nullable: 'items' })
  recentAnswers: RecentActivity[];

  @Field(() => Int)
  totalQuestions(@Root() user: User): number {
    return user.questions.length;
  }

  @Field(() => Int)
  totalAnswers(@Root() user: User): number {
    return user.answers.length;
  }
}

export const UserModel = getModelForClass(User)
