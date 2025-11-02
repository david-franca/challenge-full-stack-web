import api from '@/services/api'
import type { GetAllApiProps, IPaginatedResponse, Register, UpdateUser, User } from '@/types'

export const getAllUsers = async (params?: GetAllApiProps): Promise<IPaginatedResponse<User>> => {
  const response = await api.get<IPaginatedResponse<User>>('/users', {
    params,
  })
  return response.data
}

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

export const createUser = async (payload: Register): Promise<User> => {
  const response = await api.post<User>('/users', payload)
  return response.data
}

export const updateUser = async (id: number, payload: UpdateUser): Promise<User> => {
  const response = await api.patch<User>(`/users/${id}`, payload)
  return response.data
}

export const removeUser = async (id: number): Promise<void> => {
  const response = await api.delete<void>(`/users/${id}`)
  return response.data
}
