import { InjectionToken } from '@angular/core'

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL')

export const apiBaseUrlProvider = {
  provide: API_BASE_URL,
  useValue: 'https://localhost:7047/api', // Change this to match your backend API URL
}
