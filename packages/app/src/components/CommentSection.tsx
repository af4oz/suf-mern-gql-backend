import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Comment from './Comment'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { LightButton, TextField } from './CompStore'
import 'twin.macro'
import { Author, Question } from '../generated/graphql'

const validationSchema = yup.object({
  commentBody: yup.string().min(15, 'Must be at least 15 characters'),
})

interface CommentSectionProps {
  quesAnsId: string
  user: Author
  comments: Question['comments']
  addComment: (...args: any) => void
  editComment: (...args: any) => void
  deleteComment: (...args: any) => void
}

const CommentSection = ({
  user,
  comments,
  addComment,
  editComment,
  deleteComment,
  quesAnsId,
}: CommentSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [inputOpen, setInputOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ commentBody: string }>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const closeInput = () => {
    setInputOpen(false)
  }

  const showComments = () => {
    setIsCollapsed(false)
  }

  const handleCommentAdd = ({ commentBody }: { commentBody: string }) => {
    addComment(commentBody, quesAnsId)
    showComments()
    closeInput()
    reset()
  }

  const visibleComments = isCollapsed ? comments.slice(0, 3) : comments

  return (
    <div>
      {comments.length !== 0 && <div tw="height[1px] bg-gray-400" />}
      {visibleComments.map((c) => (
        <div key={c?._id} tw="border-bottom[1px solid rgba(0,0,0,.08)]">
          <Comment
            comment={c!}
            user={user}
            quesAnsId={quesAnsId}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        </div>
      ))}
      {visibleComments.length !== comments.length ? (
        <LightButton onClick={showComments}>
          show {comments.length - visibleComments.length} more comments
        </LightButton>
      ) : (
        user &&
        !inputOpen && (
          <LightButton onClick={() => setInputOpen(true)}>
            add a comment
          </LightButton>
        )
      )}
      {inputOpen && (
        <form onSubmit={handleSubmit(handleCommentAdd)} tw="mt-1">
          <TextField
            tag="textarea"
            {...register('commentBody')}
            required
            placeholder="Enter at least 15 characters"
            rows={3}
            fullWidth
            error={'commentBody' in errors}
            helperText={
              'commentBody' in errors ? errors?.commentBody?.message : ''
            }
          />
          <div>
            <LightButton type="submit" style={{ marginRight: 9 }}>
              Add Comment
            </LightButton>
            <LightButton onClick={() => setInputOpen(false)}>
              Cancel
            </LightButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default CommentSection
