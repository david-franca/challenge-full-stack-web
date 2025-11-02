export interface Student {
  ra: string
  cpf: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface CreateStudent {
  ra: string
  cpf: string
  name: string
  email: string
}

export type UpdateStudent = Partial<Pick<CreateStudent, 'name' | 'email'>>
