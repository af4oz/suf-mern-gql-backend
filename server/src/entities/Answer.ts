import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Schema, Types } from 'mongoose';
import { Field, ID, Int, ObjectType } from 'type-graphql';
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
  @prop({
    ref: () => (doc: DocumentType<Answer>) => doc.from!,
    foreignField: () => 'parentId',
    localField: (doc: DocumentType<Answer>) => doc.local,
    justOne: false
  })
  comments?: Ref<Comment>[];

  @Field()
  @prop({ default: 0 })
  points?: number;

  @Field(type => Int)
  @prop({ default: 0 })
  upvoteCount: number;

  @Field(type => Int)
  @prop({ default: 0 })
  downvoteCount: number;

  @Field(type => Date)
  @prop({ default: Date })
  createdAt?: Date;

  @Field(type => Date)
  @prop({ default: Date })
  updatedAt?: Date;

  @prop({ required: true })
  parentId: Types.ObjectId;

  @prop({ default: '_id' })
  local?: string;

  @prop({ default: 'Comment' })
  from?: string;
}

export const AnswerModel = getModelForClass(Answer);
