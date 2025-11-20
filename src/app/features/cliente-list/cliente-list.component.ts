import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClienteService } from '../../core/services/cliente.service';

import { Cliente } from '../../core/models/cliente.models';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent {
  private clienteService = inject(ClienteService);

 
  clientes = toSignal(this.clienteService.getClientes(), { initialValue: [] });
  
} 