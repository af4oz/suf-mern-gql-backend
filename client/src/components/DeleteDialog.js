import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { useQuesPageStyles } from '../styles/muiStyles'
import tw from 'twin.macro'
import { LightButton } from './CompStore'

const DeleteDialog = ({ handleDelete, bodyType }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleDeleteClick = () => {
    handleDelete()
    handleModalClose()
  }

  return (
    <div style={{ display: 'inline' }}>
      <LightButton onClick={handleModalOpen}>Delete</LightButton>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete your ${
              bodyType ? bodyType : 'question'
            }?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LightButton onClick={handleModalClose}>Cancel</LightButton>
          <LightButton onClick={handleDeleteClick} color="primary">
            Delete
          </LightButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteDialog
