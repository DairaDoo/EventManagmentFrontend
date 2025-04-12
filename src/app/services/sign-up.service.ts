// src/app/services/signup.service.ts
import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../interfaces/user.model'
import { API_BASE_URL } from '../providers/api.provider'

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private readonly endpoint = 'users' // o 'register' si tu endpoint es diferente

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string,
  ) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/${this.endpoint}`, user)
  }
}
