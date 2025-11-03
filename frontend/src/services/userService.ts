import type { User } from '@/types/User'
import api from './api'

export const getAllUsers = async () => {
  const response = await api.get<User[]>('/users')
  return response.data
}

export const getUserById = async (id: number) => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: number, user: User) => {
  const response = await api.put<User>(`/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: number) => {
  const response = await api.delete<void>(`/users/${id}`)
  return response.data
}
