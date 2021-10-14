import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Question } from "./Question";

export enum RoleType {
  USER = 'user',
  ADMIN = 'admin'
}
registerEnumType(RoleType, {
  name: 'RoleType'
})

export enum VoteType {
  DOWNVOTE,
  UPVOTE
}
registerEnumType(VoteType, {
  name: 'VoteType'
})

export enum SortByType {
  HOT,
  VOTES,
  VIEWS,
  NEWEST,
  OLDEST
}
registerEnumType(SortByType, { name: "SortByType" });
registerEnumType(VoteType, { name: "VoteType" });

@ObjectType()
export class LoggedUser {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  token: string;

  @Field()
  role: RoleType
}

@ObjectType()
export class Tag {

  @Field()
  tagName: string;

  @Field()
  count: number;
}

@ObjectType()
export class Author {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;
}

@ObjectType()
export class NextPrevPage {
  @Field()
  page: number

  @Field()
  limit: number
}
@ObjectType()
export class PaginatedQuesList {
  @Field(type => [Question], { nullable: 'items' })
  questions: Question[];

  @Field({ nullable: true })
  next?: NextPrevPage;

  @Field({ nullable: true })
  previous?: NextPrevPage;

}