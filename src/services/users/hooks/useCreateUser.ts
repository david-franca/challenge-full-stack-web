import { useMessages } from '@/stores/messages.store'
import type { Register } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser } from '../api/userService'
import { handleErrors } from '@/utils/handleErrors'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { addMessage } = useMessages()

  return useMutation({
    mutationFn: (payload: Register) => createUser(payload),
    onSuccess: () => {
      addMessage({ text: 'Usuário adicionado com sucesso!', color: 'success' })
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
