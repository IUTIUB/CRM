import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesMock: Cliente[] = [
    { id: 1, razonSocial: 'Restaurante El Quijote', cif: 'B12345678', direccion: 'C/ Mayor 1', email: 'pedidos@elquijote.es', telefono: '600111222', tipo: 'RESTAURANTE', activo: true },
    { id: 2, razonSocial: 'Cafetería Central', cif: 'B87654321', direccion: 'Av. Libertad 45', email: 'hola@cafecentral.com', telefono: '912334455', tipo: 'CAFETERIA', activo: true },
    { id: 3, razonSocial: 'Hotel Plaza', cif: 'A99887766', direccion: 'Plaza España 10', email: 'compras@hotelplaza.com', telefono: '910000000', tipo: 'OTRO', activo: false }
  ];

  // 1. LISTAR
  getClientes(): Observable<Cliente[]> {
    return of([...this.clientesMock]).pipe(delay(400)); // Devolvemos una copia
  }

  // 2. OBTENER UNO POR ID (Para editar)
  getClienteById(id: number): Observable<Cliente | undefined> {
    const cliente = this.clientesMock.find(c => c.id === id);
    return of(cliente).pipe(delay(400));
  }

  // 3. GUARDAR (Crear o Actualizar)
  saveCliente(cliente: Cliente): Observable<boolean> {
    if (cliente.id) {
      // ACTUALIZAR (UPDATE)
      const index = this.clientesMock.findIndex(c => c.id === cliente.id);
      if (index !== -1) {
        this.clientesMock[index] = cliente;
      }
    } else {
      // CREAR (CREATE)
      cliente.id = this.clientesMock.length + 1; // ID autogenerado simple
      this.clientesMock.push(cliente);
    }
    return of(true).pipe(delay(400));
  }

  // 4. BORRAR
  deleteCliente(id: number): Observable<boolean> {
    this.clientesMock = this.clientesMock.filter(c => c.id !== id);
    return of(true).pipe(delay(400));
  }
}