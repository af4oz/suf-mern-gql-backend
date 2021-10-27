import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { Field, Float, ID, Int, ObjectType, Root } from 'type-graphql';
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
  @prop({
    ref: () => (doc: DocumentType<Question>) => doc.from!,
    foreignField: () => 'parentId',
    localField: (doc: DocumentType<Question>) => doc.local,
    justOne: false
  })
  comments?: Ref<Comment>[];

  @Field(type => [Answer], { nullable: 'items' })
  @prop({
    ref: () => Answer,
    foreignField: 'quesId',
    localField: '_id',
    justOne: false
  })
  answers?: Ref<Answer>[];

  @Field(type => Int)
  answerCount(@Root() question: Question): number {
    if (!question.answers) return 0;
    return question.answers.length;
  }

  @Field(type => Int)
  points(@Root() question: Question): number {
    return question.upvoteCount - question.downvoteCount;
  }

  @Field(type => Int)
  rep(@Root() question: Question): number {
    return question.upvoteCount * 10 - question.downvoteCount * 2;
  }

  @Field(type => Int)
  @prop({ default: 0 })
  upvoteCount: number;

  @Field(type => Int)
  @prop({ default: 0 })
  downvoteCount: number;

  @Field(type => Int)
  @prop({ default: 0 })
  views: number;

  @Field(type => Float)
  hotAlgo(@Root() question: Question): number {
    return Math.log(Math.max(Math.abs(question.upvoteCount - question.downvoteCount), 1)) +
      Math.log(Math.max(question.views * 2, 1)) +
      question.createdAt.getTime() / 4500;
  }

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