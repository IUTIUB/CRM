import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router'; // Asegúrate de importar RouterOutlet si lo usas
import { ProductoService } from '../../services/producto.service';

// BORRA la línea que importaba ListaProductosComponent aquí

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  // CORRECCIÓN: Quitamos el doble "imports:" y quitamos ListaProductosComponent del array
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    // Pedimos los datos al Backend (Java)
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      },
      error: (e) => console.error('Error conectando con Java:', e)
    });
  }
}