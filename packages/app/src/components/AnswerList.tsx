import { useState } from 'react'
import 'twin.macro' // eslint-disable-line no-unused-vars
import { useAppContext } from '../context/state'
import { FetchQuestionDocument, FetchQuestionQuery, Question, usePostAnsCommentMutation, useRemoveAnsCommentMutation, useRemoveAnswerMutation, useSubmitAcceptAnsMutation, useSubmitAnsVoteMutation, useUpdateAnsCommentMutation, useUpdateAnswerMutation, VoteType } from '../generated/graphql'
import { AnsSortBy } from '../types'
import { getErrorMsg } from '../utils/helperFuncs'
import sortAnswers from '../utils/sortAnswers'
import QuesAnsDetails from './QuesAnsDetails'
import SortAnsBar from './SortAnsBar'


interface AnswerListProps {
  quesId: string;
  answers: Question['answers'];
  acceptedAnswer: Question['acceptedAnswer'];
  quesAuthor: Question['author'];
}

const AnswerList = ({ quesId, answers, acceptedAnswer, quesAuthor }: AnswerListProps) => {
  const { notify } = useAppContext()
  const [sortBy, setSortBy] = useState<AnsSortBy>('VOTES')

  const [updateAnswer] = useUpdateAnswerMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [removeAnswer] = useRemoveAnswerMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [submitVote] = useSubmitAnsVoteMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [submitAcceptAns] = useSubmitAcceptAnsMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [postAnsComment] = usePostAnsCommentMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [updateAnsComment] = useUpdateAnsCommentMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [removeAnsComment] = useRemoveAnsCommentMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const voteAns = (ansId: string, voteType: VoteType, points: number) => {
    submitVote({
      variables: { quesId, ansId, voteType },
      optimisticResponse: {
        __typename: 'Mutation',
        voteAnswer: {
          __typename: 'Answer',
          _id: ansId,
          voted: voteType,
          points: voteType === VoteType.Upvote ? points + 1 : points - 1
        },
      },
    })
  }

  const editAns = (editedAnswerBody: string, ansId: string) => {
    updateAnswer({
      variables: { quesId, ansId, body: editedAnswerBody },
      update: () => {
        notify('Answer updated!')
      },
    })
  }

  const deleteAns = (ansId: string) => {
    removeAnswer({
      variables: { quesId, ansId },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: FetchQuestionDocument,
          variables: { quesId },
        })

        const filteredAnswers = dataInCache?.viewQuestion.answers.filter(
          c => c?._id !== data?.deleteAnswer
        )

        const updatedData = {
          ...dataInCache?.viewQuestion,
          answers: filteredAnswers,
        }

        proxy.writeQuery({
          query: FetchQuestionDocument,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Answer deleted!')
      },
    })
  }

  const acceptAns = (ansId: string) => {
    submitAcceptAns({
      variables: { quesId, ansId },
      optimisticResponse: {
        acceptAnswer: {
          _id: quesId,
          acceptedAnswer: acceptedAnswer === ansId ? null : ansId,
          __typename: 'Question',
        },
      },
      update: (_, { data }) => {
        if (data?.acceptAnswer.acceptedAnswer) {
          notify('Accepted the answer!')
        } else {
          notify('Un-accepted the answer.')
        }
      },
    })
  }

  const addAnsComment = (commentBody: string, ansId: string) => {
    postAnsComment({
      variables: { ansId, body: commentBody },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: FetchQuestionDocument,
          variables: { quesId },
        })

        const updatedAnswers = dataInCache?.viewQuestion.answers.map(a =>
          a?._id === ansId ? { ...a, comments: data?.addAnsComment } : a
        )

        const updatedData = {
          ...dataInCache?.viewQuestion,
          answers: updatedAnswers,
        }

        proxy.writeQuery({
          query: FetchQuestionDocument,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Comment added to answer!')
      },
    })
  }

  const editAnsComment = (editedCommentBody: string, commentId: string, ansId: string) => {
    updateAnsComment({
      variables: { ansId, commentId, body: editedCommentBody },
      update: () => {
        notify('Comment edited!')
      },
    })
  }

  const deleteAnsComment = (commentId: string, ansId: string) => {
    removeAnsComment({
      variables: { ansId, commentId },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: FetchQuestionDocument,
          variables: { quesId },
        })

        const targetAnswer = dataInCache?.viewQuestion.answers.find(
          a => a?._id === ansId
        )
        const updatedComments = targetAnswer?.comments.filter(
          c => c?._id !== data?.deleteAnsComment
        )

        const updatedAnswers = dataInCache?.viewQuestion.answers.map(a =>
          a?._id === ansId ? { ...a, comments: updatedComments } : a
        )

        const updatedData = {
          ...dataInCache?.viewQuestion,
          answers: updatedAnswers,
        }

        proxy.writeQuery({
          query: FetchQuestionDocument,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Comment deleted!')
      },
    })
  }

  const answerList = sortAnswers(sortBy, answers, acceptedAnswer)

  return (
    <div tw="mt-10">
      {answerList.length !== 0 && (
        <div tw="flex justify-between items-center flex-wrap">
          <h2 tw="text-purple-900 font-normal text-xl">
            {answerList.length} {answerList.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          <SortAnsBar
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      )}
      <div>
        {answerList.map((a) => (
          <div key={a!._id} tw="mb-3">
            <QuesAnsDetails
              quesAns={a!}
              voteQuesAns={(voteType: VoteType) => voteAns(a!._id, voteType, a!.points)}
              editQuesAns={editAns}
              deleteQuesAns={() => deleteAns(a!._id)}
              acceptAnswer={() => acceptAns(a!._id)}
              addComment={addAnsComment}
              editComment={editAnsComment}
              deleteComment={deleteAnsComment}
              isAnswer={true}
              acceptedAnswer={acceptedAnswer}
              quesAuthor={quesAuthor}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnswerList
