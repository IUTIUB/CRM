import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './core/auth/login/login.component';

//Componentes Cliente
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { ClientDashboardComponent } from './features/client-dashboard/client-dashboard.component';
import { ClientIncidenciaFormComponent } from './features/client-incidencia-form/client-incidencia-form.component';
import { ClientPedidosFormComponent } from './features/client-pedidos-form/client-pedidos-form.component';
import { ClientDatosFormComponent } from './features/client-datos-form/client-datos-form.component'; // <--- Esta ruta debe ser real


// Componentes Admin
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClienteListComponent } from './features/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/cliente-form/cliente-form.component';
import { AdminIncidenciaListComponent } from './features/admin-incidencia-list/admin-incidencia-list.component';


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
      { path: 'incidencias', component: AdminIncidenciaListComponent },
      { path: 'clientes/nuevo', component: ClienteFormComponent },
      { path: 'clientes/editar/:id', component: ClienteFormComponent },
      
      // Redirección interna del admin
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 3. ZONA PRIVADA (CLIENTE - La haremos luego)
  { 
    path: 'portal-cliente', 
    component: ClientLayoutComponent, // <--- Usamos el Layout Nuevo
    children: [
  { path: 'dashboard', component: ClientDashboardComponent },
  { path: 'incidencia/nueva', component: ClientIncidenciaFormComponent },

  { path: 'dashboard', component: ClientDashboardComponent },
    { path: 'pedidos/nuevo', component: ClientPedidosFormComponent },
    { path: 'perfil', component: ClientDatosFormComponent },
    // 2. AÑADE ESTA LÍNEA NUEVA 👇
    { path: 'dashboard', component: ClientDashboardComponent }, // Ahora ya existe esta clase de nuevo
    
  
  // 1. AÑADE LA COMA AQUÍ AL FINAL 👇
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  
  // 2. CORRIGE LA RUTA (Quita 'portal-cliente/') 👇
  { path: 'pedidos/nuevo', component: ClientPedidosFormComponent } 
]
  },

  // REDIRECCIÓN INICIAL: Si entras a la raíz, vas al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // CUALQUIER COSA RARA -> LOGIN
  { path: '**', redirectTo: 'login' }
];