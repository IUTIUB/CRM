import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IncidenciaService } from '../../core/services/incidencia.service';

@Component({
  selector: 'app-client-incidencia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-incidencia-form.component.html',
  styleUrl: './client-incidencia-form.component.scss'
})
export class ClientIncidenciaFormComponent {
  
  private fb = inject(FormBuilder);
  private incidenciaService = inject(IncidenciaService);
  private router = inject(Router);

  form: FormGroup;
  enviando = false; // Para mostrar un spinner o deshabilitar el botón

  constructor() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviar() {
    if (this.form.invalid) return;

    this.enviando = true; // Bloqueamos el botón
    const datos = this.form.value;

    this.incidenciaService.createIncidencia(datos).subscribe(() => {
      this.enviando = false;
      alert('✅ ¡Incidencia enviada correctamente! Nos pondremos en contacto contigo pronto.');
      this.router.navigate(['/portal-cliente/dashboard']);
    });
  }
}