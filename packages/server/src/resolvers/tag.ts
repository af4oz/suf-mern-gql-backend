import {
  Args,
  ArgsType,
  Field,
  ID,
  ObjectType,
  Int,
  Query,
  Resolver,
} from 'type-graphql'
import { Tag, TagModel } from '../entities/Tag'

@ArgsType()
class GetAllTagsArgs {
  @Field((type) => Int, { defaultValue: 0 })
  limit: number

  @Field((type) => ID, { nullable: true })
  cursor: string

  @Field({ nullable: true })
  filterBySearch?: string
}
@ObjectType()
class GetAllTagsResult {
  @Field((type) => [Tag])
  tags: Tag[]

  @Field()
  nextCursor: string
}
@Resolver()
export class TagResolver {
  @Query((returns) => GetAllTagsResult)
  async getAllTags(
    @Args() { limit, cursor, filterBySearch }: GetAllTagsArgs
  ): Promise<GetAllTagsResult> {
    const _limit = Number(limit) || 10

    let findQuery = {}
    if (filterBySearch) {
      findQuery = {
        name: {
          $regex: filterBySearch,
          $options: 'i',
        },
      }
    }
    const tags = await TagModel.find({
      ...(cursor
        ? {
            _id: {
              $gt: cursor,
            },
          }
        : {}),
      ...findQuery,
    })
      .sort({
        _id: -1,
      })
      .limit(_limit)

    return {
      tags,
      nextCursor:
        tags.length && tags.length === limit ? tags[tags.length - 1].id : '',
    }
  }
}
