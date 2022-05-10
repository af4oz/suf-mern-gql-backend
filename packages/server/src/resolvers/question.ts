import { UserInputError, ForbiddenError } from 'apollo-server'
import { PopulateOptions } from 'mongoose'
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Float,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import {
  BasicPaginationArgs,
  NextPrevPage,
  QuestionSortBy,
  VoteType,
} from '../entities/common'
import { AnswerModel } from '../entities/Answer'
import { CommentModel } from '../entities/Comment'
import { Question, QuestionModel } from '../entities/Question'
import { QuestionVotesModel } from '../entities/QuestionVotes'
import { UserModel } from '../entities/User'
import QuestionService from '../services/QuestionService'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'
import getUser from '../utils/getUser'
import errorHandler from '../utils/errorHandler'
import { paginateResults } from '../utils/helperFuncs'
import { questionValidator } from '../utils/validators'
import { TagModel } from '../entities/Tag'
import { getChangedTags } from '../utils'

let popQuestion: PopulateOptions[] = [
  {
    path: 'author',
    select: 'username',
    model: UserModel,
  },
  {
    path: 'comments',
    model: CommentModel,
    populate: {
      path: 'author',
      select: 'username',
      model: UserModel,
    },
  },
  {
    path: 'answers',
    model: AnswerModel,
    populate: [
      {
        path: 'author',
        select: 'username',
        model: UserModel,
      },
      {
        path: 'comments',
        model: CommentModel,
        populate: {
          path: 'author',
          select: 'username',
          model: UserModel,
        },
      },
    ],
  },
]

@ArgsType()
class GetQuestionsArgs extends BasicPaginationArgs {
  @Field((type) => QuestionSortBy)
  sortBy: QuestionSortBy

  @Field({ nullable: true })
  filterByTag?: string

  @Field({ nullable: true })
  filterBySearch?: string
}

@ObjectType()
export class PaginatedQuesList {
  @Field((type) => [Question], { nullable: 'items' })
  questions: Question[]

  @Field({ nullable: true })
  next?: NextPrevPage

  @Field({ nullable: true })
  previous?: NextPrevPage
}

@Resolver((of) => Question)
export class QuestionResolver {
  @FieldResolver((returns) => Float)
  async hotAlgo(@Root() question: Question): Promise<number> {
    const { upvoteCount = 0, downvoteCount = 0 } =
      await QuestionService.getVotes(question._id)
    return (
      Math.log(Math.max(Math.abs(upvoteCount - downvoteCount), 1)) +
      Math.log(Math.max(question.views * 2, 1)) +
      question.createdAt.getTime() / 4500
    )
  }
  @FieldResolver((returns) => VoteType, { nullable: true })
  async voted(
    @Root() question: Question,
    @Ctx() context: TContext
  ): Promise<VoteType | null> {
    const loggedUser = getUser(context)
    if (!loggedUser) {
      return null
    }
    const voted = await QuestionVotesModel.findOne({
      userId: loggedUser.id as any,
      quesId: question._id as any,
    })
    if (voted) {
      return voted.vote
    } else {
      return null
    }
  }

