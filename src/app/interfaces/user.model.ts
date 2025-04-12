// src/app/interfaces/user.model.ts
export interface User {
  id?: number // opcional si el backend lo genera
  firstName: string
  lastName: string
  username: string
  email: string
  passwordHash: string
  role?: string // opcional si el backend lo asigna por defecto
}
