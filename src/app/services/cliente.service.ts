import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  crearCliente(cliente: { razonSocial: string; cif: string; email: string; telefono: string; direccion: string; tipo: string; }): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}
