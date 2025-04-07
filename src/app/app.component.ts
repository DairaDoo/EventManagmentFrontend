import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NavbarComponent } from './components/navbar/navbar.component'

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterOutlet, MatToolbarModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'event-managment-frontend'
}
