import { useAppContext } from '../context/state'

import { Alert, Snackbar } from './CompStore'

const ToastNotification = () => {
  const { notification, clearNotif } = useAppContext()

  if (!notification?.message) {
    return null
  }

  const { message, severity } = notification

  return (
    <Snackbar
      open={!!notification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => clearNotif()} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default ToastNotification
