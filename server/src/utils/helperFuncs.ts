import { PaginateResults } from "../types"

import { User } from '../entities/User';
import { Question } from '../entities/Question';
import { Answer } from "../entities/Answer";
import { DocumentType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { NextPrevPage } from "../resolvers/question";

export const paginateResults = (page: number, limit: number, docCount: number) => {
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  let results: { next?: NextPrevPage, previous?: NextPrevPage } = {};

  if (endIndex < docCount) {
    results.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    }
  }

  return {
    startIndex,
    endIndex,
    results,
  }
}

export const upvoteIt = (quesAns: DocumentType<Question | Answer>, user: DocumentType<User>) => {
  if (quesAns.upvotedBy.includes(user._id.toString())) {
    quesAns.upvotedBy = quesAns.upvotedBy.filter(
      u => u.toString() !== user._id.toString()
    )
  } else {
    quesAns.upvotedBy.push(user._id)
    quesAns.downvotedBy = quesAns.downvotedBy.filter(
      d => d.toString() !== user._id.toString()
    )
  }

  quesAns.points = quesAns.upvotedBy.length - quesAns.downvotedBy.length
  return quesAns
}

export const downvoteIt = (quesAns: DocumentType<Question | Answer>, user: DocumentType<User>) => {
  if (quesAns.downvotedBy.includes(user._id.toString())) {
    quesAns.downvotedBy = quesAns.downvotedBy.filter(
      d => d.toString() !== user._id.toString()
    )
  } else {
    quesAns.downvotedBy.push(user._id)
    quesAns.upvotedBy = quesAns.upvotedBy.filter(
      u => u.toString() !== user._id.toString()
    )
  }

  quesAns.points = quesAns.upvotedBy.length - quesAns.downvotedBy.length
  return quesAns
}

export const quesRep = (question: DocumentType<Question>, author: DocumentType<User>) => {
  const calculatedRep =
    question.upvotedBy!.length * 10 - question.downvotedBy!.length * 2

  author.questions = author.questions!.map(q =>
    (q.quesId as ObjectId).equals(question._id) ? { quesId: q.quesId, rep: calculatedRep } : q
  )

  return author
}

export const ansRep = (answer: DocumentType<Answer>, author: DocumentType<User>) => {
  const calculatedRep =
    answer.upvotedBy.length * 10 - answer.downvotedBy.length * 2

  author.answers = author.answers.map(a =>
    (a.ansId as ObjectId).equals(answer._id) ? { ansId: a.ansId, rep: calculatedRep } : a
  )

  return author
}

