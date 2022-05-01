import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppContext } from '../context/state'
import ErrorMessage from '../components/ErrorMessage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getErrorMsg } from '../utils/helperFuncs'

import 'twin.macro';
import { TextField, Button, ChipWithClose, Autocomplete } from '../components/CompStore'
import { useAddQuestionMutation, useUpdateQuestionMutation } from '../generated/graphql'

interface BaseQuestionArgs {
  title: string;
  body: string;
}
const validationSchema = yup.object({
  title: yup
    .string()
    .required('Required')
    .min(15, 'Must be at least 15 characters'),
  body: yup
    .string()
    .required('Required')
    .min(30, 'Must be at least 30 characters'),
})

const AskQuestionPage = () => {
  const history = useHistory()
  const { editValues, clearEdit, notify } = useAppContext()
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState(editValues ? editValues.tags : [])
  const [errorMsg, setErrorMsg] = useState('')
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      title: editValues ? editValues.title : '',
      body: editValues ? editValues.body : '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const [addQuestion, { loading: addQuesLoading }] = useAddQuestionMutation(
    {
      onError: err => {
        setErrorMsg(getErrorMsg(err))
      },
    }
  )

  const [updateQuestion, { loading: editQuesLoading }] = useUpdateQuestionMutation(
    {
      onError: err => {
        setErrorMsg(getErrorMsg(err))
      },
    }
  )

  const postQuestion = ({ title, body }: BaseQuestionArgs) => {
    if (tags.length === 0) return setErrorMsg('Atleast one tag must be added.')

    addQuestion({
      variables: { title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data?.postQuestion._id}`)
        reset()
        notify('Question posted!')
      },
    })
  }

  const editQuestion = ({ title, body }: BaseQuestionArgs) => {
    if (tags.length === 0) return setErrorMsg('Atleast one tag must be added.')

    updateQuestion({
      variables: { quesId: editValues.quesId, title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data?.editQuestion._id}`)
        clearEdit()
        notify('Question edited!')
      },
    })
  }
  const handleInputChange = (value: string) => {
    const newInputValue = value.toLowerCase().trim();

    if (!/^[a-zA-Z0-9-]*$/.test(value)) {
      return setErrorMsg('Only alphanumeric characters & dash are allowed.');
    }
    if (newInputValue.length > 15) {
      return setErrorMsg("A single tag can't have more than 15 characters.");
    }

    setTagInput(newInputValue)
  }
  const handleChange = (value: string) => {

    if (tags.length >= 5) {
      setTagInput('')
      return setErrorMsg('Max 5 tags can be added! Not more than that.');
    }
    if (tags.includes(value)) {
      return setErrorMsg(
        "Duplicate tag found! You can't add the same tag twice."
      );
    }
    setTags(value)
  }
  return (
    <div tw="w-full my-6 mx-3">
      <h1 tw="text-purple-900 text-xl">
        {editValues ? 'Edit Your Question' : 'Ask A Question'}
      </h1>
      <form
        tw="mt-4 text-purple-800"
        onSubmit={
          editValues ? handleSubmit(editQuestion) : handleSubmit(postQuestion)
        }
      >
        <div tw="mb-4">
          <p tw=" text-xs mb-2">
            Be specific and imagine you’re asking a question to another person
          </p>
          <TextField
            tag="input"
            required
            fullWidth
            ref={register}
            name="title"
            placeholder="Enter atleast 15 characters"
            type="text"
            label="Title"
            error={'title' in errors}
            helperText={'title' in errors ? errors.title.message : ''}
          />
        </div>
        <div tw="mb-4">
          <p tw="text-xs mb-2">
            Include all the information someone would need to answer your
            question
          </p>
          <TextField
            tag="textarea"
            required
            rows={5}
            fullWidth
            ref={register}
            name="body"
            placeholder="Enter atleast 30 characters"
            label="Body"
            error={'body' in errors}
            helperText={'body' in errors ? errors.body.message : ''}
          />
        </div>
        <div tw="mb-4">
          <p tw="text-xs mb-2">
            Add up to 5 tags to describe what your question is about
          </p>
          <Autocomplete
            value={tags}
            inputValue={tagInput}
            onInputChange={(_, value) => {
              handleInputChange(value)
            }}
            onChange={(_, value) => {
              handleChange(value)
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Tags"
                placeholder="press Enter to add tags"
                fullWidth
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option: string, index: number) => (
                <ChipWithClose
                  label={option}
                  color="primary"
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </div>
        <Button
          type="submit"
          tw="bg-purple-700 hover:bg-purple-800 text-sm sm:text-base"
          disabled={addQuesLoading || editQuesLoading}
        >
          {editValues ? 'Update Your Question' : 'Post Your Question'}
        </Button>
        <ErrorMessage
          errorMsg={errorMsg}
          clearErrorMsg={() => setErrorMsg('')}
        />
      </form>
    </div>
  )
}

export default AskQuestionPage
