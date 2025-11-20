import { Component, inject, OnInit, signal, computed } from '@angular/core';
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

  clientes = signal<Cliente[]>([]);
  selectedIds = signal<Set<number>>(new Set());

  // NUEVO: Señal para controlar si estamos en "Modo Borrado"
  isDeleteMode = signal(false);

  areAllSelected = computed(() => {
    return this.clientes().length > 0 && this.selectedIds().size === this.clientes().length;
  });

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes.set(data);
      this.selectedIds.set(new Set());
      this.isDeleteMode.set(false); // Al cargar, siempre modo normal
    });
  }

  // NUEVO: Activar / Desactivar los cuadraditos
  toggleDeleteMode() {
    // Invertimos el valor (true -> false, false -> true)
    this.isDeleteMode.update(v => !v);
    
    // Si salimos del modo borrado, limpiamos la selección para que no se quede guardada
    if (!this.isDeleteMode()) {
      this.selectedIds.set(new Set());
    }
  }

  toggleSelection(id: number) {
    const currentSet = new Set(this.selectedIds());
    if (currentSet.has(id)) {
      currentSet.delete(id);
    } else {
      currentSet.add(id);
    }
    this.selectedIds.set(currentSet);
  }

  toggleAll() {
    if (this.areAllSelected()) {
      this.selectedIds.set(new Set());
    } else {
      const allIds = this.clientes().map(c => c.id);
      this.selectedIds.set(new Set(allIds));
    }
  }

  confirmarBorrado() {
    const total = this.selectedIds().size;
    if (total === 0) return; // Si no hay nada marcado, no hacemos nada

    // La ventanita de confirmación
    if (confirm(`⚠️ ATENCIÓN: ¿Estás seguro de que quieres eliminar ${total} clientes permanentemente?`)) {
      
      const ids = Array.from(this.selectedIds());
      let borrados = 0;

      ids.forEach(id => {
        this.clienteService.deleteCliente(id).subscribe(() => {
          borrados++;
          if (borrados === total) {
            this.cargarDatos(); // Esto reseteará el modo borrado también
          }
        });
      });
    }
  }
}