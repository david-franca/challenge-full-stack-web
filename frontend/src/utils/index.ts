export { validateCPF } from './validateCPF'
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface ApiResponse {
  statusCode: number
  timestamp: string
  path: string
  errors: string[]
}
