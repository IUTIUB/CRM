import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './core/auth/login/login.component';

// Componentes Admin
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClienteListComponent } from './features/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/cliente-form/cliente-form.component';

export const routes: Routes = [
  
  // 1. RUTA PÚBLICA: LOGIN (Es la primera que se ve)
  { path: 'login', component: LoginComponent },

  // 2. ZONA PRIVADA (ADMIN)
  {
    path: 'admin',
    component: MainLayoutComponent, // Aquí está el Sidebar
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/nuevo', component: ClienteFormComponent },
      { path: 'clientes/editar/:id', component: ClienteFormComponent },
      
      // Redirección interna del admin
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 3. ZONA PRIVADA (CLIENTE - La haremos luego)
  { 
    path: 'portal-cliente', 
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    // ^ Truco temporal: Reutilizamos dashboard para que no de error 404 al probar el cliente
  },

  // REDIRECCIÓN INICIAL: Si entras a la raíz, vas al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // CUALQUIER COSA RARA -> LOGIN
  { path: '**', redirectTo: 'login' }
];