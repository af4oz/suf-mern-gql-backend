import { UserInputError, AuthenticationError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Answer, AnswerModel } from '../entities/Answer'
import { Question, QuestionModel } from '../entities/Question'
import { User, UserModel } from '../entities/User'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'
import errorHandler from '../utils/errorHandler'
import { upvoteIt, downvoteIt, ansRep } from '../utils/helperFuncs'

@Resolver(of => Answer)
export class AnswerResolver {
  @Mutation(returns => [Answer])
  async postAnswer(@Arg('quesId', type => ID) quesId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Answer[]> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 30) {
      throw new UserInputError('Answer must be atleast 30 characters long.')
    }

    try {
      if (typeof loggedUser === 'string') {
        throw new Error('expected jwt payload, instead got string!')
      }
      const author = await UserModel.findById(loggedUser.id)
      const question = await QuestionModel.findById(quesId)
      if (!author) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist in DB.`
        )
      }
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }
      const answer = new AnswerModel({
        body,
        author: author._id
      })
      await answer.save();

      question.answers.push(answer)
      const savedQues = await question.save()
      const populatedQues = await savedQues
        .populate('answers.author', 'username')
        .populate('answers.comments.author', 'username')
        .execPopulate()

      author.answers.push({
        ansId: savedQues.answers[savedQues.answers.length - 1],
      })
      await author.save()

      return populatedQues.answers
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
}

module.exports = {
  Mutation: {
    postAnswer: async (_, args, context) => {
    },
    deleteAnswer: async (_, args, context) => {
      const loggedUser = authChecker(context)
      const { quesId, ansId } = args

      try {
        const user = await User.findById(loggedUser.id)
        const question = await Question.findById(quesId)
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          )
        }

        const targetAnswer = question.answers.find(
          a => a._id.toString() === ansId
        )

        if (!targetAnswer) {
          throw new UserInputError(
            `Answer with ID: '${ansId}' does not exist in DB.`
          )
        }

        if (
          targetAnswer.author.toString() !== user._id.toString() &&
          user.role !== 'admin'
        ) {
          throw new AuthenticationError('Access is denied.')
        }

        question.answers = question.answers.filter(
          a => a._id.toString() !== ansId
        )
        await question.save()
        return ansId
      } catch (err) {
        throw new UserInputError(errorHandler(err))
      }
    },
    editAnswer: async (_, args, context) => {
      const loggedUser = authChecker(context)
      const { quesId, ansId, body } = args

      if (body.trim() === '' || body.length < 30) {
        throw new UserInputError('Answer must be atleast 30 characters long.')
      }

      try {
        const question = await Question.findById(quesId)
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          )
        }

        const targetAnswer = question.answers.find(
          a => a._id.toString() === ansId
        )

        if (!targetAnswer) {
          throw new UserInputError(
            `Answer with ID: '${ansId}' does not exist in DB.`
          )
        }

        if (targetAnswer.author.toString() !== loggedUser.id.toString()) {
          throw new AuthenticationError('Access is denied.')
        }

        targetAnswer.body = body
        targetAnswer.updatedAt = Date.now()

        question.answers = question.answers.map(a =>
          a._id.toString() !== ansId ? a : targetAnswer
        )

        const savedQues = await question.save()
        const populatedQues = await savedQues
          .populate('answers.author', 'username')
          .populate('answers.comments.author', 'username')
          .execPopulate()

        return populatedQues.answers
      } catch (err) {
        throw new UserInputError(errorHandler(err))
      }
    },
    voteAnswer: async (_, args, context) => {
      const loggedUser = authChecker(context)
      const { quesId, ansId, voteType } = args

      try {
        const user = await User.findById(loggedUser.id)
        const question = await Question.findById(quesId)
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          )
        }

        const targetAnswer = question.answers.find(
          a => a._id.toString() === ansId
        )

        if (!targetAnswer) {
          throw new UserInputError(
            `Answer with ID: '${ansId}' does not exist in DB.`
          )
        }

        if (targetAnswer.author.toString() === user._id.toString()) {
          throw new UserInputError("You can't vote for your own post.")
        }

        let votedAns
        if (voteType === 'upvote') {
          votedAns = upvoteIt(targetAnswer, user)
        } else {
          votedAns = downvoteIt(targetAnswer, user)
        }

        question.answers = question.answers.map(a =>
          a._id.toString() !== ansId ? a : votedAns
        )

        const savedQues = await question.save()
        const populatedQues = await savedQues
          .populate('answers.author', 'username')
          .populate('answers.comments.author', 'username')
          .execPopulate()

        const author = await User.findById(targetAnswer.author)
        const addedRepAuthor = ansRep(targetAnswer, author)
        await addedRepAuthor.save()

        return populatedQues.answers.find(a => a._id.toString() === ansId)
      } catch (err) {
        throw new UserInputError(errorHandler(err))
      }
    },
    acceptAnswer: async (_, args, context) => {
      const loggedUser = authChecker(context)
      const { quesId, ansId } = args

      try {
        const question = await Question.findById(quesId)
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          )
        }

        const targetAnswer = question.answers.find(
          a => a._id.toString() === ansId
        )

        if (!targetAnswer) {
          throw new UserInputError(
            `Answer with ID: '${ansId}' does not exist in DB.`
          )
        }

        if (question.author.toString() !== loggedUser.id.toString()) {
          throw new UserInputError(
            'Only the author of question can accept answers.'
          )
        }

        if (
          !question.acceptedAnswer ||
          !question.acceptedAnswer.equals(targetAnswer._id)
        ) {
          question.acceptedAnswer = targetAnswer._id
        } else {
          question.acceptedAnswer = null
        }

        const savedQues = await question.save()
        const populatedQues = await savedQues
          .populate('answers.author', 'username')
          .populate('answers.comments.author', 'username')
          .execPopulate()

        return populatedQues
      } catch (err) {
        throw new UserInputError(errorHandler(err))
      }
    },
  },
}
