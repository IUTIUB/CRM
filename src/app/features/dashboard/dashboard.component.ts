import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';
// 1. IMPORTA EL FORMULARIO
import { ProductoFormComponent } from '../../components/producto-form/producto-form.component'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 2. AÑÁDELO AQUÍ
  imports: [CommonModule, ListaProductosComponent, ProductoFormComponent], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}