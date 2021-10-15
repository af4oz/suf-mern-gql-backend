import { DocumentType } from '@typegoose/typegoose'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { PopulateOptions } from 'mongoose'
import { Arg, Args, ArgsType, Ctx, Field, ID, Int, Mutation, Query, Resolver } from 'type-graphql'
import { PaginatedQuesList, SortByType, VoteType } from '../entities'
import { AnswerModel } from '../entities/Answer'
import { CommentModel } from '../entities/Comment'
import { Question, QuestionModel } from '../entities/Question'
import { UserModel } from '../entities/User'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'
import errorHandler from '../utils/errorHandler'
import { downvoteIt, paginateResults, quesRep, upvoteIt } from '../utils/helperFuncs'
import { questionValidator } from '../utils/validators'

let popQuestion: PopulateOptions[] = [{
  path: 'author',
  select: 'username',
  model: UserModel
},
{
  path: 'comments',
  model: CommentModel,
  populate: {
    path: 'author',
    select: 'username',
    model: UserModel
  }
},
{
  path: 'answers',
  model: AnswerModel,
  populate: {
    path: 'author',
    select: 'username',
    model: UserModel
  }
}];

@ArgsType()
class GetQuestionsArgs {
  @Field(type => SortByType)
  sortBy: SortByType

  @Field(type => Int)
  page: number

  @Field(type => Int)
  limit: number

  @Field({ nullable: true })
  filterByTag?: string

  @Field({ nullable: true })
  filterBySearch?: string
}

@Resolver(of => Question)
export class QuestionResolver {

  @Query(() => PaginatedQuesList)
  async getQuestions(@Args() { sortBy, page, limit, filterByTag, filterBySearch }: GetQuestionsArgs): Promise<PaginatedQuesList> {
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

      const paginatedQues = {
        previous: paginated.results.previous,
        questions,
        next: paginated.results.next,
      }

      return paginatedQues
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Query(returns => Question)
  async viewQuestion(@Arg('quesId', type => ID) quesId: string): Promise<Question> {

    try {
      const question = await QuestionModel.findById(quesId);
      if (!question) {
        throw new Error(`Question with ID: ${quesId} does not exist in DB.`);
      }

      question.views++;
      const savedQues = await question.save();

      const populatedQues = await savedQues.populate(popQuestion);


      return populatedQues;
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => Question)
  async postQuestion(@Arg('title') title: string, @Arg("body") body: string, @Arg('tags', type => [String]) tags: string[], @Ctx() context: TContext): Promise<Question> {
    const loggedUser = authChecker(context)

    const { errors, valid } = questionValidator(title, body, tags)
    if (!valid) {
      throw new UserInputError(Object.values(errors)[0], { errors })
    }

    try {
      if (typeof loggedUser === 'string') {
        throw new Error('expected jwt payload, instead got string!')
      }
      const author = await UserModel.findById(loggedUser.id)

      if (!author) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist in DB.`
        )
      }
      const newQuestion = new QuestionModel({
        title,
        body,
        tags,
        author: author._id,
      })
      const savedQues = await newQuestion.save()
      const populatedQues = await savedQues
        .populate('author', 'username');

      author.questions.push({ quesId: savedQues._id, rep: 0 })
      await author.save()

      return populatedQues
    } catch (err) {
      if (err instanceof Error) {
        throw new UserInputError(errorHandler(err))
      }
      else {
        throw new UserInputError(JSON.stringify(err))
      }
    }
  }

  @Mutation(returns => ID)
  async deleteQuestion(@Arg('quesId', type => ID) quesId: string, @Ctx() context: TContext): Promise<string> {
    const loggedUser = authChecker(context)

    try {
      if (typeof loggedUser === 'string') {
        throw new Error('expected jwt payload, instead got string!')
      }
      const user = await UserModel.findById(loggedUser.id)
      if (!user) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist in DB.`
        )
      }
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }
      if (
        question.author.toString() !== user._id.toString() &&
        user.role !== 'admin'
      ) {
        throw new AuthenticationError('Access is denied.')
      }

      await QuestionModel.findByIdAndDelete(quesId)
      return question._id.toString();
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => Question)
  async editQuestion(@Arg('quesId', type => ID,) quesId: string, @Arg('title') title: string, @Arg("body") body: string, @Arg('tags', type => [String]) tags: string[], @Ctx() context: TContext): Promise<Question> {
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
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }
      if (question.author.toString() !== loggedUser.id.toString()) {
        throw new AuthenticationError('Access is denied.')
      }

      const updatedQues = await QuestionModel.findByIdAndUpdate(
        quesId,
        updatedQuesObj,
        { new: true }
      )
        .populate(popQuestion)
      if (!updatedQues) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }

      return updatedQues
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => Question)
  async voteQuestion(@Arg('quesId', type => ID) quesId: string, @Arg('voteType', type => VoteType) voteType: VoteType, @Ctx() context: TContext): Promise<Question> {
    const loggedUser = authChecker(context)

    try {
      if (typeof loggedUser === 'string') {
        throw new Error('expected jwt payload, instead got string!')
      }
      const user = await UserModel.findById(loggedUser.id)

      if (!user) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist in DB.`
        )
      }
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }

      if (question.author.toString() === user._id.toString()) {
        throw new UserInputError("You can't vote for your own post.")
      }

      let votedQues;
      if (voteType === VoteType.UPVOTE) {
        votedQues = upvoteIt(question, user) as DocumentType<Question>;
      } else {
        votedQues = downvoteIt(question, user) as DocumentType<Question>;
      }

      votedQues.hotAlgo =
        Math.log(Math.max(Math.abs(votedQues.points), 1)) +
        Math.log(Math.max(votedQues.views * 2, 1)) +
        votedQues.createdAt.getTime() / 4500;

      const savedQues = await votedQues.save()
      const author = await UserModel.findById(question.author)
      if (!author) {
        throw new UserInputError(
          `User with ID: ${question.author} does not exist in DB.`
        )
      }
      const addedRepAuthor = quesRep(question, author)
      await addedRepAuthor.save()

      const populatedQues = await savedQues.populate(popQuestion);
      return populatedQues;
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
}

