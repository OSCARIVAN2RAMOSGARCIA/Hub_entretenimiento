import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {} // Inyecta el Router
  // Método para redirigir al hacer clic
irARutaDestino() {
  Router
  this.router.navigate(['/home']); // Cambia '/ruta-destino' por tu ruta
}
}
