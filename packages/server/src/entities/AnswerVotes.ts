import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'
import schemaCleaner from '../utils/schemaCleaner'
import { VoteType } from './'

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@ObjectType()
export class AnswerVotes {
  readonly _id: ObjectId

  @Field((type) => ID)
  @prop({ required: true })
  userId: Types.ObjectId

  @Field((type) => ID)
  @prop({ required: true })
  ansId: Types.ObjectId

  @Field((type) => VoteType)
  @prop({ required: true })
  vote: VoteType
}

export const AnswerVotesModel = getModelForClass(AnswerVotes)
