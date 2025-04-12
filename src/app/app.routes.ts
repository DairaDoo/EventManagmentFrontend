import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { authGuard } from './guards/auth.guard'
import { RegisterComponent } from './pages/register/register.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [() => authGuard()],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signUp', component: SignUpComponent },
  // Redirect any unknown paths to home
  { path: '**', redirectTo: '' },
]
