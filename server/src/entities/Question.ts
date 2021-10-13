import mongoose from 'mongoose'
import schemaCleaner from '../utils/schemaCleaner'
import { Field, ID, Int, ObjectType, Root } from 'type-graphql';
import { Ref } from '../types';
import { User } from './User';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Comment } from './Comment';
import { Answer } from './Answer';
import { ObjectId } from 'mongodb';

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
  }
})
@ObjectType()
export class Question {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => ID)
  id: string;

  @Field(type => User)
  @prop({ ref: () => User, required: true })
  author: Ref<User>;

  @Field()
  @prop({ required: true, trim: true, minlength: 15 })
  title: string;

  @Field()
  @prop({ required: true, trim: true, minlength: 30 })
  body: string;

  @Field()
  @prop({ type: () => [String], required: true, trim: true })
  tags: [string];

  @Field(type => [Comment], { nullable: 'items' })
  @prop({ ref: () => Comment, default: [] })
  comments: Ref<Comment>[];

  @Field(type => [Answer], { nullable: 'items' })
  @prop({ ref: () => Answer, default: [] })
  answers: Ref<Answer>[];

  @Field(type => Int)
  answerCount(@Root() question: Question): number {
    return question.answers.length;
  }

  @Field()
  @prop({ default: 0 })
  points: number;

  @Field(type => [User], { nullable: 'items' })
  @prop({ ref: () => User, default: [] })
  upvotedBy: Ref<User>[];

  @Field(type => [User], { nullable: 'items' })
  @prop({ ref: () => User, default: [] })
  downvotedBy: Ref<User>[];

  @Field()
  @prop({ default: 0 })
  views: number;

  @Field()
  @prop({ default: Date.now })
  hotAlgo: number;

  @Field(type => Answer)
  @prop({ ref: () => Answer })
  acceptedAnswer?: Ref<Answer>

  @Field()
  @prop({ default: Date.now })
  createdAt: number;

  @Field()
  @prop({ default: Date.now })
  updatedAt: number;
}

export const QuestionModel = getModelForClass(Question)