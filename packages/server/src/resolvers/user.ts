import { UserInputError } from 'apollo-server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { LoggedUser } from '../entities/common'
import { RecentActivity, User, UserModel } from '../entities/User'
import AnswerService from '../services/AnswerService'
import QuestionService from '../services/QuestionService'
import { TContext } from '../types'
import authChecker from '../utils/authChecker'
import { JWT_SECRET } from '../utils/config'
import errorHandler from '../utils/errorHandler'
import { loginValidator, registerValidator } from '../utils/validators'

@Resolver((of) => User)
export class UserResolver {
  @Query(() => User)
  async whoami(@Ctx() context: TContext): Promise<User | null> {
    try {
      const loggedUser = authChecker(context)
      if (loggedUser.id) {
        const user = await UserModel.findById(loggedUser.id)
        if (!user) {
          throw new UserInputError(
            `User with ID: ${loggedUser.id} does not exist in DB.`
          )
        }
        return user
      } else {
        return null
      }
    } catch (err) {
      throw new Error(errorHandler(err))
    }
  }

  @Query(() => User)
  async getUser(@Arg('username') username: string): Promise<User> {
    if (username.trim() === '') {
      throw new UserInputError('Username must be provided.')
    }

    const user = await UserModel.findOne({
      username: { $regex: new RegExp('^' + username + '$', 'i') },
    })

    if (!user) {
      throw new UserInputError(`User '${username}' does not exist.`)
    }
    return user
  }
  @Query(() => [User])
  async getAllUsers() {
    const allUsers = await UserModel.find({}).select('username createdAt')
    return allUsers
  }

  @FieldResolver((returns) => [RecentActivity])
  async recentQuestions(@Root() user: User): Promise<RecentActivity[]> {
    return await QuestionService.getRecentQuestions(user._id)
  }

  @FieldResolver((returns) => Int)
  async totalQuestions(@Root() user: User): Promise<number> {
    return await QuestionService.getTotalQuestions(user._id)
  }
  @FieldResolver((returns) => Int)
  async totalAnswers(@Root() user: User): Promise<number> {
    return await AnswerService.getTotalAnswers(user._id)
  }
  @FieldResolver((returns) => [RecentActivity])
  async recentAnswers(@Root() user: User): Promise<RecentActivity[]> {
    return await AnswerService.getRecentAnswers(user._id)
  }

  @Mutation(() => LoggedUser)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<LoggedUser> {
    const { errors, valid } = registerValidator(username, password)

    if (!valid) {
      throw new UserInputError(Object.values(errors)[0], { errors })
    }

    const existingUser = await UserModel.findOne({
      username: { $regex: new RegExp('^' + username + '$', 'i') },
    })

    if (existingUser) {
      throw new UserInputError(`Username '${username}' is already taken.`)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new UserModel({
      username,
      passwordHash,
    })

    const savedUser = await user.save()
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      JWT_SECRET as string
    )

    return {
      _id: savedUser._id.toString(),
      username: savedUser.username,
      role: savedUser.role,
      token,
    }
  }
  @Mutation(() => LoggedUser)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<LoggedUser> {
    const { errors, valid } = loginValidator(username, password)

    if (!valid) {
      throw new UserInputError(Object.values(errors)[0], { errors })
    }

    const user = await UserModel.findOne({
      username: { $regex: new RegExp('^' + username + '$', 'i') },
    })

    if (!user) {
      throw new UserInputError(`User: '${username}' not found.`)
    }

    const credentialsValid = await bcrypt.compare(password, user.passwordHash)

    if (!credentialsValid) {
      throw new UserInputError('Invalid credentials.')
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET as string
    )

    return {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      token,
    }
  }
}
