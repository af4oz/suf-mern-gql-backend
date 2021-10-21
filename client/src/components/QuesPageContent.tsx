import { ComponentProps } from 'react';
import { useHistory } from 'react-router-dom';
import 'twin.macro'; //eslint-disable-line no-unused-vars 
import { useAuthContext } from '../context/auth';
import { useAppContext } from '../context/state';
import { FetchQuestionQuery, Question, usePostQuesCommentMutation, useRemoveQuesCommentMutation, useRemoveQuestionMutation, useSubmitQuesVoteMutation, useUpdateQuesCommentMutation, VoteType } from '../generated/graphql';
import { VIEW_QUESTION } from '../graphql/queries';
import { getErrorMsg } from '../utils/helperFuncs';
import { downvote, upvote } from '../utils/voteQuesAns';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import QuesAnsDetails from './QuesAnsDetails';


interface QuesPageContentProps extends ComponentProps<'div'> {
  question: Question;
}

const QuesPageContent = ({ question, ...rest }: QuesPageContentProps) => {
  const {
    _id: quesId,
    answers,
    acceptedAnswer,
    upvotedBy,
    downvotedBy,
    title,
    body,
    tags,
    author,
  } = question

  const { user } = useAuthContext()
  const { setEditValues, notify } = useAppContext();
  const history = useHistory()

  const [submitVote] = useSubmitQuesVoteMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    }
  });

  const [removeQuestion] = useRemoveQuestionMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    }
  });

  const [postQuesComment] = usePostQuesCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    }
  })

  const [updateQuesComment] = useUpdateQuesCommentMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  });

  const [removeQuesComment] = useRemoveQuesCommentMutation({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const upvoteQues = () => {
    const { updatedUpvotedArr, updatedDownvotedArr, updatedPoints } = upvote(
      upvotedBy,
      downvotedBy,
      user
    )

    submitVote({
      variables: { quesId, voteType: VoteType.Upvote },
      optimisticResponse: {
        __typename: 'Mutation',
        voteQuestion: {
          __typename: 'Question',
          _id: quesId,
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    })
  }

  const downvoteQues = () => {
    const { updatedUpvotedArr, updatedDownvotedArr, updatedPoints } = downvote(
      upvotedBy,
      downvotedBy,
      user
    )

    submitVote({
      variables: { quesId, voteType: VoteType.Downvote },
      optimisticResponse: {
        __typename: 'Mutation',
        voteQuestion: {
          __typename: 'Question',
          _id: quesId,
          upvotedBy: updatedUpvotedArr,
          downvotedBy: updatedDownvotedArr,
          points: updatedPoints,
        },
      },
    })
  }

  const editQues = () => {
    setEditValues({ quesId, title, body, tags })
    history.push('/ask')
  }

  const deleteQues = () => {
    removeQuestion({
      variables: { quesId },
      update: () => {
        history.push('/')
        notify('Question deleted!')
      },
    })
  }

  const addQuesComment = (commentBody: string) => {
    postQuesComment({
      variables: { quesId, body: commentBody },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: VIEW_QUESTION,
          variables: { quesId },
        })

        const updatedData = {
          ...dataInCache?.viewQuestion,
          comments: data?.addQuesComment,
        }

        proxy.writeQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Comment added to question!')
      },
    })
  }

  const editQuesComment = (editedCommentBody: string, commentId: string) => {
    updateQuesComment({
      variables: { quesId, commentId, body: editedCommentBody },
      update: () => {
        notify('Comment edited!')
      },
    })
  }

  const deleteQuesComment = (commentId: string) => {
    removeQuesComment({
      variables: { quesId, commentId },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: VIEW_QUESTION,
          variables: { quesId },
        })

        const filteredComments = dataInCache?.viewQuestion.comments.filter(
          c => c?._id !== data?.deleteQuesComment
        )

        const updatedData = {
          ...dataInCache?.viewQuestion,
          comments: filteredComments,
        }

        proxy.writeQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Comment deleted!')
      },
    })
  }

  return (
    <div tw="border-top[1px solid lightgray]" {...rest}>
      <QuesAnsDetails
        quesAns={question}
        upvoteQuesAns={upvoteQues}
        downvoteQuesAns={downvoteQues}
        editQuesAns={editQues}
        deleteQuesAns={deleteQues}
        addComment={addQuesComment}
        editComment={editQuesComment}
        deleteComment={deleteQuesComment}
      />
      <AnswerList
        quesId={quesId}
        answers={answers}
        acceptedAnswer={acceptedAnswer}
        quesAuthor={author}
      />
      <AnswerForm quesId={quesId} tags={tags} />
    </div>
  )
}

export default QuesPageContent
