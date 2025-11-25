import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-pedidos-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-pedidos-form.component.html', // Ahora sí usamos el archivo externo
  styleUrl: './client-pedidos-form.component.css'      // Y el CSS externo
})
export class ClientPedidosFormComponent {

}