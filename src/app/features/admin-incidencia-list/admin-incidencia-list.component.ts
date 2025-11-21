import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para las fechas (DatePipe)
import { IncidenciaService } from '../../core/services/incidencia.service';
import { Incidencia } from '../../core/models/incidencia.models';

@Component({
  selector: 'app-admin-incidencia-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin-incidencia-list.component.html',
  styleUrl: './admin-incidencia-list.component.scss'
})
export class AdminIncidenciaListComponent implements OnInit {
  
  private incidenciaService = inject(IncidenciaService);
  
  incidencias = signal<Incidencia[]>([]);

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.incidenciaService.getIncidencias().subscribe(data => {
      this.incidencias.set(data);
    });
  }

  marcarResuelta(id: number) {
    if(confirm('¿Marcar esta incidencia como resuelta?')) {
      this.incidenciaService.resolverIncidencia(id).subscribe(() => {
        this.cargarDatos(); // Recargar para ver el cambio de estado
      });
    }
  }
}