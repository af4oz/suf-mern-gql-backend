import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { POST_QUESTION, EDIT_QUESTION } from '../graphql/mutations'
import { useStateContext } from '../context/state'
import ErrorMessage from '../components/ErrorMessage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getErrorMsg } from '../utils/helperFuncs'

import tw, { styled, css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { TextField, Button, ChipWithClose, Autocomplete } from '../components/CompStore'

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
  const { editValues, clearEdit, notify } = useStateContext()
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState(editValues ? editValues.tags : [])
  const [errorMsg, setErrorMsg] = useState(null)
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      title: editValues ? editValues.title : '',
      body: editValues ? editValues.body : '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const [addQuestion, { loading: addQuesLoading }] = useMutation(
    POST_QUESTION,
    {
      onError: err => {
        setErrorMsg(getErrorMsg(err))
      },
    }
  )

  const [updateQuestion, { loading: editQuesLoading }] = useMutation(
    EDIT_QUESTION,
    {
      onError: err => {
        setErrorMsg(getErrorMsg(err))
      },
    }
  )

  const postQuestion = ({ title, body }) => {
    if (tags.length === 0) return setErrorMsg('Atleast one tag must be added.')

    addQuestion({
      variables: { title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data.postQuestion.id}`)
        reset()
        notify('Question posted!')
      },
    })
  }

  const editQuestion = ({ title, body }) => {
    if (tags.length === 0) return setErrorMsg('Atleast one tag must be added.')

    updateQuestion({
      variables: { quesId: editValues.quesId, title, body, tags },
      update: (_, { data }) => {
        history.push(`/questions/${data.editQuestion.id}`)
        clearEdit()
        notify('Question edited!')
      },
    })
  }
  const handleInputChange = (value) => {
    const newInputValue = value.toLowerCase().trim();

    if (!/^[a-zA-Z0-9-]*$/.test(value)) {
      return setErrorMsg('Only alphanumeric characters & dash are allowed.');
    }
    if (newInputValue.length > 15) {
      return setErrorMsg("A single tag can't have more than 15 characters.");
    }

    setTagInput(newInputValue)
  }
  const handleChange = (value) => {

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
    <div tw="w-full mt-6 mx-3">
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
            required
            multiline
            rows={5}
            fullWidth
            ref={register}
            name="body"
            placeholder="Enter atleast 30 characters"
            type="text"
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
            multiple
            freeSolo
            options={[]}
            getOptionLabel={option => option}
            value={tags}
            inputValue={tagInput}
            onInputChange={(e, value) => {
              handleInputChange(value)
            }}
            onChange={(e, value, reason) => {
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
              value.map((option, index) => (
                <ChipWithClose
                  variant="outlined"
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
          clearErrorMsg={() => setErrorMsg(null)}
        />
      </form>
    </div>
  )
}

export default AskQuestionPage
