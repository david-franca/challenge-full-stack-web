import { useMessages } from '@/stores/messages.store'
import type { UpdateUserProps } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateUser } from '../api/userService'
import { useI18n } from 'vue-i18n'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const useUpdateUser = () => {
  const { addMessage } = useMessages()
  const queryClient = useQueryClient()
  const { t } = useI18n()

  return useMutation({
    mutationFn: ({ payload, id }: UpdateUserProps) => updateUser(id, payload),
    onSuccess: () => {
      const resourceName = t(`notifications.resources.user`)

      addMessage({
        text: t('notifications.success.updated', { resource: resourceName }),
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
