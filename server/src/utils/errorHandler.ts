import { TError } from "../types";

const errorHandler = (error: TError) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return 'Malformatted ID.'
  } else {
    return error.message as string
  }
}

export default errorHandler;