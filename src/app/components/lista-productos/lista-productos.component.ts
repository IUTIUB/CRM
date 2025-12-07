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
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      },
      error: (e) => console.error('Error conectando con Java:', e)
    });
  }
}