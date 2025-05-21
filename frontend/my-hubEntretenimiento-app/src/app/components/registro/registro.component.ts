import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroData = {
    Nombre: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  };
  errorMessage: string | null = null;
  isLoading: boolean = false;
  passwordsMatch: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  checkPasswords() {
    this.passwordsMatch = this.registroData.Password === this.registroData.ConfirmPassword;
    return this.passwordsMatch;
  }

  onSubmit() {
    if (!this.checkPasswords()) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.errorMessage = null;
    this.isLoading = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const dataToSend = {
      Nombre: this.registroData.Nombre,
      Email: this.registroData.Email,
      Password: this.registroData.Password
    };

    this.http.post('http://localhost:5057/api/auth/registro', dataToSend, { headers })
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          alert('Registro exitoso. Serás redirigido al login.');
          this.router.navigate(['']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error en el registro:', error);
          this.errorMessage = error.error?.message || 'Error durante el registro';
        }
      });
  }
}