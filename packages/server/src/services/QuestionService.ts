import { ObjectId } from 'mongodb'
import { QuestionModel } from '../entities/Question'
import { RecentActivity } from '../entities/User'

export default {
  async getRecentQuestions(userId: ObjectId) {
    const recentQuestions = await QuestionModel.find({ author: userId })
      .select('_id title points createdAt')
      .sort({ createdAt: -1 })
      .limit(5)

    return recentQuestions as RecentActivity[]
  },
  async getVotes(quesId: ObjectId) {
    const question = await QuestionModel.findById(quesId)
      .populate('upvoteCount')
      .populate('downvoteCount') // TODO: avoid multiple populate
    return {
      upvoteCount: question?.upvoteCount,
      downvoteCount: question?.downvoteCount,
    }
  },
  async getTotalQuestions(userId: ObjectId) {
    return await QuestionModel.find({ author: userId }).count()
  },
}
