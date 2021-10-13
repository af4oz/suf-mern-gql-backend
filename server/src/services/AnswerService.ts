import { ObjectId } from 'mongodb';
import { QuestionModel } from '../entities/Question';

export default {
  async getRecentAnswers(userId: ObjectId) {
    const recentAnswers = await QuestionModel.find({
      answers: { $elemMatch: { author: userId } },
    })
      .sort({ createdAt: -1 })
      // .select('id title points createdAt')
      .limit(5)


    return recentAnswers;
  }
}