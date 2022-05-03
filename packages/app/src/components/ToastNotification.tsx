import { useAppContext } from '../context/state'
import Alert from './my-mui/Alert'
import { Snackbar } from './my-mui/Snackbar'

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
