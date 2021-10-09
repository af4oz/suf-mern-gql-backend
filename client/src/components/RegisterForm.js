import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../graphql/mutations'
import { useAuthContext } from '../context/auth'
import { useStateContext } from '../context/state'
import ErrorMessage from './ErrorMessage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SofLogo from '../svg/stack-overflow.svg'
import { getErrorMsg } from '../utils/helperFuncs'

import { BsFillPersonFill as PersonIcon } from 'react-icons/bs'
import { IoMdLock as LockIcon } from 'react-icons/io';
import { MdEnhancedEncryption as EnhancedEncryptionIcon } from 'react-icons/md';
import { IoMdPersonAdd as PersonAddIcon } from 'react-icons/io';
import { MdVisibility as VisibilityIcon } from 'react-icons/md';
import { MdVisibilityOff as VisibilityOffIcon } from 'react-icons/md';

import { TextField, IconButton, InputAdornment, EmptyLink, Button, SvgIcon } from './CompStore';
import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanum, dash & underscore characters are allowed'
    ),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Required')
    .min(6, 'Must be at least 6 characters'),
})

const RegisterForm = ({ setAuthType, closeModal }) => {
  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showConfPass, setShowConfPass] = useState(false)
  const { setUser } = useAuthContext()
  const { notify } = useStateContext()
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  })

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onError: err => {
      setErrorMsg(getErrorMsg(err))
    },
  })

  const onRegister = ({ username, password, confirmPassword }) => {
    if (password !== confirmPassword)
      return setErrorMsg('Both passwords need to match.')

    registerUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data.register)
        notify(
          `Welcome, ${data.register.username}! You've successfully registered.`
        )
        reset()
        closeModal()
      },
    })
  }

  return (
    <div tw="px-3 py-2">
      <img src={SofLogo} alt="sof-logo" tw="width[5em] mx-auto my-4" />
      <form onSubmit={handleSubmit(onRegister)}>
        <div tw="mb-6">
          <TextField
            required
            fullWidth
            ref={register}
            name="username"
            placeholder="username"
            type="text"
            error={'username' in errors}
            helperText={'username' in errors ? errors.username.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-purple-700">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div tw="mb-6">
          <TextField
            required
            fullWidth
            ref={register}
            name="password"
            placeholder="password"
            type={showPass ? 'text' : 'password'}
            error={'password' in errors}
            helperText={'password' in errors ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPass(prevState => !prevState)}
                  tw="p-0 font-size[1.5em] text-purple-700"
                >
                  {showPass ? (
                    <VisibilityOffIcon color="secondary" />
                  ) : (
                    <VisibilityIcon color="secondary" />
                  )}
                </IconButton>
              ),
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-purple-700">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div tw="mb-6">
          <TextField
            required
            fullWidth
            ref={register}
            name="confirmPassword"
            placeholder="confirmPassword"
            type={showConfPass ? 'text' : 'password'}
            error={'confirmPassword' in errors}
            helperText={
              'confirmPassword' in errors ? errors.confirmPassword.message : ''
            }
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfPass(prevState => !prevState)}
                  tw="p-0 font-size[1.5em] text-purple-700"
                >
                  {showConfPass ? (
                    <VisibilityOffIcon color="secondary" />
                  ) : (
                    <VisibilityIcon color="secondary" />
                  )}
                </IconButton>
              ),
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-purple-700">
                  <EnhancedEncryptionIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          fullWidth
          type="submit"
          disabled={loading}
          tw="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
        >
          <SvgIcon tw="font-size[1.2em]">
            <PersonAddIcon />
          </SvgIcon>
          &nbsp;
          Sign Up
        </Button>
      </form>
      <p tw="text-center my-3">
        Already have an account?{' '}
        <EmptyLink onClick={() => setAuthType('login')} >
          Log In
        </EmptyLink>
      </p>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
    </div>
  )
}

export default RegisterForm
