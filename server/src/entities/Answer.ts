import mongoose from 'mongoose'
import { addModelToTypegoose, buildSchema, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import schemaCleaner from '../utils/schemaCleaner'
import { User } from './User';
import { Comment } from './Comment';
import { Ref } from '../types';
import { ObjectId } from 'mongodb';

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
  }
})
@ObjectType()
export class Answer {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => ID)
  readonly id: string;

  @Field(type => User)
  @prop({ required: true })
  author: Ref<User>;

  @Field()
  @prop({ required: true, tirm: true, minlength: 30 })
  body: string

  @Field(type => [Comment], { nullable: 'items' })
  @prop({ type: () => Comment, default: [] })
  comments?: Ref<Comment>[]

  @Field()
  @prop({ default: 0 })
  points?: number;

  @Field(type => User, { nullable: 'items' })
  @prop({ ref: () => User, default: [] })
  upvotedBy?: Ref<User>[]

  @Field(type => User, { nullable: 'items' })
  @prop({ ref: () => User, default: [] })
  downvotedBy?: Ref<User>[]

  @Field()
  @prop({ default: Date.now })
  createdAt?: Date;

  @Field()
  @prop({ default: Date.now })
  updatedAt?: Date;
}

export const AnswerModel = getModelForClass(Answer);
