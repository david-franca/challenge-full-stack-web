import type { Login } from '@/types/Auth'
import { useMutation } from '@tanstack/vue-query'
import { login, setAuthHeader } from '../api/authService'
import { useAuth } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import { useMessages } from '@/stores/messages.store'
import { handleErrors } from '@/utils/handleErrors'

export const useLogin = () => {
  const { setAuth } = useAuth()
  const router = useRouter()
  const { addMessage } = useMessages()
  return useMutation({
    mutationFn: (payload: Login) => login(payload),
    onSuccess: ({ access_token }) => {
      setAuthHeader(access_token)
      setAuth(access_token)
      router.push('/students')
    },
    onError: (err) => {
      const errors = handleErrors(err)
      errors.forEach((error) => {
        addMessage({ text: error, color: 'error' })
      })
    },
  })
}
