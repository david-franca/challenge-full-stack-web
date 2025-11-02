import { useAuth } from '@/stores/auth.store'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Adicione isso:
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const authStore = useAuth()

    if (error.response && error.response.status === 401) {
      console.warn('Interceptor 401: Token expirado ou inválido.')

      authStore.clearAuth('Sua sessão expirou. Por favor, faça login.')
    }

    return Promise.reject(error)
  },
)

export default api