  @Query(() => PaginatedQuesList)
  async getQuestions(
    @Args()
    { sortBy, page, limit, filterByTag, filterBySearch }: GetQuestionsArgs
  ): Promise<PaginatedQuesList> {
    const _page = Number(page)
    const _limit = Number(limit)

    let sortQuery
    switch (sortBy) {
      case QuestionSortBy.VOTES:
        sortQuery = { points: -1 }
        break
      case QuestionSortBy.VIEWS:
        sortQuery = { views: -1 }
        break
      case QuestionSortBy.NEWEST:
        sortQuery = { createdAt: -1 }
        break
      case QuestionSortBy.OLDEST:
        sortQuery = { createdAt: 1 }
        break
      default:
        sortQuery = { hotAlgo: -1 }
    }

    let findQuery = {}
    if (filterByTag) {
      findQuery = { tags: { $all: [filterByTag] } }
    } else if (filterBySearch) {
      findQuery = {
        $or: [
          {
            title: {
              $regex: filterBySearch,
              $options: 'i',
            },
          },
          {
            body: {
              $regex: filterBySearch,
              $options: 'i',
            },
          },
        ],
      }
    }

    try {
      const quesCount = await QuestionModel.find(findQuery).countDocuments()
      const paginated = paginateResults(_page, _limit, quesCount)
      const questions = await QuestionModel.find(findQuery)
        .sort(sortQuery)
        .limit(_limit)
        .skip(paginated.startIndex)
        .populate('author', 'username')
        .populate('answerCount')

      const paginatedQues = {
        previous: paginated.results.previous,
        questions,
        next: paginated.results.next,
      }

      return paginatedQues
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Query((returns) => Question)
  async viewQuestion(
    @Arg('quesId', (type) => ID) quesId: string
  ): Promise<Question> {
    try {
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new Error(`Question with ID: ${quesId} does not exist!`)
      }

      question.views++
      const savedQues = await question.save()

      const populatedQues = await savedQues.populate(popQuestion)

      return populatedQues
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation((returns) => Question)
  async postQuestion(
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('tags', (type) => [String]) tags: string[],
    @Ctx() context: TContext
  ): Promise<Question> {
    const loggedUser = authChecker(context)

    const { errors, valid } = questionValidator(title, body, tags)
    if (!valid) {
      throw new UserInputError(Object.values(errors)[0], { errors })
    }

    try {
      const author = await UserModel.findById(loggedUser.id)

      if (!author) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist!`
        )
      }
      const newQuestion = new QuestionModel({
        title,
        body,
        tags,
        author: author._id,
        answers: [],
        comments: [],
      })
      const savedQues = await newQuestion.save()

      // update tags collection
      await Promise.all(
        tags.map(async (tag) => {
          await TagModel.updateOne(
            {
              name: {
                $regex: new RegExp(tag, 'i'),
              },
            },
            {
              $setOnInsert: {
                name: tag,
              },
              $inc: {
                questionCount: 1,
              },
            },
            {
              upsert: true,
            }
          )
        })
      )
      const populatedQues = await savedQues.populate('author', 'username')

      return populatedQues
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }

  @Mutation((returns) => ID)
  async deleteQuestion(
    @Arg('quesId', (type) => ID) quesId: string,
    @Ctx() context: TContext
  ): Promise<string> {
    const loggedUser = authChecker(context)

    try {
      const user = await UserModel.findById(loggedUser.id)
      if (!user) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist!`
        )
      }
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(`Question with ID: ${quesId} does not exist!`)
      }
      if (question.author.toString() !== user._id.toString()) {
        throw new ForbiddenError("You can not delete other's question!")
      }

      // update tags collection
      await Promise.all(
        question.tags.map(async (tag) => {
          await TagModel.updateOne(
            {
              questionCount: {
                $gt: 0,
              },
              name: {
                $regex: new RegExp(tag, 'i'),
              },
            },
            {
              $inc: {
                questionCount: -1,
              },
            }
          )
        })
      )
      await question.delete()

      return quesId
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation((returns) => Question)
  async editQuestion(
    @Arg('quesId', (type) => ID) quesId: string,
    @Arg('title') title: string,
    @Arg('body') body: string,
    @Arg('tags', (type) => [String]) tags: string[],
    @Ctx() context: TContext
  ): Promise<Question> {
    const loggedUser = authChecker(context)

    const { errors, valid } = questionValidator(title, body, tags)
    if (!valid) {
      throw new UserInputError(Object.values(errors)[0], { errors })
    }

    const updatedQuesObj = {
      title,
      body,
      tags,
      updatedAt: new Date(),
    }

    try {
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(`Question with ID: ${quesId} does not exist!`)
      }
      if (question.author.toString() !== loggedUser.id.toString()) {
        throw new ForbiddenError("You can not edit other's question!")
      }

      const changedTags = getChangedTags(question.tags, tags)

      await Promise.all(
        changedTags.added.map(async (tag) => {
          await TagModel.updateOne(
            {
              name: {
                $regex: tag,
                $options: 'i',
              },
            },
            {
              $setOnInsert: {
                name: tag,
              },
              $inc: {
                questionCount: 1,
              },
            },
            {
              upsert: true,
            }
          )
        })
      )
      await Promise.all(
        changedTags.removed.map(async (tag) => {
          await TagModel.updateOne(
            {
              questionCount: {
                $gt: 0,
              },
              name: {
                $regex: tag,
                $options: 'i',
              },
            },
            {
              $setOnInsert: {
                name: tag,
              },
              $inc: {
                questionCount: -1,
              },
            }
          )
        })
      )
      const updatedQues = await QuestionModel.findByIdAndUpdate(
        quesId,
        updatedQuesObj,
        { new: true }
      ).populate(popQuestion) // Todo: donot populate, just send the question data

      if (!updatedQues) {
        throw new Error(`something went wrong!`)
      }
      return updatedQues
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation((returns) => Question)
  async voteQuestion(
    @Arg('quesId', (type) => ID) quesId: string,
    @Arg('voteType', (type) => VoteType) voteType: VoteType,
    @Ctx() context: TContext
  ): Promise<Question> {
    const loggedUser = authChecker(context)

    // TODO : use transactions
    try {
      const user = await UserModel.findById(loggedUser.id)

      if (!user) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist!`
        )
      }
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(`Question with ID: ${quesId} does not exist!`)
      }

      if (question.author.toString() === user._id.toString()) {
        throw new ForbiddenError("You can't vote for your own post.")
      }

      const quesAuthor = await UserModel.findById(question.author)
      if (!quesAuthor) {
        throw new UserInputError(
          `User with ID: ${question.author} does not exist!`
        )
      }

      const questionVote = await QuestionVotesModel.findOne({
        userId: user._id as any, // TODO
        quesId: question._id as any, // TODO
      })
      if (questionVote) {
        // Already voted, change vote type
        if (questionVote.vote === voteType) {
          await questionVote.delete()
          if (voteType === VoteType.DOWNVOTE) {
            // remove existing downvote
            quesAuthor.rep += 2 // +2 to remove downvote affect
            question.points += 1
          } else {
            // remove existing upvote
            quesAuthor.rep -= 10 // -10 to remove upvote affect
            question.points -= 1
          }
        } else {
          await questionVote.updateOne({
            vote: voteType,
          })
          if (voteType === VoteType.UPVOTE) {
            // change downvote to upvote
            quesAuthor.rep += 12 // +2 to remove downvote affect
            question.points += 2 // extra +1 to add upvote affect
          } else {
            // change upvote to downvote
            quesAuthor.rep -= 12 // -10 to remove upvote affect
            question.points -= 2 // extra -1 to add downvote affect
          }
        }
      } else {
        // New vote
        await QuestionVotesModel.create({
          userId: user._id,
          quesId: question._id,
          vote: voteType,
        })
        if (voteType === VoteType.UPVOTE) {
          quesAuthor.rep += 10
          question.points += 1
        } else {
          quesAuthor.rep -= 2
          question.points -= 1
        }
      }

      await quesAuthor.save()
      await question.save()

      const populatedQues = await question.populate(popQuestion) // Todo: donot populate, just send the question data

      return populatedQues
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
}
