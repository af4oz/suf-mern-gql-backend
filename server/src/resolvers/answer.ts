import { AuthenticationError, UserInputError } from 'apollo-server'
import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { VoteType } from '../entities'
import { Answer, AnswerModel } from '../entities/Answer'
import { AnswerVotesModel } from '../entities/AnswerVotes'
import { CommentModel } from '../entities/Comment'
import { Question, QuestionModel } from '../entities/Question'
import { UserModel } from '../entities/User'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'
import errorHandler from '../utils/errorHandler'

@Resolver(of => Answer)
export class AnswerResolver {
  @Mutation(returns => [Answer])
  async postAnswer(@Arg('quesId', type => ID) quesId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Answer[]> {

    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 30) {
      throw new UserInputError('Answer must be atleast 30 characters long.')
    }

    try {

      const user = await UserModel.findById(loggedUser.id)
      if (!user) {
        throw new UserInputError(
          `User with ID: ${loggedUser.id} does not exist in DB.`
        )
      }
      const question = await QuestionModel.findById(quesId);
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }
      const answer = new AnswerModel({
        body,
        author: user._id,
        question: question._id
      })
      await answer.save();

      const populatedQues = await question.populate({
        path: 'answers',
        model: AnswerModel,
        populate: {
          path: 'author',
          model: UserModel
        }
      })

      return populatedQues.answers as Answer[];
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation(returns => ID)
  async deleteAnswer(@Arg('quesId', type => ID) quesId: string, @Arg('ansId', type => ID) ansId: string, @Ctx() context: TContext): Promise<string> {
    const loggedUser = authChecker(context)

    try {
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

      const targetAnswer = await AnswerModel.findById(ansId);
      if (!targetAnswer) {
        throw new UserInputError(
          `Answer with ID: '${ansId}' does not exist in DB.`
        )
      }

      if (
        targetAnswer.author.toString() !== user._id.toString()
      ) {
        throw new AuthenticationError('Access is denied.')
      }

      await targetAnswer.delete();

      return ansId
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation(returns => [Answer], { nullable: false })
  async editAnswer(@Arg('quesId', type => ID) quesId: string, @Arg('ansId', type => ID) ansId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Answer[]> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 30) {
      throw new UserInputError('Answer must be atleast 30 characters long.')
    }

    try {
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }

      const answer = await AnswerModel.findById(ansId);
      if (!answer) {
        throw new UserInputError(
          `Answer with ID: ${ansId} does not exist in DB.`
        )
      }

      if (answer.author.toString() !== loggedUser.id.toString()) {
        throw new AuthenticationError('Access is denied.')
      }
      answer.body = body;
      answer.updatedAt = new Date();
      await answer.save()

      const populatedQues = await question.populate([
        {
          path: 'answers',
          populate: [{
            path: 'author',
            select: 'username',
            model: UserModel
          }, {
            path: 'comments',
            model: CommentModel,
            populate: {
              path: 'author',
              select: 'username',
              model: UserModel
            }
          }]
        }
      ])

      return populatedQues.answers as Answer[];
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation(returns => Answer)
  async voteAnswer(@Arg('quesId', type => ID) quesId: string, @Arg('ansId', type => ID) ansId: string, @Arg('voteType', type => VoteType) voteType: VoteType, @Ctx() context: TContext): Promise<Answer> {
    const loggedUser = authChecker(context);

    // TODO : use transactions
    try {
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
      const answer = await AnswerModel.findById(ansId);
      if (!answer) {
        throw new UserInputError(
          `Answer with ID: ${ansId} does not exist in DB.`
        )
      }

      if (answer._id.toString() === user._id.toString()) {
        throw new UserInputError("You can't vote for your own post.")
      }

      const ansAuthor = await UserModel.findById(answer.author);
      if (!ansAuthor) {
        throw new UserInputError(
          `User with ID: ${answer.author} does not exist in DB.`
        )
      }
      const answerVote = await AnswerVotesModel.findOne({
        userId: user._id as any, // TODO
        ansId: answer._id as any // TODO
      })
      if (answerVote) {
        // Already voted, update now
        if (answerVote.vote === voteType) {
          await answerVote.delete()
          if (voteType === VoteType.DOWNVOTE) {
            // remove existing downvote
            ansAuthor.rep += 2; // +2 to remove downvote affect
            answer.points += 1;
          } else {
            // remove existing upvote
            ansAuthor.rep -= 10; // -10 to remove upvote affect
            answer.points -= 1;
          }
        }
        else {
          await answerVote.update({
            vote: voteType
          })
          if (voteType === VoteType.UPVOTE) {
            // change downvote to upvote
            ansAuthor.rep += 12; // +2 to remove downvote affect
            answer.points += 2; // extra +1 to add upvote affect
          } else {
            // change upvote to downvote
            ansAuthor.rep -= 12; // -10 to remove upvote affect
            answer.points -= 2; // extra -1 to add downvote affect
          }
        }
      }
      else {
        // New vote
        await AnswerVotesModel.create({
          userId: user._id,
          ansId: answer._id,
          vote: voteType
        })
        if (voteType === VoteType.UPVOTE) {
          ansAuthor.rep += 10;
          answer.points += 1;
        } else {
          ansAuthor.rep -= 2;
          answer.points -= 1;
        }
      }
      await ansAuthor.save();
      await answer.save();

      const populatedAns = await answer.populate([{
        path: 'author',
        select: 'username',
        model: UserModel
      }, {
        path: 'comments',
        model: CommentModel,
        populate: {
          path: 'author',
          model: UserModel
        }
      }]);

      return populatedAns;

    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation(returns => Question)
  async acceptAnswer(@Arg('quesId', type => ID) quesId: string, @Arg('ansId', type => ID) ansId: string, @Ctx() context: TContext): Promise<Question> {
    const loggedUser = authChecker(context)

    try {
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }

      if (question.author.toString() !== loggedUser.id.toString()) {
        throw new UserInputError(
          'Only the author of question can accept answers.'
        )
      }

      const answer = await AnswerModel.findById(ansId)
      if (!answer) {
        throw new UserInputError(
          `Answer with ID: ${ansId} does not exist in DB.`
        )
      }

      if (
        !question.acceptedAnswer ||
        !(question.acceptedAnswer.toString() === answer._id.toString()
        )) {
        question.acceptedAnswer = answer._id;
      }
      const savedQues = await question.save()

      const populatedQues = await savedQues.populate([{
        path: 'author',
        select: 'username',
        model: UserModel
      }, {
        path: 'answers',
        model: AnswerModel,
        populate: [{
          path: 'author',
          select: 'username',
          model: UserModel
        }, {
          path: 'comments',
          model: CommentModel,
          populate: {
            path: 'author',
            select: 'username',
            model: UserModel
          }
        }]
      }])

      return populatedQues as Question;
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
}