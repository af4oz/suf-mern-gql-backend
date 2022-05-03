import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPersonFill as PersonIcon } from 'react-icons/bs'
import { IoMdExit as ExitToAppIcon, IoMdLock as LockIcon } from 'react-icons/io'
import {
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md'
import 'twin.macro'
import * as yup from 'yup'
import { useAuthContext } from '~~/context/auth'
import { useAppContext } from '~~/context/state'
import {
  LoginUserMutationVariables,
  useLoginUserMutation,
} from '~~/generated/graphql'
import SofLogo from '~~/svg/stack-overflow.svg'
import { getErrorMsg } from '~~/utils/helperFuncs'
import { Button, EmptyLink, SvgIcon } from '../my-mui/Misc'
import IconButton from '../my-mui/IconButton'
import TextField from '../my-mui/TextField'
import InputAdornment from '../my-mui/InputAdornment'
import ErrorMessage from '../AlertError'

const validationSchema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
})

interface LoginFormProps {
  setAuthType: (...args: any) => void
  closeModal: () => void
}

const LoginForm = ({ setAuthType, closeModal }: LoginFormProps) => {
  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { setUser } = useAuthContext()
  const { notify } = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  })

  const [loginUser, { loading }] = useLoginUserMutation({
    onError: (err) => {
      setErrorMsg(getErrorMsg(err))
    },
  })
  const onLogin = ({ username, password }: LoginUserMutationVariables) => {
    loginUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data?.login)
        notify(`Welcome, ${data?.login.username}! You're logged in.`)
        reset()
        closeModal()
      },
    })
  }

  return (
    <div tw="px-3 py-2">
      <img src={SofLogo} alt="sof-logo" tw="width[5em] mx-auto my-4" />
      <form onSubmit={handleSubmit(onLogin)}>
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            placeholder="username"
            type="text"
            {...register('username')}
            error={'username' in errors}
            helperText={'username' in errors ? errors?.username?.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-purple-700">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            {...register('password')}
            placeholder="password"
            type={showPass ? 'text' : 'password'}
            error={'password' in errors}
            helperText={'password' in errors ? errors.password?.message : ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  tag="button"
                  onClick={() => setShowPass((prevState) => !prevState)}
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
        <Button
          tw="w-full bg-purple-700 hover:bg-purple-800 text-base"
          type="submit"
          disabled={loading}
        >
          <SvgIcon>
            <ExitToAppIcon />
          </SvgIcon>
          &nbsp;Log In
        </Button>
      </form>
      <p tw="text-center my-3">
        Don’t have an account?{' '}
        <EmptyLink onClick={() => setAuthType('signup')}>Sign Up</EmptyLink>
      </p>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
    </div>
  )
}

export default LoginForm
