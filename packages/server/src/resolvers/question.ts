import { AuthenticationError, UserInputError } from 'apollo-server'
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
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { PaginatedQuesList, SortByType, VoteType } from '../entities'
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
class GetQuestionsArgs {
  @Field((type) => SortByType)
  sortBy: SortByType

  @Field((type) => Int)
  page: number

  @Field((type) => Int)
  limit: number

  @Field({ nullable: true })
  filterByTag?: string

  @Field({ nullable: true })
  filterBySearch?: string
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
      case SortByType.VOTES:
        sortQuery = { points: -1 }
        break
      case SortByType.VIEWS:
        sortQuery = { views: -1 }
        break
      case SortByType.NEWEST:
        sortQuery = { createdAt: -1 }
        break
      case SortByType.OLDEST:
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
      })
      const savedQues = await newQuestion.save()
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
        throw new AuthenticationError('Access is denied.')
      }

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
        throw new AuthenticationError('Access is denied.')
      }

      const updatedQues = await QuestionModel.findByIdAndUpdate(
        quesId,
        updatedQuesObj,
        { new: true }
      ).populate(popQuestion)
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
        throw new UserInputError("You can't vote for your own post.")
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

      const populatedQues = await question.populate(popQuestion)

      return populatedQues
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
}
