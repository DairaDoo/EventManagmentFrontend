import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { Router } from '@angular/router'
import { API_BASE_URL } from '../providers/api.provider'

interface LoginResponse {
  Token: string
}

interface LoginRequest {
  username: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token'
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken())

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(API_BASE_URL) private apiBaseUrl: string
  ) {}

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/users/login`, loginData).pipe(
      tap(response => {
        this.setToken(response.Token)
        this.isAuthenticatedSubject.next(true)
      })
    )
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    this.isAuthenticatedSubject.next(false)
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  private hasToken(): boolean {
    return !!this.getToken()
  }

  isAuthenticated(): boolean {
    return this.hasToken()
  }
}
