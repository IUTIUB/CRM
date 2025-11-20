import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../core/services/cliente.service';
import { Cliente } from '../../core/models/cliente.models'; 

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // <--- Importante importar ReactiveFormsModule
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form: FormGroup;
  esEdicion = false; // Para saber si cambiamos el título de "Nuevo" a "Editar"
  idEdicion: number | null = null;

  constructor() {
    // Definimos el formulario y validaciones
    this.form = this.fb.group({
      id: [null], // Campo oculto
      razonSocial: ['', [Validators.required, Validators.minLength(3)]],
      cif: ['', [Validators.required]],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      tipo: ['RESTAURANTE', [Validators.required]], // Valor por defecto
      activo: [true]
    });
  }

  ngOnInit(): void {
    // Comprobamos si hay un ID en la URL (ej: /clientes/editar/2)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEdicion = Number(id);
      this.cargarDatos(this.idEdicion);
    }
  }

  cargarDatos(id: number) {
    this.clienteService.getClienteById(id).subscribe(cliente => {
      if (cliente) {
        this.form.patchValue(cliente); // Rellena el formulario solo
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const cliente: Cliente = this.form.value;
    
    this.clienteService.saveCliente(cliente).subscribe(() => {
      // Al terminar, volvemos a la lista
      this.router.navigate(['/admin/clientes']);
    });
  }
}