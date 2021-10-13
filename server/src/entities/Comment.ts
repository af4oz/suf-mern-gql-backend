import { addModelToTypegoose, buildSchema, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Field, ObjectType } from 'type-graphql'
import { Ref } from '../types'
import schemaCleaner from '../utils/schemaCleaner'
import { User } from "./User";

@ObjectType()
export class Comment {

  @Field(type => User)
  @prop({ required: true })
  author!: Ref<User>;

  @Field()
  @prop({ required: true, trim: true, minlength: 5 })
  body!: string;

  @Field()
  @prop({ default: Date.now })
  createdAt?: Date

  @Field()
  @prop({ default: Date.now })
  updatedAt?: Date
}

const commentSchema = buildSchema(Comment)
schemaCleaner(commentSchema)

export const CommentModel = addModelToTypegoose(mongoose.model('Comment', commentSchema), Comment);
