import { i18n } from '@/locales/i18n'
import { AxiosError } from 'axios'

export const handleErrors = (err: unknown) => {
  const t = i18n.global.t
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
    messages.push(t('notifications.auth.error'))
  }

  return messages
}
