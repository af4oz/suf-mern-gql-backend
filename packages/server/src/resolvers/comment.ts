import { AuthenticationError, UserInputError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { AnswerModel } from '../entities/Answer'
import { Comment, CommentModel, CommentParentType } from '../entities/Comment'
import { QuestionModel } from '../entities/Question'
import { UserModel } from '../entities/User'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'

@Resolver((of) => Comment)
export class CommentResolver {
  @Mutation((returns) => Comment)
  async addComment(
    @Arg('parentType', () => CommentParentType)
    parentType: CommentParentType,
    @Arg('parentId', (type) => ID) parentId: string,
    @Arg('body') body: string,
    @Ctx() context: TContext
  ): Promise<Comment> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    switch (parentType) {
      case CommentParentType.Question: {
        const question = await QuestionModel.findById(parentId)
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${parentId} does not exist!`
          )
        }

        const comment = await CommentModel.create({
          body,
          author: loggedUser.id,
          parentId: question._id,
        })

        const populatedComment = await comment.populate({
          path: 'author',
          model: UserModel,
        })

        return populatedComment
      }
      case CommentParentType.Answer: {
        const answer = await AnswerModel.findById(parentId)
        if (!answer) {
          throw new UserInputError(
            `Answer with ID: ${parentId} does not exist in DB.`
          )
        }
        const comment = await CommentModel.create({
          body,
          author: new ObjectId(loggedUser.id),
          parentId: answer._id,
        })
        const populatedComment = await comment.populate({
          path: 'author',
          model: UserModel,
        })
        return populatedComment
      }
      default:
        throw new UserInputError('Invalid CommentParentType!')
    }
  }
  @Mutation((returns) => ID)
  async deleteComment(
    @Arg('commentId', (type) => ID) commentId: string,
    @Ctx() context: TContext
  ): Promise<string> {
    const loggedUser = authChecker(context)

    const user = await UserModel.findById(loggedUser.id)

    if (!user || user.id.toString() !== loggedUser.id.toString()) {
      throw new UserInputError(`user with ID: ${loggedUser.id} does not exist!`)
    }

    const comment = await CommentModel.findById(commentId)
    if (!comment) {
      throw new UserInputError(
        `Comment with ID: '${commentId}' does not exist!`
      )
    }
    if (comment.author.toString() !== user!._id.toString()) {
      throw new AuthenticationError('Access is denied.')
    }
    await comment.delete()

    return commentId
  }
  @Mutation((returns) => Comment)
  async editComment(
    @Arg('commentId', (type) => ID) commentId: string,
    @Arg('body') body: string,
    @Ctx() context: TContext
  ): Promise<Comment> {
    const loggedUser = authChecker(context)

    if (body.trim() === '' || body.length < 5) {
      throw new UserInputError('Comment must be atleast 5 characters long.')
    }

    const comment = await CommentModel.findById(commentId)

    if (!comment) {
      throw new UserInputError(
        `Comment with ID: '${commentId}' does not exist!`
      )
    }

    if (comment.author.toString() !== loggedUser.id.toString()) {
      throw new AuthenticationError('Access is denied.')
    }

    comment.body = body
    comment.updatedAt = new Date()
    await comment.save()

    const populatedComment = await comment.populate({
      path: 'author',
      model: UserModel,
    })

    return populatedComment
  }
}
