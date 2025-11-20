import { Component } from '@angular/core';
// 1. IMPORTAR ESTO
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  // 2. AÑADIRLO AQUÍ
  imports: [RouterLink], 
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

}