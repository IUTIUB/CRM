export type EstadoIncidencia = 'ABIERTA' | 'EN_PROCESO' | 'RESUELTA';
export type PrioridadIncidencia = 'BAJA' | 'MEDIA' | 'ALTA';

export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  estado: EstadoIncidencia;
  prioridad: PrioridadIncidencia;
  // En el futuro, aquí irá el ID del cliente que la crea
  clienteId?: number; 
}