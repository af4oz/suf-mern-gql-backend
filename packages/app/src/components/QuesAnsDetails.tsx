import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect, ChangeEvent } from 'react'
import { UpvoteButton, DownvoteButton } from './Buttons/Vote'
import { useAuthContext } from '../context/auth'
import PostedByUser from './PostedByUser'
import CommentSection from './Comment/Comments'
import AcceptAnswerButton from './Buttons/AcceptAnswer'
import DeleteDialog from './Dialogs/DeleteDialog'
import AuthFormOnButton from './Auth/AuthFormOnButton'
import * as yup from 'yup'

import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { LightButton } from './my-mui/Misc'
import TextField from './my-mui/TextField'
import Tag from './my-mui/Tag'
import { Answer, Author, Question, VoteType } from '../generated/graphql'

const validationSchema = yup.object({
  editedAnswerBody: yup.string().min(30, 'Must be at least 30 characters'),
})

interface QuesAnsDetailsProps {
  quesAns: (Question | Answer) & { tags?: Question['tags'] }
  voteQuesAns: (...args: any) => void
  editQuesAns(...args: any): void
  deleteQuesAns: () => void
  addComment: (...args: any) => void
  editComment: (...args: any) => void
  deleteComment: (...args: any) => void
  quesAuthor?: Author
  acceptAnswer?: () => void
  isAnswer?: boolean
  acceptedAnswer?: Question['acceptedAnswer']
}

function QuesAnsDetails({
  quesAns,
  voteQuesAns,
  editQuesAns,
  deleteQuesAns,
  addComment,
  editComment,
  deleteComment,
  acceptAnswer,
  isAnswer,
  acceptedAnswer,
  quesAuthor,
}: QuesAnsDetailsProps) {
  const {
    _id: id,
    author,
    body,
    tags,
    comments,
    points,
    voted,
    createdAt,
    updatedAt,
  } = quesAns

  const { user } = useAuthContext()
  const [editAnsOpen, setEditAnsOpen] = useState(false)
  const [editedAnswerBody, setEditedAnswerBody] = useState(body)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    editedAnswerBody: string
  }>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })
  useEffect(() => {
    if (isAnswer) {
      setEditedAnswerBody(body)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, isAnswer])

  const openEditInput = () => {
    setEditAnsOpen(true)
  }

  const closeEditInput = () => {
    setEditAnsOpen(false)
  }

  const handleAnswerEdit = () => {
    reset()
    editQuesAns(editedAnswerBody, id)
    closeEditInput()
  }

  return (
    <div tw="flex flex-row flex-nowrap w-full">
      <div tw="flex flex-col items-center">
        {user ? (
          <UpvoteButton
            checked={voted === VoteType.Upvote}
            handleUpvote={voteQuesAns}
          />
        ) : (
          <AuthFormOnButton buttonType="upvote" />
        )}
        <span tw="">{points}</span>
        {user ? (
          <DownvoteButton
            checked={voted === VoteType.Downvote}
            handleDownvote={voteQuesAns}
          />
        ) : (
          <AuthFormOnButton buttonType="downvote" />
        )}
        {isAnswer && user && user._id === quesAuthor?._id && (
          <AcceptAnswerButton
            checked={acceptedAnswer === id}
            handleAcceptAns={acceptAnswer!}
          />
        )}
      </div>
      <div tw="px-3 pt-2 w-full">
        {!editAnsOpen ? (
          <p tw="m-0 pb-1 text-sm text-gray-800">{body}</p>
        ) : (
          <form onSubmit={handleSubmit(handleAnswerEdit)}>
            <TextField
              tag="textarea"
              value={editedAnswerBody}
              fullWidth
              {...register('editedAnswerBody')}
              error={'editedAnswerBody' in errors}
              helperText={
                'editedAnswerBody' in errors
                  ? errors.editedAnswerBody?.message
                  : ''
              }
              required
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setEditedAnswerBody(e.target.value)
              }
              placeholder="Enter at least 30 characters"
              rows={4}
            />
            <div tw="">
              <LightButton style={{ marginRight: 9 }} type="submit">
                Update Answer
              </LightButton>
              <LightButton onClick={() => setEditAnsOpen(false)}>
                Cancel
              </LightButton>
            </div>
          </form>
        )}
        {tags && (
          <div tw="flex flex-wrap">
            {tags.map((t) => (
              <Tag
                tag="a"
                key={t}
                label={t}
                href={`/tags/${t}`}
                styles={{ link: tw`margin[0 .25em .25em]` }}
              />
            ))}
          </div>
        )}
        <div tw="flex flex-row flex-wrap justify-between my-5">
          {!editAnsOpen && (
            <div tw="inline-block">
              {user && user._id === author._id && (
                <LightButton
                  tw="m-1 p-0"
                  onClick={isAnswer ? openEditInput : editQuesAns}
                >
                  Edit
                </LightButton>
              )}
              {user && (user._id === author._id || user.role === 'ADMIN') && (
                <DeleteDialog
                  bodyType={isAnswer ? 'answer' : 'question'}
                  handleDelete={deleteQuesAns}
                />
              )}
            </div>
          )}
          <PostedByUser
            username={author.username}
            userId={author._id}
            createdAt={createdAt}
            updatedAt={updatedAt}
            filledVariant={true}
            isAnswer={isAnswer}
          />
        </div>
        <CommentSection
          user={user}
          comments={comments}
          addComment={addComment}
          editComment={editComment}
          deleteComment={deleteComment}
          quesAnsId={id}
        />
      </div>
    </div>
  )
}

export default QuesAnsDetails
