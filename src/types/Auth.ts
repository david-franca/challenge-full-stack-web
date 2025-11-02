export interface Login {
  email: string
  password: string
}

export interface Register {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export interface AuthReponse {
  access_token: string
}
