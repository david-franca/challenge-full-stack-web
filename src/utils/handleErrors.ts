import { AxiosError } from 'axios'

export const handleErrors = (err: unknown) => {
  const messages: string[] = []
  if (err instanceof AxiosError && err.response) {
    const errors = err.response.data.errors
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => {
        messages.push(error)
      })
    } else {
      messages.push(err.response.data.message)
    }
  } else if (err instanceof Error) {
    messages.push(err.message)
  } else {
    messages.push('Erro desconhecido')
  }

  return messages
}
