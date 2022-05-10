import {
  ArgsType,
  Field,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from 'type-graphql'

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin',
}
registerEnumType(RoleType, {
  name: 'RoleType',
})

export enum VoteType {
  DOWNVOTE = 'down',
  UPVOTE = 'up',
}
registerEnumType(VoteType, {
  name: 'VoteType',
})

export enum QuestionSortBy {
  HOT,
  VOTES,
  VIEWS,
  NEWEST,
  OLDEST,
}
registerEnumType(QuestionSortBy, { name: 'QuestionSortBy' })

@ObjectType()
export class LoggedUser {
  @Field(() => ID)
  _id: string

  @Field()
  username: string

  @Field()
  token: string

  @Field()
  role: RoleType
}

@ObjectType()
export class Author {
  @Field((type) => ID)
  _id: string

  @Field()
  username: string
}
@ObjectType()
export class NextPrevPage {
  @Field()
  page: number

  @Field()
  limit: number
}

@ArgsType()
export class BasicPaginationArgs {
  @Field((type) => Int)
  page: number

  @Field((type) => Int)
  limit: number
}
