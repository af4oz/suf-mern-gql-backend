import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { Field, ID, Int, ObjectType, Root } from 'type-graphql';
import { Author } from '.';
import { Ref } from '../types';
import schemaCleaner from '../utils/schemaCleaner';
import { Answer } from './Answer';
import { Comment } from './Comment';
import { User } from './User';

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
  }
})
@ObjectType()
export class Question {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(type => Author)
  @prop({ ref: () => 'User', required: true })
  author: Ref<User>;

  @Field()
  @prop({ required: true, trim: true, minlength: 15 })
  title: string;

  @Field()
  @prop({ required: true, trim: true, minlength: 30 })
  body: string;

  @Field(type => [String])
  @prop({ type: () => [String], required: true, trim: true })
  tags: [string];

  @Field(type => [Comment], { nullable: 'items' })
  @prop({ ref: () => 'Comment', default: [] })
  comments: Ref<Comment>[];

  @Field(type => [Answer], { nullable: 'items' })
  @prop({ ref: () => 'Answer', default: [], type: Schema.Types.ObjectId })
  answers: Ref<Answer>[];

  @Field(type => Int)
  answerCount(@Root() question: Question): number {
    return question.answers.length;
  }

  @Field(type => Int)
  @prop({ default: 0 })
  points: number;

  @Field(type => [ID], { nullable: 'items' })
  @prop({ ref: () => "User", default: [] })
  upvotedBy: Ref<User>[];

  @Field(type => [ID], { nullable: 'items' })
  @prop({ ref: () => "User", default: [] })
  downvotedBy: Ref<User>[];

  @Field(type => Int)
  @prop({ default: 0 })
  views: number;

  @Field()
  @prop({ default: Date.now })
  hotAlgo: number;

  @Field(type => ID, { nullable: true })
  @prop({ ref: () => "Answer", type: Schema.Types.ObjectId })
  acceptedAnswer?: Ref<Answer>

  @Field(type => Date)
  @prop({ default: Date })
  createdAt: Date;

  @Field(type => Date)
  @prop({ default: Date })
  updatedAt: Date;
}

export const QuestionModel = getModelForClass(Question)