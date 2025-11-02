import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createStudent } from '../api/studentService'
import type { CreateStudent } from '@/types/Student'
import { useMessages } from '@/stores/messages.store'
import { handleErrors } from '@/utils/handleErrors'
import { useI18n } from 'vue-i18n'

export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (payload: CreateStudent) => createStudent(payload),
    onSuccess: () => {
      addMessage({ text: t('notifications.student.created'), color: 'success' })
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (err) => {
      const errors = handleErrors(err)
      errors.forEach((error) => {
        addMessage({ text: error, color: 'error' })
      })
    },
  })
}
