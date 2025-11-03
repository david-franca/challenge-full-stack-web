import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeStudent } from '../api/studentService'
import { useMessages } from '@/stores/messages.store'
import { useI18n } from 'vue-i18n'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const useRemoveStudent = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (ra: string) => removeStudent(ra),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      const resourceName = t(`notifications.resources.student`)

      addMessage({
        text: t('notifications.success.removed', { resource: resourceName }),
        color: 'success',
      })
    },
    onError: (err) => {
      const messages = handleApiResponse(err, 'student')
      messages.forEach((message) => {
        addMessage({ text: message, color: 'error' })
      })
    },
  })
}
