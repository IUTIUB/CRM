import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  isRegister = false; // Controla si mostramos login o registro

  toggleRegister() {
    this.isRegister = !this.isRegister;
  }

  onSubmit() {
    if (this.isRegister) {
      alert('Funcionalidad de registro próximamente. Usa el Login por ahora.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        // REDIRECCIÓN INTELIGENTE
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          // Aquí crearemos la pantalla de cliente luego
          this.router.navigate(['/portal-cliente']); 
        }
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }
}