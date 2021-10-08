import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { POST_ANSWER } from '../graphql/mutations'
import { VIEW_QUESTION } from '../graphql/queries'
import { useAuthContext } from '../context/auth'
import { useStateContext } from '../context/state'
import AuthFormModal from '../components/AuthFormModal'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getErrorMsg } from '../utils/helperFuncs'

import 'twin.macro'
import { TextField, Button, Link } from './CompStore'
import Tag from './Tag'


const validationSchema = yup.object({
  answerBody: yup.string().min(30, 'Must be at least 30 characters'),
})

const AnswerForm = ({ quesId, tags }) => {
  const { user } = useAuthContext()
  const { clearEdit, notify } = useStateContext()
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const [addAnswer, { loading }] = useMutation(POST_ANSWER, {
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const postAnswer = ({ answerBody }) => {
    addAnswer({
      variables: { quesId, body: answerBody },
      update: (proxy, { data }) => {
        reset()

        const dataInCache = proxy.readQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
        })

        const updatedData = {
          ...dataInCache.viewQuestion,
          answers: data.postAnswer,
        }

        proxy.writeQuery({
          query: VIEW_QUESTION,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Answer submitted!')
      },
    })
  }

  return (
    <div>
      {user && <h3 tw="text-purple-900">Your Answer</h3>}
      {user && (
        <form onSubmit={handleSubmit(postAnswer)}>
          <TextField
            ref={register}
            name="answerBody"
            required
            multiline
            rows={5}
            fullWidth
            type="text"
            placeholder="Enter atleast 30 characters"
            size="small"
            error={'answerBody' in errors}
            helperText={'answerBody' in errors ? errors.answerBody.message : ''}
          />
          <div>
            <Button
              style={{ marginTop: '0.8em' }}
              type="submit"
              disabled={loading}
            >
              Post Your Answer
            </Button>
          </div>
        </form>
      )}
      <div tw="mt-4 text-sm sm:text-base">
        Browse other questions tagged &nbsp;
        {tags.map(t => (
          <Tag
            key={t}
            label={t}
            to={`/tags/${t}`}
            tw="mr-1"
          />
        ))}
        &nbsp; or &nbsp;
        {user ? (
          <>
            <Link to="/ask" onClick={() => clearEdit()}>
              ask your own question.
            </Link>
          </>
        ) : (
          <AuthFormModal buttonType="link" />
        )}
      </div>
    </div>
  )
}

export default AnswerForm
