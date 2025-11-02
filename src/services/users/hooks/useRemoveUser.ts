import { useMessages } from '@/stores/messages.store'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeUser } from '../api/userService'
import { handleErrors } from '@/utils/handleErrors'
import { useI18n } from 'vue-i18n'

export const useRemoveUser = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (id: number) => removeUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      addMessage({ text: t('notifications.user.removed'), color: 'success' })
    },
    onError: (err) => {
      const messages = handleErrors(err)
      messages.forEach((message) => {
        addMessage({ text: message, color: 'error' })
      })
    },
  })
}
