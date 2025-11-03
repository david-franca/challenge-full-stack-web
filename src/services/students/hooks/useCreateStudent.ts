import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createStudent } from '../api/studentService'
import type { CreateStudent } from '@/types/Student'
import { useMessages } from '@/stores/messages.store'
import { useI18n } from 'vue-i18n'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (payload: CreateStudent) => createStudent(payload),
    onSuccess: () => {
      const resourceName = t(`notifications.resources.student`)

      addMessage({
        text: t('notifications.success.created', { resource: resourceName }),
        color: 'success',
      })
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (err) => {
      const errors = handleApiResponse(err, 'student')
      errors.forEach((error) => {
        addMessage({ text: error, color: 'error' })
      })
    },
  })
}
