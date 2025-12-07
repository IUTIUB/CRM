import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Importante para los formularios
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  // Estos son los datos que rellenaremos
  producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };

  mensaje = ''; // Para decir "Guardado con éxito"

  constructor(private productoService: ProductoService) {}

  guardar() {
    this.productoService.crearProducto(this.producto).subscribe({
      next: (respuesta) => {
        this.mensaje = '¡Producto guardado correctamente! ✅';
        // Limpiamos el formulario
        this.producto = { nombre: '', descripcion: '', precio: 0, stock: 0 };
      },
      error: (error) => {
        this.mensaje = '❌ Error al guardar. Inténtalo de nuevo.';
        console.error(error);
      }
    });
  }
}