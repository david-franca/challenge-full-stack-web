import { useMessages } from '@/stores/messages.store'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeUser } from '../api/userService'
import { handleErrors } from '@/utils/handleErrors'

export const useRemoveUser = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()

  return useMutation({
    mutationFn: (id: number) => removeUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      addMessage({ text: 'Usuário removido com sucesso!', color: 'success' })
    },
    onError: (err) => {
      const messages = handleErrors(err)
      messages.forEach((message) => {
        addMessage({ text: message, color: 'error' })
      })
    },
  })
}
