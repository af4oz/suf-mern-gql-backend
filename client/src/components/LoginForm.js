import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../graphql/mutations'
import { useAuthContext } from '../context/auth'
import { useStateContext } from '../context/state'
import ErrorMessage from './ErrorMessage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SofLogo from '../svg/stack-overflow.svg'
import { getErrorMsg } from '../utils/helperFuncs'

import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { TextField, IconButton, EmptyLink, Button } from './CompStore';
import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
})

const LoginForm = ({ setAuthType, closeModal }) => {
  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const { setUser } = useAuthContext()
  const { notify } = useStateContext()
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: err => {
      setErrorMsg(getErrorMsg(err))
    },
  })
  const onLogin = ({ username, password }) => {
    loginUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data.login)
        notify(`Welcome, ${data.login.username}! You're logged in.`)
        reset()
        closeModal()
      },
    })
  }

  return (
    <div tw="px-3 py-2">
      <img src={SofLogo} alt="sof-logo" tw="width[5em] mx-auto my-4" />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onLogin)
      }}>
        <div tw="mb-6">
          <TextField
            required
            fullWidth
            inputRef={register}
            name="username"
            placeholder="username"
            type="text"
            error={'username' in errors}
            helperText={'username' in errors ? errors.username.message : ''}
            InputProps={{
              startAdornment: (
                <PersonIcon color="primary" />
              ),
            }}
          />
        </div>
        <div tw="mb-6">
          <TextField
            required
            fullWidth
            inputRef={register}
            name="password"
            placeholder="password"
            type={showPass ? 'text' : 'password'}
            error={'password' in errors}
            helperText={'password' in errors ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPass(prevState => !prevState)}
                  size="small"
                >
                  {showPass ? (
                    <VisibilityOffIcon color="secondary" />
                  ) : (
                    <VisibilityIcon color="secondary" />
                  )}
                </IconButton>
              ),
              startAdornment: (
                <LockIcon color="primary" />
              ),
            }}
          />
        </div>
        <Button
          tw="w-full bg-purple-700 hover:bg-purple-800 text-base"
          type="submit"
          disabled={loading}
        >
          <ExitToAppIcon />
          &nbsp;Log In
        </Button>
      </form>
      <p tw="text-center my-3">
        Don’t have an account?{' '}
        <EmptyLink onClick={() => setAuthType('signup')} >
          Sign Up
        </EmptyLink>
      </p>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
    </div>
  )
}

export default LoginForm
