const errorHandler = (error: any) => {
  if (!error) {
    return 'something went wrong!'
  }
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return 'Malformatted ID.'
  } else if (error.message) {
    return error.message as string
  }
  return JSON.stringify(error, null, 2)
}

export default errorHandler
