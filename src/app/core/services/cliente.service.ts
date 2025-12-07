import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Tu servidor Java
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  // 1. LISTAR (GET)
  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 2. OBTENER UNO POR ID (GET) - Lo pide el error TS2551
  getClienteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 3. GUARDAR INTELIGENTE (Crear o Editar) - Lo pide el error TS2339
  saveCliente(cliente: any): Observable<any> {
    if (cliente.id) {
      // Si tiene ID, es una ACTUALIZACIÓN (PUT)
      return this.http.put(`${this.apiUrl}`, cliente);
    } else {
      // Si no tiene ID, es NUEVO (POST)
      return this.http.post(this.apiUrl, cliente);
    }
  }

  // 4. BORRAR (DELETE) - Lo pide el error TS2339
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}