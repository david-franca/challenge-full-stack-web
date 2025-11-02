import { useMessages } from '@/stores/messages.store'
import type { UpdateUserProps } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateUser } from '../api/userService'
import { handleErrors } from '@/utils/handleErrors'

export const useUpdateUser = () => {
  const { addMessage } = useMessages()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload, id }: UpdateUserProps) => updateUser(id, payload),
    onSuccess: () => {
      addMessage({ text: 'Usuário atualizado com sucesso!', color: 'success' })
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
