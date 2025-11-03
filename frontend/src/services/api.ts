import { useAuth } from '@/stores/auth.store'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

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
    const { t } = useI18n()

    if (error.response && error.response.status === 401) {
      console.warn('Interceptor 401: Token expirado ou inválido.')

      authStore.clearAuth(t('notifications.auth.sessionExpired'))
    }

    return Promise.reject(error)
  },
)

export default api
