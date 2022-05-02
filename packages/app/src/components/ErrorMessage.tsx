import { ReactNode } from 'react'
import { Alert } from './CompStore'

interface AlertMessageProps {
  errorMsg: ReactNode
  clearErrorMsg: (...args: any) => void
}

const AlertMessage = ({ errorMsg, clearErrorMsg }: AlertMessageProps) => {
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

export default AlertMessage
