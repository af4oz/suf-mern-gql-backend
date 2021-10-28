import { DocumentType, getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Ref } from '../types';
import schemaCleaner from '../utils/schemaCleaner';
import { Author, VoteType } from './';
import { Comment } from './Comment';
import { Question } from './Question';
import { User } from './User';

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner,
    toObject: {
      virtuals: true
    }
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
    justOne: false,
    default: []
  })
  comments?: Ref<Comment>[];

  @Field(type => Int)
  @prop({ default: 0 })
  points: number;

  @prop({
    ref: () => 'AnswerVotes',
    foreignField: 'ansId',
    localField: '_id',
    justOne: false,
    count: true,
    match: {
      vote: { $eq: VoteType.UPVOTE }
    }
  })
  upvoteCount: number;

  @prop({
    ref: () => 'AnswerVotes',
    foreignField: 'ansId',
    localField: '_id',
    justOne: false,
    count: true,
    match: {
      vote: { $eq: VoteType.DOWNVOTE }
    }
  })
  downvoteCount: number;

  @Field(type => Date)
  @prop({ default: Date })
  createdAt?: Date;

  @Field(type => Date)
  @prop({ default: Date })
  updatedAt?: Date;

  @prop({ required: true, ref: () => 'Question' })
  question: Ref<Question>;

  @prop({ default: '_id' })
  local?: string;

  @prop({ default: 'Comment' })
  from?: string;
}

export const AnswerModel = getModelForClass(Answer);
