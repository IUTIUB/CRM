// Definimos los tipos de cliente posibles (según tu borrador)
export type TipoCliente = 'RESTAURANTE' | 'CAFETERIA' | 'OTRO';

export interface Cliente {
  id: number;
  razonSocial: string;
  cif: string;
  direccion: string; // Simplificado para la tabla
  email: string;
  telefono: string;
  tipo: TipoCliente;
  activo: boolean; // Un extra útil visualmente
}