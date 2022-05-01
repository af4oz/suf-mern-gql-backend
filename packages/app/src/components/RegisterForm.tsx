import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillPersonFill as PersonIcon } from 'react-icons/bs';
import {
  IoMdLock as LockIcon,
  IoMdPersonAdd as PersonAddIcon,
} from 'react-icons/io';
import {
  MdEnhancedEncryption as EnhancedEncryptionIcon,
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md';
import 'twin.macro';
import * as yup from 'yup';
import { useAuthContext } from '../context/auth';
import { useAppContext } from '../context/state';
import {
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from '../generated/graphql';
import SofLogo from '../svg/stack-overflow.svg';
import { getErrorMsg } from '../utils/helperFuncs';
import {
  Button,
  EmptyLink,
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
} from './CompStore';
import ErrorMessage from './ErrorMessage';

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
});

interface RegisterFormProps {
  setAuthType: (...args: any) => void;
  closeModal: (...args: any) => void;
}

const RegisterForm = ({ setAuthType, closeModal }: RegisterFormProps) => {
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showConfPass, setShowConfPass] = useState(false);
  const { setUser } = useAuthContext();
  const { notify } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserMutationVariables & { confirmPassword: string }>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const [registerUser, { loading }] = useRegisterUserMutation({
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const onSubmit = handleSubmit(({ username, confirmPassword, password }) => {
    if (password !== confirmPassword)
      return setErrorMsg('Both passwords need to match.');

    registerUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data?.register);
        notify(
          `Welcome, ${data?.register.username}! You've successfully registered.`
        );
        reset();
        closeModal();
      },
    });
  });

  return (
    <div tw="px-3 py-2">
      <img src={SofLogo} alt="sof-logo" tw="width[5em] mx-auto my-4" />
      <form onSubmit={onSubmit}>
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            {...register('username')}
            placeholder="username"
            type="text"
            error={'username' in errors}
            helperText={'username' in errors ? errors.username?.message : ''}
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
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            {...register('confirmPassword')}
            placeholder="confirmPassword"
            type={showConfPass ? 'text' : 'password'}
            error={'confirmPassword' in errors}
            helperText={
              'confirmPassword' in errors ? errors.confirmPassword?.message : ''
            }
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowConfPass((prevState) => !prevState)}
                  tag="button"
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
          type="submit"
          disabled={loading}
          tw="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
        >
          <SvgIcon tw="font-size[1.2em]">
            <PersonAddIcon />
          </SvgIcon>
          &nbsp; Sign Up
        </Button>
      </form>
      <p tw="text-center my-3">
        Already have an account?{' '}
        <EmptyLink onClick={() => setAuthType('login')}>Log In</EmptyLink>
      </p>
      <ErrorMessage errorMsg={errorMsg} clearErrorMsg={() => setErrorMsg('')} />
    </div>
  );
};

export default RegisterForm;
