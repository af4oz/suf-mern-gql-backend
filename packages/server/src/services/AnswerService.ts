import { ObjectId } from "mongodb";
import { AnswerModel } from "../entities/Answer";
import { QuestionModel } from "../entities/Question";
import { RecentActivity } from "../entities/User";

export default {
  async getRecentAnswers(userId: ObjectId) {
    const recentAnsweredQuestionIds = await AnswerModel.find({ author: userId })
      .select('question -_id')
      .limit(5) as any;
    const Ids = recentAnsweredQuestionIds.map((obj: any) => obj.question)

    const recentAnsweredQuestions = await QuestionModel.find({
      _id: {
        $in: Ids.length !== 0 ? Ids : []
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