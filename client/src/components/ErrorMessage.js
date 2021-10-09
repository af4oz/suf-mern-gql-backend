import { Alert } from './CompStore';

const AlertMessage = ({ errorMsg, clearErrorMsg }) => {

  if (!errorMsg) {
    return null
  }

  return (
    <div >
      <Alert severity="error" title="Error" onClose={clearErrorMsg}>
        {errorMsg}
      </Alert>
    </div>
  )
}

export default AlertMessage
