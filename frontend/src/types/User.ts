export interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export interface UpdateUser {
  name?: string
  email?: string
  password?: string
  role?: 'admin' | 'user'
}

export interface UpdateUserProps {
  id: number
  payload: UpdateUser
}
