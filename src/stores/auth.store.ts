import { setAuthHeader } from '@/services/auth/api/authService'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuth = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)

    const isLoggedIn = computed(() => !!token.value)

    function setAuth(newToken: string) {
      token.value = newToken
      setAuthHeader(newToken)
    }

    function clearAuth() {
      token.value = null
      setAuthHeader(null)
    }

    return { token, isLoggedIn, setAuth, clearAuth }
  },
  {
    persist: true,
  },
)
