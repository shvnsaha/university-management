import { ZodError, ZodIssue } from 'zod'
import { TGenericErrorResponse } from '../interface/error'

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  }
}

export default handleZodError
