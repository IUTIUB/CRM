import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-datos-form',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="main-container">
        <a routerLink="/portal-cliente" class="back-link">
            <span>←</span> Volver al Dashboard
        </a>

        <section class="card">
            <div class="card-header">
                <h1>Perfil de Negocio</h1>
                <p class="subtitle">Modifica los datos de tu establecimiento y preferencias.</p>
            </div>

            <form>
                <div class="form-section">
                    <h2 class="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5V21"/><path d="M9.5 21v-5"/><path d="M14.5 21v-5"/></svg>
                        Información General
                    </h2>
                    <div class="form-grid">
                        <div>
                            <label>Nombre Comercial</label>
                            <input type="text" value="Bar Pepe">
                        </div>
                        <div>
                            <label>CIF / NIF</label>
                            <input type="text" value="B-12345678" readonly style="background-color: #f1f5f9; color: #64748b; cursor: not-allowed;">
                        </div>
                        <div>
                            <label>Teléfono de Contacto</label>
                            <input type="tel" value="600 123 456">
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" value="contacto@barpepe.com">
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h2 class="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        Dirección de Entrega
                    </h2>
                    <div class="form-grid">
                        <div class="full-width">
                            <label>Dirección</label>
                            <input type="text" value="Calle Mayor, 45, Bajo Izq.">
                        </div>
                        <div>
                            <label>Ciudad</label>
                            <input type="text" value="Madrid">
                        </div>
                        <div>
                            <label>Código Postal</label>
                            <input type="text" value="28013">
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h2 class="section-title">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Logística
                    </h2>
                    <div class="form-grid">
                        <div>
                            <label>Horario Preferente</label>
                            <select>
                                <option>08:00 - 10:00</option>
                                <option selected>10:00 - 12:00</option>
                                <option>12:00 - 14:00</option>
                            </select>
                        </div>
                        <div>
                            <label>Día de Cierre</label>
                            <select>
                                <option>Ninguno</option>
                                <option selected>Lunes</option>
                                <option>Domingo</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-cancel" routerLink="/portal-cliente">Cancelar</button>
                    <button type="submit" class="btn btn-save">Guardar Cambios</button>
                </div>
            </form>
        </section>
    </main>
  `,
  styles: [`
    .main-container { max-width: 900px; margin: 30px auto; padding: 0 20px; font-family: 'Segoe UI', sans-serif; }
    
    /* Botón Volver */
    .back-link { display: inline-flex; align-items: center; color: #64748b; text-decoration: none; margin-bottom: 20px; font-weight: 500; cursor: pointer; transition: color 0.2s; }
    .back-link:hover { color: #1e293b; }
    .back-link span { margin-right: 8px; font-size: 1.1rem; }

    /* Tarjeta */
    .card { background: #fff; padding: 40px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .card-header h1 { font-size: 1.6rem; margin-bottom: 8px; color: #1e293b; font-weight: 700; }
    .subtitle { color: #64748b; margin-bottom: 30px; font-size: 1rem; }

    /* Estilos Formulario */
    .form-section { margin-bottom: 35px; border-bottom: 1px solid #e2e8f0; padding-bottom: 25px; }
    .section-title { color: #0f766e; font-weight: 600; margin-bottom: 20px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
    
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .full-width { grid-column: span 2; }

    label { display: block; font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.9rem; }
    input, select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 1rem; color: #1e293b; outline: none; background-color: #f8fafc; transition: all 0.2s; }
    input:focus, select:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); background-color: #fff; }

    /* Botones */
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 30px; }
    .btn { padding: 12px 24px; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; font-size: 0.95rem; }
    .btn-cancel { background: transparent; color: #64748b; }
    .btn-cancel:hover { background-color: #f1f5f9; color: #1e293b; }
    .btn-save { background: #10b981; color: white; } /* Verde para Datos */
    .btn-save:hover { background-color: #059669; }

    @media(max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .full-width { grid-column: span 1; } }
  `]
})
export class ClientDatosFormComponent {}