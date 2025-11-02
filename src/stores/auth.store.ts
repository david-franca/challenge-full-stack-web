import { setAuthHeader } from '@/services/auth/api/authService'
import type { User } from '@/types'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useMessages } from './messages.store'
import { useRouter } from 'vue-router'
import { i18n } from '@/locales/i18n'

type UserRole = 'admin' | 'user' | null

interface DecodedToken {
  name: string
  email: string
  role: UserRole
  iat: number
  exp: number
  sub: string
}

export const useAuth = defineStore(
  'auth',
  () => {
    const { addMessage } = useMessages()
    const t = i18n.global.t
    const router = useRouter()
    const token = ref<string | null>(null)
    const user = ref<User | null>(null)
    const role = ref<UserRole | null>()
    const tokenTimer = ref<number | null>(null)

    const isLoggedIn = computed(() => !!token.value)
    const isAdmin = computed(() => role.value === 'admin')
    const isUser = computed(() => role.value === 'user')

    function setAuth(newToken: string) {
      if (!newToken) {
        clearAuth()
        return
      }

      try {
        const decoded = jwtDecode<DecodedToken>(newToken)
        token.value = newToken
        role.value = decoded.role
        user.value = {
          name: decoded.name,
          email: decoded.email,
          id: parseInt(decoded.sub, 10),
          role: decoded.role || 'user',
          password: '',
        }

        if (tokenTimer.value) {
          clearTimeout(tokenTimer.value)
        }

        const expirationTime = decoded.exp * 1000 - Date.now()

        tokenTimer.value = setTimeout(() => {
          clearAuth(t('notifications.auth.sessionExpired'))
        }, expirationTime)

        setAuthHeader(newToken)
      } catch (error) {
        console.error(t('notifications.auth.invalidToken'), error)
        clearAuth()
      }
    }

    function clearAuth(logoutMessage: string | null = null) {
      token.value = null
      user.value = null
      role.value = null

      if (tokenTimer.value) {
        clearTimeout(tokenTimer.value)
        tokenTimer.value = null
      }

      if (logoutMessage) {
        addMessage({
          text: logoutMessage,
          color: 'info',
          timeout: 5000,
        })
      }

      router.push('/login')
      setAuthHeader(null)
    }

    return { token, isLoggedIn, setAuth, clearAuth, isAdmin, isUser, user, role }
  },
  {
    persist: true,
  },
)
