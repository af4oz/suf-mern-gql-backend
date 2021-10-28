import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { Author, VoteType } from '.';
import { Ref } from '../types';
import schemaCleaner from '../utils/schemaCleaner';
import { Answer } from './Answer';
import { Comment } from './Comment';
import { User } from './User';

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner,
    toObject: {
      virtuals: true
    },
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
  @prop({
    ref: () => (doc: DocumentType<Question>) => doc.from!,
    foreignField: () => 'parentId',
    localField: (doc: DocumentType<Question>) => doc.local,
    justOne: false,
    default: []
  })
  comments?: Ref<Comment>[];

  @Field(type => [Answer], { nullable: 'items' })
  @prop({
    ref: () => 'Answer',
    foreignField: 'question',
    localField: '_id',
    justOne: false,
    default: []
  })
  answers?: Ref<Answer>[];

  @Field(type => Int)
  @prop({
    ref: () => 'Answer',
    foreignField: 'question',
    localField: '_id',
    justOne: false,
    count: true,
    default: 0
  })
  answerCount: number;

  @Field(type => Int)
  @prop({ default: 0 })
  points: number;

  @prop({
    ref: () => 'QuestionVotes',
    foreignField: 'quesId',
    localField: '_id',
    justOne: false,
    count: true,
    match: {
      vote: { $eq: VoteType.UPVOTE }
    }
  })
  upvoteCount: number;

  @prop({
    ref: () => 'QuestionVotes',
    foreignField: 'quesId',
    localField: '_id',
    justOne: false,
    count: true,
    match: {
      vote: { $eq: VoteType.DOWNVOTE }
    }
  })
  downvoteCount: number;

  @Field(type => Int)
  @prop({ default: 0 })
  views: number;

  @Field(type => Float)
  hotAlgo: number

  @Field(type => ID, { nullable: true })
  @prop({ ref: () => "Answer", type: Schema.Types.ObjectId })
  acceptedAnswer?: Ref<Answer>

  @Field(type => Date)
  @prop({ default: Date })
  createdAt: Date;

  @Field(type => Date)
  @prop({ default: Date })
  updatedAt: Date;

  @prop({ default: '_id' })
  local?: string;

  @prop({ default: 'Comment' })
  from?: string;
}

export const QuestionModel = getModelForClass(Question)