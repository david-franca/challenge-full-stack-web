import { i18n } from '@/locales/i18n'
import { AxiosError } from 'axios'
import type { ApiResponse } from '.'

/**
 * Processa uma resposta de API (sucesso ou erro) e retorna mensagens traduzidas apropriadas.
 * @param response - O objeto de resposta da API ou o objeto de erro (AxiosError).
 * @param resource - O tipo de recurso ('student' ou 'user') para personalizar as mensagens.
 * @returns Um array de strings contendo as mensagens de notificação.
 */
export const handleApiResponse = (response: unknown, resource: 'student' | 'user'): string[] => {
  const t = i18n.global.t
  const messages: string[] = []

  const status =
    response instanceof AxiosError
      ? response.response?.status
      : (response as ApiResponse)?.statusCode

  const resourceName = t(`notifications.resources.${resource}`)

  switch (status) {
    case 200:
      messages.push(t('notifications.success.updated', { resource: resourceName }))
      break
    case 201:
      messages.push(t('notifications.success.created', { resource: resourceName }))
      break
    case 400:
      if (response instanceof AxiosError && response.response?.data?.errors) {
        const errors = response.response.data.errors
        if (Array.isArray(errors)) {
          errors.forEach((error) => messages.push(error))
        }
      } else {
        messages.push(t('notifications.error.badRequest'))
      }
      break
    case 401:
      messages.push(t('notifications.error.unauthorized'))
      break
    case 403:
      messages.push(t('notifications.error.forbidden'))
      break
    case 404:
      messages.push(t('notifications.error.notFound', { resource: resourceName }))
      break
    case 409:
      messages.push(t('notifications.error.conflict'))
      break
    case 500:
      messages.push(t('notifications.error.serverError'))
      break
    default:
      messages.push(t('notifications.error.unknown'))
  }

  return messages
}
