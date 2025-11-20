import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common'; // <--- Importante para las clases del modal

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  private authService = inject(AuthService);

  // Variable para controlar si se muestra la ventana (false = oculta)
  showLogoutModal = signal(false);

  // 1. Botón de la puerta: Solo abre la ventana
  abrirModal() {
    this.showLogoutModal.set(true);
  }

  // 2. Botón Cancelar: Cierra la ventana
  cancelar() {
    this.showLogoutModal.set(false);
  }

  // 3. Botón Confirmar: Cierra sesión de verdad
  confirmarLogout() {
    this.authService.logout();
    this.showLogoutModal.set(false);
  }
}