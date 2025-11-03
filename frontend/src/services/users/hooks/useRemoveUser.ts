import { useMessages } from '@/stores/messages.store'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeUser } from '../api/userService'
import { useI18n } from 'vue-i18n'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const useRemoveUser = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (id: number) => removeUser(id),
    onSuccess: () => {
      const resourceName = t(`notifications.resources.user`)

      addMessage({
        text: t('notifications.success.removed', { resource: resourceName }),
        color: 'success',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      const messages = handleApiResponse(err, 'user')
      messages.forEach((message) => {
        addMessage({ text: message, color: 'error' })
      })
    },
  })
}
