import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { UpvoteButton, DownvoteButton } from './VoteButtons'
import { useAuthContext } from '../context/auth'
import PostedByUser from './PostedByUser'
import CommentSection from './CommentSection'
import AcceptAnswerButton from './AcceptAnswerButton'
import DeleteDialog from './DeleteDialog'
import AuthFormModal from './AuthFormModal'
import * as yup from 'yup'

import Tag, { Tags } from './Tag'
import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { LightButton, TextArea } from './CompStore'

const validationSchema = yup.object({
  editedAnswerBody: yup.string().min(30, 'Must be at least 30 characters'),
})

const QuesAnsDetails = ({
  quesAns,
  upvoteQuesAns,
  downvoteQuesAns,
  editQuesAns,
  deleteQuesAns,
  addComment,
  editComment,
  deleteComment,
  acceptAnswer,
  isAnswer,
  acceptedAnswer,
  quesAuthor,
}) => {
  const {
    id,
    author,
    body,
    tags,
    comments,
    points,
    upvotedBy,
    downvotedBy,
    createdAt,
    updatedAt,
  } = quesAns

  const { user } = useAuthContext()
  const [editAnsOpen, setEditAnsOpen] = useState(false)
  const [editedAnswerBody, setEditedAnswerBody] = useState(body)

  const { register, handleSubmit, reset, errors } = useForm({
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
            checked={user ? upvotedBy.includes(user.id) : false}
            user={user}
            handleUpvote={upvoteQuesAns}
          />
        ) : (
          <AuthFormModal buttonType="upvote" />
        )}
        <span tw="">{points}</span>
        {user ? (
          <DownvoteButton
            checked={user ? downvotedBy.includes(user.id) : false}
            user={user}
            handleDownvote={downvoteQuesAns}
          />
        ) : (
          <AuthFormModal buttonType="downvote" />
        )}
        {isAnswer && user && user.id === quesAuthor.id && (
          <AcceptAnswerButton
            checked={acceptedAnswer === id}
            handleAcceptAns={acceptAnswer}
          />
        )}
      </div>
      <div tw="px-3 pt-2 w-full">
        {!editAnsOpen ? (
          <p tw="m-0 pb-1 text-sm">{body}</p>
        ) : (
          <form onSubmit={handleSubmit(handleAnswerEdit)}>
            <TextArea
              name="editedAnswerBody"
              value={editedAnswerBody}
              fullWidth
              ref={register}
              error={'editedAnswerBody' in errors}
              helperText={
                'editedAnswerBody' in errors
                  ? errors.editedAnswerBody.message
                  : ''
              }
              required
              onChange={e => setEditedAnswerBody(e.target.value)}
              type="text"
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
          <Tags>
            {tags.map(t => (
              <Tag key={t} label={t} component={RouterLink} to={`/tags/${t}`} />
            ))}
          </Tags>
        )}
        <div tw="flex flex-row flex-wrap justify-between my-5">
          {!editAnsOpen && (
            <div tw="inline-block">
              {user && user.id === author.id && (
                <LightButton
                  tw="m-1 p-0"
                  onClick={isAnswer ? openEditInput : editQuesAns}
                >
                  Edit
                </LightButton>
              )}
              {user && (user.id === author.id || user.role === 'ADMIN') && (
                <DeleteDialog
                  bodyType={isAnswer ? 'answer' : 'question'}
                  handleDelete={deleteQuesAns}
                />
              )}
            </div>
          )}
          <PostedByUser
            username={author.username}
            userId={author.id}
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
