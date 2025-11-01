import api from '@/services/api'
import type { IPaginatedResponse } from '@/types/Paginate'
import type { CreateStudent, Student, UpdateStudent } from '@/types/Student'
import type { DataTableSortItem } from 'vuetify'

interface GetAllStudentsProps {
  search?: string
  limit: number
  page: number
  field: string
  order: DataTableSortItem['order']
}

export const getAllStudents = async (
  params?: GetAllStudentsProps,
): Promise<IPaginatedResponse<Student>> => {
  const response = await api.get<IPaginatedResponse<Student>>('/students', {
    params,
  })
  return response.data
}

export const getStudentById = async (ra: string): Promise<Student> => {
  const response = await api.get<Student>(`/students/${ra}`)
  return response.data
}

export const createStudent = async (payload: CreateStudent): Promise<Student> => {
  const response = await api.post<Student>('/students', payload)
  return response.data
}

export const updateStudent = async (ra: string, payload: UpdateStudent): Promise<Student> => {
  const response = await api.patch<Student>(`/students/${ra}`, payload)
  return response.data
}

export const removeStudent = async (ra: string): Promise<void> => {
  const response = await api.delete<void>(`/students/${ra}`)
  return response.data
}
