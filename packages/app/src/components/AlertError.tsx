import { ReactNode } from 'react'
import Alert from './my-mui/Alert'

interface AlertErrorProps {
  errorMsg: ReactNode
  clearErrorMsg: (...args: any) => void
}

const AlertError = ({ errorMsg, clearErrorMsg }: AlertErrorProps) => {
  if (!errorMsg) {
    return null
  }

  return (
    <div>
      <Alert severity="error" title="Error" onClose={clearErrorMsg}>
        {errorMsg}
      </Alert>
    </div>
  )
}

export default AlertError
