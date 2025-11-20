import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Incidencia } from '../models/incidencia.models';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  // Simulamos una base de datos vacía al principio
  private incidenciasMock: Incidencia[] = [];

  // GUARDAR INCIDENCIA (CREAR)
  createIncidencia(datos: Partial<Incidencia>): Observable<boolean> {
    
    const nuevaIncidencia: Incidencia = {
      id: this.incidenciasMock.length + 1,
      titulo: datos.titulo || 'Sin título',
      descripcion: datos.descripcion || '',
      fecha: new Date(), // Fecha de ahora mismo
      estado: 'ABIERTA', // Siempre nacen abiertas
      prioridad: 'MEDIA', // Por defecto
      ...datos
    } as Incidencia;

    this.incidenciasMock.push(nuevaIncidencia);
    
    console.log('📨 Incidencia enviada al servidor (Mock):', nuevaIncidencia);
    
    return of(true).pipe(delay(800)); // Simulamos que tarda un poco en enviarse
  }
}