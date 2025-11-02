import { useMessages } from '@/stores/messages.store'
import type { Register } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser } from '../api/userService'
import { handleErrors } from '@/utils/handleErrors'
import { useI18n } from 'vue-i18n'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (payload: Register) => createUser(payload),
    onSuccess: () => {
      addMessage({ text: t('notifications.user.created'), color: 'success' })
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      const errors = handleErrors(err)
      errors.forEach((error) => {
        addMessage({ text: error, color: 'error' })
      })
    },
  })
}
