import { ObjectId } from "mongodb";
import { AnswerModel } from "../entities/Answer";
import { QuestionModel } from "../entities/Question";
import { RecentActivity } from "../entities/User";

export default {
  async getRecentAnswers(userId: ObjectId) {
    const recentAnswerIds = await AnswerModel.find({ author: userId })
      .select('question')
      .limit(5) as any;
    const recentAnsweredQuestions = await QuestionModel.find({
      _id: {
        $in: recentAnswerIds.length !== 0 ? recentAnswerIds : []
      }
    })
      .select('_id title points createdAt')
      .sort({ createdAt: -1 })
    return recentAnsweredQuestions as RecentActivity[];
  },
  async getTotalAnswers(userId: ObjectId) {
    return await AnswerModel.find({ author: userId }).count();
  }
}