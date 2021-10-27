import { AuthenticationError, UserInputError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql';
import { Comment, CommentModel } from '../entities/Comment';
import { QuestionModel } from '../entities/Question';
import { UserModel } from '../entities/User';
import { TContext } from '../types';
import authChecker from '../utils/authChecker';
import errorHandler from '../utils/errorHandler';

@Resolver(of => Comment)
export class QuesCommentResolver {
  @Mutation(returns => [Comment])
  async addQuesComment(@Arg('quesId', type => ID) quesId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Comment[]> {

    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    try {

      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist!`
        )
      }

      await CommentModel.create({
        body,
        author: loggedUser.id,
      });

      const populatedQues = await question
        .populate({
          path: 'comments',
          model: CommentModel,
          populate: {
            path: 'author',
            select: 'username',
            model: UserModel
          }
        });

      return populatedQues.comments as Comment[];
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation(returns => ID)
  async deleteQuesComment(@Arg('quesId', type => ID) quesId: string, @Arg('commentId', type => ID) commentId: string, @Ctx() context: TContext): Promise<string> {

    const loggedUser = authChecker(context)

    try {
      const user = await UserModel.findById(loggedUser.id)
      if (!user) {
        throw new UserInputError(
          `user with ID: ${loggedUser.id} does not exist!`
        )
      }
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist!`
        )
      }

      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        throw new UserInputError(
          `Comment with ID: '${commentId}' does not exist!`
        )
      }

      if (
        comment.author.toString() !== user!._id.toString()
      ) {
        throw new AuthenticationError('Access is denied.')
      }
      await comment.delete();

      return commentId
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
  @Mutation(returns => [Comment])
  async editQuesComment(@Arg('quesId', type => ID) quesId: string, @Arg('commentId', type => ID) commentId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Comment[]> {

    const loggedUser = authChecker(context);

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    try {
      const question = await QuestionModel.findById(quesId)
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist!`
        )
      }
      const comment = await CommentModel.findById(commentId);

      if (!comment) {
        throw new UserInputError(
          `Comment with ID: '${commentId}' does not exist!`
        )
      }

      if (comment.author.toString() !== loggedUser.id.toString()) {
        throw new AuthenticationError('Access is denied.')
      }

      comment.body = body
      comment.updatedAt = new Date();
      await comment.save();

      const populatedQues = await question
        .populate({
          path: 'comments',
          model: CommentModel,
          populate: {
            path: 'author',
            select: 'username',
            model: UserModel
          }
        });

      return populatedQues.comments as Comment[];
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }
}

