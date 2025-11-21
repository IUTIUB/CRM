import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Incidencia } from '../models/incidencia.models';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  // DATOS DE PRUEBA (Para que el Admin tenga algo que ver)
  private incidenciasMock: Incidencia[] = [
    {
      id: 1,
      titulo: 'Pan de molde caducado',
      descripcion: 'Nos han llegado 3 paquetes con fecha de ayer.',
      fecha: new Date('2024-05-20'),
      estado: 'ABIERTA',
      prioridad: 'ALTA',
      clienteId: 2 // Bar Pepe
    },
    {
      id: 2,
      titulo: 'Falta albarán',
      descripcion: 'El repartidor no dejó el papel.',
      fecha: new Date('2024-05-21'),
      estado: 'RESUELTA',
      prioridad: 'BAJA',
      clienteId: 1 // Restaurante El Quijote
    }
  ];

  // 1. LISTAR TODAS (Para el Admin)
  getIncidencias(): Observable<Incidencia[]> {
    return of([...this.incidenciasMock]).pipe(delay(500));
  }

  // 2. CREAR (Para el Cliente)
  createIncidencia(datos: Partial<Incidencia>): Observable<boolean> {
    const nueva: Incidencia = {
      id: this.incidenciasMock.length + 1,
      titulo: datos.titulo || 'Sin título',
      descripcion: datos.descripcion || '',
      fecha: new Date(),
      estado: 'ABIERTA',
      prioridad: 'MEDIA',
      clienteId: 99 // Simulado
    } as Incidencia;

    this.incidenciasMock.unshift(nueva); // Añadir al principio de la lista
    return of(true).pipe(delay(800));
  }

  // 3. RESOLVER (Para el Admin)
  resolverIncidencia(id: number): Observable<boolean> {
    const incidencia = this.incidenciasMock.find(i => i.id === id);
    if (incidencia) {
      incidencia.estado = 'RESUELTA';
    }
    return of(true).pipe(delay(400));
  }
}