import { Query, Resolver } from 'type-graphql'
import { Tag } from '../entities'
import { QuestionModel } from '../entities/Question'
import errorHandler from '../utils/errorHandler'

@Resolver()
export class TagResolver {
  @Query((returns) => [Tag])
  async getAllTags(): Promise<Tag[]> {
    try {
      const tagsFromQues = await QuestionModel.find({}).select('tags')
      const tagsArray = tagsFromQues.map((t) => t.tags).flat()

      let result: Tag[] = []
      tagsArray.forEach((tag) => {
        const found = result.find((r) => r.tagName === tag)

        if (!found) {
          result.push({ tagName: tag, count: 1 })
        } else {
          result[result.indexOf(found)].count++
        }
      })

      return result.sort((a, b) => b.count - a.count)
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
}
