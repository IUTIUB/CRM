import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (e) => console.error(e)
    });
  }

  // --- NUEVO: FUNCIÓN PARA EL BOTÓN DE BORRAR ---
  eliminar(id: number) {
    if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          // Si Java lo borra bien, actualizamos la lista visualmente
          this.productos = this.productos.filter(p => p.id !== id);
          alert('🗑️ Producto eliminado correctamente');
        },
        error: (e) => alert('Error al eliminar. Inténtalo de nuevo.')
      });
    }
  }
}