import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeStudent } from '../api/studentService'
import { useMessages } from '@/stores/messages.store'
import { handleErrors } from '@/utils/handleErrors'

export const useRemoveStudent = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()

  return useMutation({
    mutationFn: (ra: string) => removeStudent(ra),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      addMessage({ text: 'Aluno removido com sucesso!', color: 'success' })
    },
    onError: (err) => {
      const messages = handleErrors(err)
      messages.forEach((message) => {
        addMessage({ text: message, color: 'error' })
      })
    },
  })
}
