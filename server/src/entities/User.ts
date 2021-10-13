import { prop, plugin, modelOptions, getModelForClass } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator'
import schemaCleaner from '../utils/schemaCleaner'
import { Field, ID, Int, ObjectType, registerEnumType, Root } from 'type-graphql';
import { Answer } from './Answer';
import { Question } from './Question';
import { ObjectId } from 'mongodb';
import { Ref } from '../types';

@ObjectType()
class QuestionRep {
  @Field()
  @prop({ ref: () => Question })
  quesId: Ref<Question>

  @Field({ nullable: true })
  @prop({ default: 0 })
  rep?: number;
}


@ObjectType()
class AnswerRep {
  @Field()
  @prop({ ref: () => Answer })
  ansId: Ref<Answer>

  @Field({ nullable: true })
  @prop({ default: 0 })
  rep?: number
}

@ObjectType()
export class RecentActivity {
  @Field(() => ID)
  readonly id: string;

  @Field()
  title: string

  @Field()
  points: number

  @Field()
  createdAt: number
}

enum RoleType {
  USER = 'user',
  ADMIN = 'admin'
}
registerEnumType(RoleType, {
  name: 'RoleType'
})

@ObjectType()
export class LoggedUser {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  token: string;

  @Field()
  role: RoleType
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
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

  @Field()
  @prop({ default: RoleType.USER })
  role: RoleType;

  @Field({ nullable: 'items' })
  @prop({ default: [] })
  questions: QuestionRep[];

  @Field({ nullable: 'items' })
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
  totalQuestions(): number {
    return this.questions.length;
  }

  @Field(() => Int)
  totalAnswers(): number {
    return this.answers.length;
  }
}

export const UserModel = getModelForClass(User)
