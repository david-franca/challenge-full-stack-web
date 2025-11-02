import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateStudent } from '../api/studentService'
import type { UpdateStudent } from '@/types/Student'
import { useMessages } from '@/stores/messages.store'
import { handleErrors } from '@/utils/handleErrors'
import { useI18n } from 'vue-i18n'

interface UpdateStudentProps {
  ra: string
  payload: UpdateStudent
}

export const useUpdateStudent = () => {
  const { addMessage } = useMessages()
  const queryClient = useQueryClient()
  const { t } = useI18n()

  return useMutation({
    mutationFn: ({ payload, ra }: UpdateStudentProps) => updateStudent(ra, payload),
    onSuccess: () => {
      addMessage({ text: t('notifications.student.updated'), color: 'success' })
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
