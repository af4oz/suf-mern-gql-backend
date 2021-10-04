import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from './Dialog'
import tw from 'twin.macro';// eslint-disable-line no-unused-vars
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
      {
        modalOpen && (
          <Dialog open={modalOpen} onClose={handleModalClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <p>
                {`Are you sure you want to delete your ${bodyType ? bodyType : 'question'
                  }?`}
              </p>
            </DialogContent>
            <DialogActions>
              <LightButton onClick={handleModalClose} tw="mr-1">Cancel</LightButton>
              <LightButton onClick={handleDeleteClick} color="primary">
                Delete
              </LightButton>
            </DialogActions>
          </Dialog>
        )
      }
    </div>
  )
}

export default DeleteDialog
