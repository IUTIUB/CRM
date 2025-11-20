import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Datos iniciales
  private clientesMock: Cliente[] = [
    { id: 1, razonSocial: 'Restaurante El Quijote', cif: 'B12345678', direccion: 'C/ Mayor 1', email: 'pedidos@elquijote.es', telefono: '600111222', tipo: 'RESTAURANTE', activo: true },
    { id: 2, razonSocial: 'Cafetería Central', cif: 'B87654321', direccion: 'Av. Libertad 45', email: 'hola@cafecentral.com', telefono: '912334455', tipo: 'CAFETERIA', activo: true },
    { id: 3, razonSocial: 'Hotel Plaza', cif: 'A99887766', direccion: 'Plaza España 10', email: 'compras@hotelplaza.com', telefono: '910000000', tipo: 'OTRO', activo: false }
  ];

  // Generador de IDs seguro (busca el ID más alto y suma 1)
  private getNextId(): number {
    if (this.clientesMock.length === 0) return 1;
    return Math.max(...this.clientesMock.map(c => c.id)) + 1;
  }

  // 1. LISTAR
  getClientes(): Observable<Cliente[]> {
    // Devolvemos una copia [...array] para evitar problemas de referencia
    return of([...this.clientesMock]).pipe(delay(400));
  }

  // 2. OBTENER UNO
  getClienteById(id: number): Observable<Cliente | undefined> {
    const cliente = this.clientesMock.find(c => c.id === id);
    // Devolvemos copia del objeto para no modificar el original por accidente
    return of(cliente ? { ...cliente } : undefined).pipe(delay(400));
  }

  // 3. GUARDAR (Crear o Actualizar)
  saveCliente(cliente: Cliente): Observable<boolean> {
    if (cliente.id) {
      // --- EDITAR ---
      // Creamos una nueva lista sustituyendo solo el editado
      this.clientesMock = this.clientesMock.map(c => 
        c.id === cliente.id ? cliente : c
      );
    } else {
      // --- CREAR ---
      const nuevoCliente = { ...cliente, id: this.getNextId() };
      // IMPORTANTE: Creamos un array nuevo añadiendo el cliente al final
      this.clientesMock = [...this.clientesMock, nuevoCliente];
    }
    return of(true).pipe(delay(400));
  }

  // 4. BORRAR
  deleteCliente(id: number): Observable<boolean> {
    // IMPORTANTE: Filter ya crea un array nuevo, así que esto está bien
    this.clientesMock = this.clientesMock.filter(c => c.id !== id);
    return of(true).pipe(delay(400));
  }
}