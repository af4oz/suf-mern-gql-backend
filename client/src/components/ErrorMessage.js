// import { Alert, AlertTitle } from '@material-ui/lab'
import { Alert } from './CompStore';
import { useAlertStyles } from '../styles/muiStyles'

const AlertMessage = ({ errorMsg, clearErrorMsg }) => {
  const classes = useAlertStyles()

  if (!errorMsg) {
    return null
  }

  return (
    <div className={classes.root}>
      <Alert severity="error" title="Error" onClose={clearErrorMsg}>
        {errorMsg}
      </Alert>
    </div>
  )
}

export default AlertMessage
