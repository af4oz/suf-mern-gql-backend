import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { ReactComponent as UpvoteIcon } from '../svg/upvote.svg'
import { ReactComponent as DownvoteIcon } from '../svg/downvote.svg'

import {
  MenuItem,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { SvgIcon, Button, IconButton, Link } from './CompStore';
import { Dialog, DialogTitle, DialogContent } from './Dialog'
import 'twin.macro';

const AuthFormModal = ({ closeMenu, buttonType }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [authType, setAuthType] = useState('login')

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [isMounted])
  const handleLoginModal = () => {
    isMounted && setAuthType('login')
    isMounted && setModalOpen(true)
    if (buttonType === 'mobile') {
      closeMenu()
    }
  }

  const handleSignupModal = () => {
    isMounted && setAuthType('signup')
    isMounted && setModalOpen(true)
    if (buttonType === 'mobile') {
      closeMenu()
    }
  }

  const handleModalClose = () => {
    isMounted && setModalOpen(false)
  }

  const triggerButton = () => {
    if (buttonType === 'ask') {
      return (
        <Button
          tw="bg-purple-600 hover:bg-purple-700 text-sm"
          onClick={handleLoginModal}
        >
          Ask Question
        </Button>
      )
    } else if (buttonType === 'link') {
      return (
        <Link to="#" onClick={handleLoginModal} style={{ cursor: 'pointer' }}>
          ask your own question.
        </Link>
      )
    } else if (buttonType === 'upvote') {
      return (
        <IconButton onClick={handleLoginModal}>
          <SvgIcon tw="text-gray-400">
            <UpvoteIcon />
          </SvgIcon>
        </IconButton>
      )
    } else if (buttonType === 'downvote') {
      return (
        <IconButton onClick={handleLoginModal}>
          <SvgIcon tw="text-gray-400" >
            <DownvoteIcon />
          </SvgIcon>
        </IconButton>
      )
    } else if (buttonType === 'mobile') {
      return (
        <div>
          <MenuItem onClick={handleLoginModal}>
            <ExitToAppIcon />
            Log In
          </MenuItem>
          <MenuItem onClick={handleSignupModal}>
            <PersonAddIcon />
            Sign Up
          </MenuItem>
        </div>
      )
    } else {
      return (
        <div>
          <Button
            tw="text-sm mr-3"
            onClick={handleLoginModal}
          >
            Log In
          </Button>
          <Button
            tw="text-sm"
            onClick={handleSignupModal}
          >
            Sign Up
          </Button>
        </div>
      )
    }
  }

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      {
        modalOpen ? (
          <Dialog
            onClose={handleModalClose}
          >
            <DialogTitle onClose={handleModalClose}></DialogTitle>
            <DialogContent>
              {authType === 'login' ? (
                <LoginForm
                  setAuthType={setAuthType}
                  closeModal={handleModalClose}
                />
              ) : (
                <RegisterForm
                  setAuthType={setAuthType}
                  closeModal={handleModalClose}
                />
              )}
            </DialogContent>
          </Dialog>
        ) : null
      }
    </div>
  )
}

export default AuthFormModal
