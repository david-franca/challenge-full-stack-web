import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateStudent } from '../api/studentService'
import type { UpdateStudent } from '@/types/Student'
import { useMessages } from '@/stores/messages.store'
import { useI18n } from 'vue-i18n'
import { handleApiResponse } from '@/utils/handleApiResponse'

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
      const resourceName = t(`notifications.resources.student`)

      addMessage({
        text: t('notifications.success.updated', { resource: resourceName }),
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
