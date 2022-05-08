import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Schema, Types } from 'mongoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { Ref } from '../types'
import schemaCleaner from '../utils/schemaCleaner'
import { Author } from './common'
import { User } from './User'

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@ObjectType()
export class Comment {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field((type) => Author)
  @prop({ required: true, type: Schema.Types.ObjectId })
  author: Ref<User>

  @Field()
  @prop({ required: true, trim: true, minlength: 15 })
  body: string

  @Field((type) => Date, { nullable: false })
  @prop({ default: Date })
  createdAt?: Date

  @Field((type) => Date, { nullable: false })
  @prop({ default: Date })
  updatedAt?: Date

  @prop({ required: true })
  parentId: Types.ObjectId
}

export const CommentModel = getModelForClass(Comment)

export enum CommentParentType {
  Question = 'question',
  Answer = 'answer',
}

registerEnumType(CommentParentType, {
  name: 'CommentParentType',
})
