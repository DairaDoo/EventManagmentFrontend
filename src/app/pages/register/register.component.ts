import { Component, OnInit, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_BASE_URL } from '../../providers/api.provider'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, RouterModule } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { Registration } from '../../interfaces/registration.model'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registrations: Registration[] = []
  loading = false

  displayedColumns: string[] = ['id', 'userId', 'eventId', 'registrationDate', 'status']

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadRegistrations()
  }

  loadRegistrations(): void {
    this.loading = true
    this.http.get<Registration[]>(`${this.apiBaseUrl}/registration`).subscribe({
      next: data => {
        this.registrations = data
        this.loading = false
      },
      error: () => {
        this.snackBar.open('Error al cargar los registros', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        })
        this.loading = false
      },
    })
  }

  getStatusClass(status: string): string {
    status = status.toLowerCase()
    if (status === 'pendiente') {
      return 'status-pending'
    } else if (status === 'confirmado') {
      return 'status-confirmed'
    } else if (status === 'cancelado') {
      return 'status-canceled'
    } else if (status === 'completado') {
      return 'status-completed'
    }
    return 'status-pending'
  }
}
