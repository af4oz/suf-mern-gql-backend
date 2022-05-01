import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import 'twin.macro'; //eslint-disable-line no-unused-vars
import { useAppContext } from '../context/state';
import {
  FetchQuestionDocument,
  FetchQuestionQuery,
  Question,
  usePostQuesCommentMutation,
  useRemoveQuesCommentMutation,
  useRemoveQuestionMutation,
  useSubmitQuesVoteMutation,
  useUpdateQuesCommentMutation,
  VoteType,
} from '../generated/graphql';
import { getErrorMsg } from '../utils/helperFuncs';
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
    title,
    body,
    tags,
    author,
  } = question;

  const { setEditValues, notify } = useAppContext();
  const navigate = useNavigate();

  const [submitVote] = useSubmitQuesVoteMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const [removeQuestion] = useRemoveQuestionMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const [postQuesComment] = usePostQuesCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const [updateQuesComment] = useUpdateQuesCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const [removeQuesComment] = useRemoveQuesCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const voteQues = (voteType: VoteType, points: number) => {
    submitVote({
      variables: { quesId, voteType },
      optimisticResponse: {
        __typename: 'Mutation',
        voteQuestion: {
          __typename: 'Question',
          _id: quesId,
          points: voteType === VoteType.Upvote ? points + 1 : points - 1,
          voted: voteType,
        },
      },
    });
  };

  const editQues = () => {
    setEditValues({ quesId, title, body, tags });
    navigate('/ask');
  };

  const deleteQues = () => {
    removeQuestion({
      variables: { quesId },
      update: () => {
        navigate('/');
        notify('Question deleted!');
      },
    });
  };

  const addQuesComment = (commentBody: string) => {
    postQuesComment({
      variables: { quesId, body: commentBody },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: FetchQuestionDocument,
          variables: { quesId },
        });

        const updatedData = {
          ...dataInCache?.viewQuestion,
          comments: data?.addQuesComment,
        };

        proxy.writeQuery({
          query: FetchQuestionDocument,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        });

        notify('Comment added to question!');
      },
    });
  };

  const editQuesComment = (editedCommentBody: string, commentId: string) => {
    updateQuesComment({
      variables: { quesId, commentId, body: editedCommentBody },
      update: () => {
        notify('Comment edited!');
      },
    });
  };

  const deleteQuesComment = (commentId: string) => {
    removeQuesComment({
      variables: { quesId, commentId },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: FetchQuestionDocument,
          variables: { quesId },
        });

        const filteredComments = dataInCache?.viewQuestion.comments.filter(
          (c) => c?._id !== data?.deleteQuesComment
        );

        const updatedData = {
          ...dataInCache?.viewQuestion,
          comments: filteredComments,
        };

        proxy.writeQuery({
          query: FetchQuestionDocument,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        });

        notify('Comment deleted!');
      },
    });
  };

  return (
    <div tw="border-top[1px solid lightgray]" {...rest}>
      <QuesAnsDetails
        quesAns={question}
        voteQuesAns={(voteType: VoteType) =>
          voteQues(voteType, question.points)
        }
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
  );
};

export default QuesPageContent;
