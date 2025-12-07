import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
  
  cliente = {
    razonSocial: '',
    cif: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo: 'CAFETERIA'
  };

  mensaje = '';

  constructor(private clienteService: ClienteService) {}

  guardar() {
    // Fíjate que hemos añadido ": any" a res y err
    this.clienteService.crearCliente(this.cliente).subscribe({
      next: (res: any) => {  // <--- AQUÍ ESTABA EL ERROR 1
        this.mensaje = '¡Cliente registrado con éxito! 🎉';
        // Limpiamos el formulario
        this.cliente = { razonSocial: '', cif: '', email: '', telefono: '', direccion: '', tipo: 'CAFETERIA' };
      },
      error: (err: any) => { // <--- AQUÍ ESTABA EL ERROR 2
        this.mensaje = '❌ Error al guardar. Revisa el CIF o Email.';
        console.error(err);
      }
    });
  }
}