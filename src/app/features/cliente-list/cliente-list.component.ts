import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../core/services/cliente.service';
import { Cliente } from '../../core/models/cliente.models';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent implements OnInit {
  
  private clienteService = inject(ClienteService);

  // CAMBIO: Usamos un signal "normal" para poder actualizarlo nosotros
  clientes = signal<Cliente[]>([]);

  ngOnInit() {
    this.cargarDatos();
  }

  // Método para pedir los datos al servicio
  cargarDatos() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes.set(data); // <--- Aquí actualizamos la señal
    });
  }

  // Método para borrar
  borrarCliente(id: number) {
    // 1. Preguntar confirmación (Nativo del navegador)
    if (confirm('¿Estás seguro de que quieres borrar este cliente?')) {
      
      // 2. Llamar al servicio
      this.clienteService.deleteCliente(id).subscribe(() => {
        
        // 3. Al terminar, recargamos la lista para que desaparezca
        this.cargarDatos();
        
      });
    }
  }
}