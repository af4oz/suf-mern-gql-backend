import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ID, ObjectType } from 'type-graphql'
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

  @Field(type => User)
  @prop({ required: true })
  author: Ref<User>;

  @Field()
  @prop({ required: true, trim: true, minlength: 5 })
  body: string;

  @Field(type => Date, { nullable: false })
  @prop({ default: Date })
  createdAt?: Date;

  @Field(type => Date, { nullable: false })
  @prop({ default: Date })
  updatedAt?: Date;
}


export const CommentModel = getModelForClass(Comment);