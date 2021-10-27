import { ObjectId } from "mongodb";
import { QuestionModel } from "../entities/Question";
import { RecentActivity } from "../entities/User";

export default {
  async getRecentQuestions(userId: ObjectId) {
    const recentQuestions = await QuestionModel.find({ author: userId })
      .sort({ createdAt: -1 })
      .select('_id title points createdAt') // TODO currently points is graphql only field, 
      .limit(5)

    return recentQuestions as RecentActivity[];
  }
  ,
  async getRecentAnswers(userId: ObjectId) {
    const recentAnswers = await QuestionModel.find({
      answers: { $elemMatch: { author: userId } },
    })
      .sort({ createdAt: -1 })
      .select('_id title points createdAt') // TODO currently points is graphql only field, 
      .limit(5)


    return recentAnswers as RecentActivity[];
  }
}