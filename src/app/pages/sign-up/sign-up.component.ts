import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

import { SignupService } from '../../services/sign-up.service'
import { User } from '../../interfaces/user.model'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private fb = inject(FormBuilder)
  private userService = inject(SignupService)
  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    passwordHash: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos correctamente.', 'Cerrar', { duration: 3000 })
      return
    }

    // Construimos manualmente el objeto User para evitar errores de tipado
    const newUser: User = {
      firstName: this.signupForm.get('firstName')?.value ?? '',
      lastName: this.signupForm.get('lastName')?.value ?? '',
      username: this.signupForm.get('username')?.value ?? '',
      email: this.signupForm.get('email')?.value ?? '',
      passwordHash: this.signupForm.get('passwordHash')?.value ?? '',
      role: 'User', // puedes enviar un rol por defecto o dejarlo opcional
    };


    this.userService.registerUser(newUser).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 })
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.snackBar.open('Error en el registro. Intenta nuevamente.', 'Cerrar', { duration: 3000 })
        console.error('Error:', error)
      },
    })
  }
}
