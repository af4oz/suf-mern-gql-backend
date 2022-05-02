import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Severity,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import uniqueValidator from 'mongoose-unique-validator'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Ref } from '../types'
import schemaCleaner from '../utils/schemaCleaner'
import { RoleType } from './'
import { Answer } from './Answer'
import { Question } from './Question'

@ObjectType()
export class RecentActivity {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field()
  title: string

  @Field((type) => Int)
  points: number

  @Field((type) => Date)
  createdAt: Date
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    toJSON: schemaCleaner,
    toObject: schemaCleaner,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@plugin(uniqueValidator)
export class User {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field()
  @prop({
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    unique: true,
  })
  username: string

  @prop({ required: true })
  passwordHash: string

  @Field((type) => RoleType)
  @prop({ default: 'user' })
  role: RoleType

  @Field((type) => [Question], { nullable: 'items' })
  @prop({
    ref: () => Question,
    foreignField: 'author',
    localField: '_id',
  })
  questions: Ref<Question>[]

  @Field((type) => [Answer], { nullable: 'items' })
  @prop({
    ref: () => Answer,
    foreignField: 'author',
    localField: '_id',
  })
  answers: Ref<Answer>[]

  @Field((type) => Date)
  @prop({ default: Date })
  createdAt: Date

  @Field(() => Int, { nullable: false })
  @prop({ default: 1 })
  rep: number

  @Field((type) => [RecentActivity], { nullable: 'items' })
  recentQuestions: RecentActivity[]

  @Field((type) => [RecentActivity], { nullable: 'items' })
  recentAnswers: RecentActivity[]

  @Field(() => Int)
  totalQuestions: number

  @Field(() => Int)
  totalAnswers: number
}

export const UserModel = getModelForClass(User)
