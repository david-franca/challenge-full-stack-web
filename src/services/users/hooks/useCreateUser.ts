import { useMessages } from '@/stores/messages.store'
import type { Register } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser } from '../api/userService'
import { useI18n } from 'vue-i18n'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (payload: Register) => createUser(payload),
    onSuccess: () => {
      const resourceName = t(`notifications.resources.user`)

      addMessage({
        text: t('notifications.success.created', { resource: resourceName }),
        color: 'success',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      const errors = handleApiResponse(err, 'user')
      errors.forEach((error) => {
        addMessage({ text: error, color: 'error' })
      })
    },
  })
}
