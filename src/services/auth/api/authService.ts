import api from '@/services/api'
import type { AuthReponse, Login, Register } from '@/types/Auth'

export const setAuthHeader = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export const login = async (credentials: Login): Promise<AuthReponse> => {
  try {
    const { data } = await api.post<AuthReponse>('/auth/login', credentials)
    return data
  } catch (error) {
    setAuthHeader(null)
    throw error
  }
}

export const register = async (payload: Register): Promise<AuthReponse> => {
  const { data } = await api.post<AuthReponse>('/register', payload)
  return data
}
