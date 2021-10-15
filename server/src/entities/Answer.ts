import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Author } from './';
import { Ref } from '../types';
import schemaCleaner from '../utils/schemaCleaner';
import { Comment } from './Comment';
import { User } from './User';

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
  },
  options: {
    allowMixed: Severity.ALLOW
  },
})
@ObjectType()
export class Answer {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(type => Author)
  @prop({ ref: () => 'User', required: true, type: Schema.Types.ObjectId })
  author: Ref<User>;

  @Field()
  @prop({ required: true, tirm: true, minlength: 30 })
  body: string

  @Field(type => [Comment], { nullable: 'items' })
  @prop({ ref: () => 'Comment', default: [] })
  comments?: Ref<Comment>[]

  @Field()
  @prop({ default: 0 })
  points?: number;

  @Field(type => [ID], { nullable: 'items' })
  @prop({ ref: () => 'User', default: [] })
  upvotedBy: Ref<User>[]

  @Field(type => [ID], { nullable: 'items' })
  @prop({ ref: () => 'User', default: [] })
  downvotedBy: Ref<User>[]

  @Field(type => Date)
  @prop({ default: Date })
  createdAt?: Date;

  @Field(type => Date)
  @prop({ default: Date })
  updatedAt?: Date;
}

export const AnswerModel = getModelForClass(Answer);
