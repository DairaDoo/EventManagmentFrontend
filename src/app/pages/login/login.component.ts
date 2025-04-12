import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import { CommonModule } from '@angular/common'

// Angular Material Imports
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

// Services
import { AuthService } from '../../services/auth.service'
  
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isLoading = false
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true

    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }

    // In login.component.ts - fix the response unused variable
    this.authService.login(loginData).subscribe({
      next: () => {
        // Remove the 'response' parameter since it's not used
        // Show success message
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar',
        })

        // Navigate to home page
        this.router.navigate(['/'])
        this.isLoading = false
      },
      error: (error: Error) => {
        // Replace 'any' with a specific type
        // Show error message
        this.snackBar.open(
          error instanceof HttpErrorResponse && error.error?.message
            ? error.error.message
            : 'Login failed. Please try again.',
          'Close',
          {
            duration: 5000,
            panelClass: 'error-snackbar',
          },
        )
        this.isLoading = false
      },
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName)

    if (control?.hasError('required')) {
      return 'This field is required'
    }

    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long'
    }

    return ''
  }
}
