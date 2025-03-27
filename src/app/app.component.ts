import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'event-managment-frontend'
}
