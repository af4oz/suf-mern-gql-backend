import { AuthenticationError, UserInputError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { AnswerModel } from '../entities/Answer'
import { Comment, CommentModel } from '../entities/Comment'
import { UserModel } from '../entities/User'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'
import errorHandler from '../utils/errorHandler'

@Resolver(of => Comment)
export class AnsCommentResolver {
  @Mutation(returns => [Comment])
  async addAnsComment(@Arg('ansId') ansId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Comment[]> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    try {
      const answer = await AnswerModel.findById(ansId)
      if (!answer) {
        throw new UserInputError(
          `Answer with ID: ${ansId} does not exist in DB.`
        );
      }
      const comment = await CommentModel.create({
        body,
        author: new ObjectId(loggedUser.id),
      });
      answer.comments?.push(comment._id);

      const savedAns = await answer.save()
      const populatedAns = await savedAns
        .populate([{
          path: 'comments',
          model: CommentModel,
          populate: {
            path: 'author',
            select: 'username',
            model: UserModel
          }
        }]);

      return populatedAns.comments as Comment[];
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => ID)
  async deleteAnsComment(@Arg('ansId') ansId: string, @Arg('commentId') commentId: string, @Ctx() context: TContext): Promise<string> {

    const loggedUser = authChecker(context)

    try {
      const user = await UserModel.findById(loggedUser.id)
      if (!user) {
        throw new UserInputError(
          `user with ID: ${loggedUser.id} does not exist in DB.`
        )
      }
      const answer = await AnswerModel.findById(ansId)
      if (!answer) {
        throw new UserInputError(
          `Answer with ID: ${ansId} does not exist in DB.`
        )
      }
      const comment = await CommentModel.findById(commentId)

      if (!comment) {
        throw new UserInputError(
          `Comment with ID: '${commentId}' does not exist in DB.`
        )
      }

      if (
        comment.author.toString() !== user._id.toString()
      ) {
        throw new AuthenticationError('Access is denied.')
      }
      await comment.delete();

      answer.comments = answer.comments?.filter(
        c => c.toString() !== commentId
      )

      await answer.save()
      return commentId;
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
  @Mutation(returns => [Comment])
  async editAnsComment(@Arg('ansId') ansId: string, @Arg('commentId') commentId: string, @Arg('body') body: string, @Ctx() context: TContext): Promise<Comment[]> {
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

      const answer = await AnswerModel.findById(ansId);
      if (!answer) {
        throw new UserInputError(
          `Answer with ID: ${ansId} does not exist in DB.`
        )
      }

      if (comment.author.toString() !== loggedUser.id.toString()) {
        throw new AuthenticationError('Access is denied.')
      }

      comment.body = body;
      comment.updatedAt = new Date();

      await comment.save()

      const populatedAns = await answer
        .populate([{
          path: 'comments',
          model: CommentModel,
          populate: {
            path: 'author',
            select: 'username',
            model: UserModel
          }
        }]);

      return populatedAns.comments as Comment[];
    } catch (err) {
      throw new UserInputError(errorHandler(err))
    }
  }
}