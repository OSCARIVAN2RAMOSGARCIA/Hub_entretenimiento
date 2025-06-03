import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    Email: '',
    Password: ''
  };
  errorMessage: string | null = null;
  isLoading: boolean = false; // Para manejar el estado de carga

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit() {
    this.errorMessage = null;
    this.isLoading = true;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:5057/api/auth/login', this.loginData, { headers })
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          
          // Guarda el token y otros datos de autenticación
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            // Redirige al home después del login exitoso
            this.router.navigate(['/home']);
          } else {
            this.handleError('No se recibió token de autenticación');
          }
           // Guarda el idUsuario si viene en la respuesta
          if (response.idUsuario) {
            localStorage.setItem('idUsuario', response.idUsuario.toString());
          } else {
            console.warn('La respuesta no incluyó idUsuario');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error en el login:', error);
          
          // Mostrar alerta y recargar solo si el usuario acepta
          const userConfirmed = confirm('Contraseña incorrecta. ¿Deseas intentar de nuevo?');
          
          if (userConfirmed) {
            this.resetForm();
          } else {
            this.errorMessage = error.error?.message || 'Error al iniciar sesión';
          }
        }
      });
  }

  private resetForm() {
    this.loginData.Password = ''; // Solo limpia la contraseña
    this.errorMessage = null;
    // No es necesario recargar toda la página, solo resetear el formulario
  }

  private handleError(message: string) {
    this.errorMessage = message;
    console.error(message);
  }
}