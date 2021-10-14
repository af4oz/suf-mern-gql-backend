import { AuthenticationError, UserInputError } from 'apollo-server';
import { Arg, Ctx, ID, Mutation, Resolver, Query } from 'type-graphql';
import { Comment, CommentModel } from '../entities/Comment';
import { QuestionModel } from '../entities/Question';
import { UserModel } from '../entities/User';
import { TContext } from '../types';
import authChecker from '../utils/authChecker';
import errorHandler from '../utils/errorHandler';

@Resolver(of => Comment)
export class QuesCommentResolver {
  @Mutation(returns => [Comment])
  async addQuesComment(@Arg('quesId') quesId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Comment[]> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    try {
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }

      const comment = await CommentModel.create({
        body,
        author: loggedUser.id,
      });

      question.comments.push(comment._id);
      const savedQues = await question.save();

      const populatedQues = await savedQues
        .populate('comments.author', 'username');

      return populatedQues.comments as Comment[];
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => ID)
  async deleteQuesComment(@Arg('quesId') quesId: string, @Arg('commentId') commentId: string, @Ctx() context: TContext): Promise<string> {

    const loggedUser = authChecker(context)

    try {
      const user = await UserModel.findById(loggedUser.id)
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }

      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        throw new UserInputError(
          `Comment with ID: '${commentId}' does not exist in DB.`
        )
      }

      if (
        comment.author.toString() !== user!._id.toString() &&
        user!.role !== 'admin'
      ) {
        throw new AuthenticationError('Access is denied.')
      }
      await CommentModel.findByIdAndDelete(commentId);

      question.comments = question.comments.filter(
        c => c.toString() !== commentId
      )
      await question.save()
      return commentId
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => [Comment])
  async editQuesComment(@Arg('quesId') quesId: string, @Arg('commentId') commentId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Comment[]> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    try {

      const comment = await CommentModel.findById(commentId);

      if (!comment) {
        throw new UserInputError(
          `Comment with ID: '${commentId}' does not exist in DB.`
        )
      }

      if (comment.author.toString() !== loggedUser.id.toString()) {
        throw new AuthenticationError('Access is denied.')
      }

      comment.body = body
      comment.updatedAt = new Date();
      await comment.save();

      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        )
      }
      const populatedQues = await question
        .populate('comments.author', 'username');

      return populatedQues.comments as Comment[];
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
}

