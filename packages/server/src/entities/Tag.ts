import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import { ObjectType, Field, ID, Int } from 'type-graphql'
import schemaCleaner from '../utils/schemaCleaner'

@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner,
  },
})
@ObjectType()
export class Tag {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field()
  @prop({ required: true, trim: true })
  name: string

  @Field((type) => Int)
  @prop({ default: 0, min: 0 })
  questionCount: number
}

export const TagModel = getModelForClass(Tag)
