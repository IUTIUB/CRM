import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClienteListComponent } from './features/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './features/cliente-form/cliente-form.component'; // <--- 1. ¿Tienes este import?

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      
      // 2. Fíjate bien en estas líneas:
      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/nuevo', component: ClienteFormComponent },      // <--- ESTA ES LA QUE FALLA
      { path: 'clientes/editar/:id', component: ClienteFormComponent }, // <--- ESTA PARA EDITAR
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];