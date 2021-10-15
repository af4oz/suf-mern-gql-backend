import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'
import { Field, ID, ObjectType, Root } from 'type-graphql'
import { Author } from './'
import { Ref } from '../types'
import schemaCleaner from '../utils/schemaCleaner'
import { User } from "./User"

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner
  },
  options: {
    allowMixed: Severity.ALLOW
  }

})
@ObjectType()
export class Comment {

  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(type => Author)
  @prop({ required: true, type: Schema.Types.ObjectId })
  author: Ref<User>;

  @Field()
  @prop({ required: true, trim: true, minlength: 15 })
  body: string;

  @Field(type => Date, { nullable: false })
  @prop({ default: Date })
  createdAt?: Date;

  @Field(type => Date, { nullable: false })
  @prop({ default: Date })
  updatedAt?: Date;
}


export const CommentModel = getModelForClass(Comment);