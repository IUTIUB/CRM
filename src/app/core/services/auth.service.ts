import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of, delay, tap } from 'rxjs';

// Definimos los tipos de usuario posibles
export type UserRole = 'ADMIN' | 'CLIENTE';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Signal para saber quién está logueado (null = nadie)
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {}

  // Método simulado de Login
  login(email: string, pass: string) {
    // SIMULACIÓN DE BACKEND
    let user: User | null = null;

    if (email === 'admin@panaderia.com' && pass === '1234') {
      user = { id: 1, name: 'Jefe Supremo', email, role: 'ADMIN' };
    } else if (email === 'cliente@bar.com' && pass === '1234') {
      user = { id: 2, name: 'Bar Pepe', email, role: 'CLIENTE' };
    }

    // Simulamos retardo de red y guardamos el usuario
    return of(user).pipe(
      delay(500),
      tap(usuarioEncontrado => {
        if (usuarioEncontrado) {
          this.currentUser.set(usuarioEncontrado);
          // Guardamos en localStorage para que no se cierre al recargar
          localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
        }
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Método para recuperar sesión al recargar la página (F5)
  checkSession() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
      return true;
    }
    return false;
  }
}