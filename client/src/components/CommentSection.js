import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Comment from './Comment'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { LightButton } from './CompStore'
import tw from 'twin.macro'

const validationSchema = yup.object({
  commentBody: yup.string().min(5, 'Must be at least 5 characters'),
})

const CommentSection = ({
  user,
  comments,
  addComment,
  editComment,
  deleteComment,
  quesAnsId,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [inputOpen, setInputOpen] = useState(false)
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const closeInput = () => {
    setInputOpen(false)
  }

  const showComments = () => {
    setIsCollapsed(false)
  }

  const handleCommentAdd = ({ commentBody}) => {
    addComment(commentBody, quesAnsId)
    showComments()
    closeInput()
    reset()
  }

  const visibleComments = isCollapsed ? comments.slice(0, 3) : comments

  return (
    <div>
      {comments.length !== 0 && <div tw="height[1px] bg-gray-400" />}
      {visibleComments.map(c => (
        <div key={c.id} tw="border-bottom[1px solid rgba(0,0,0,.08)]">
          <Comment
            comment={c}
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
          <textarea
            ref={register}
            name="commentBody"
            required
            type="text"
            placeholder="Enter at least 5 characters"
            rows={3}
            error={'commentBody' in errors}
            helperText={
              'commentBody' in errors ? errors.commentBody.message : ''
            }
            tw="w-full p-1 resize-none border-gray-300 rounded-sm font-family[inherit]"
          />
          <div>
            <LightButton
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              style={{ marginRight: 9 }}
            >
              Add Comment
            </LightButton>
            <LightButton
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => setInputOpen(false)}
            >
              Cancel
            </LightButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default CommentSection
