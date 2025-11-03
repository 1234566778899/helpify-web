import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ProyectoSoloConDatosDTO } from '../../../../core/models/proyecto.model';

@Component({
  selector: 'app-card-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  templateUrl: './card-proyecto.html',
  styleUrl: './card-proyecto.css'
})
export class CardProyectoComponent {
  @Input() proyecto!: ProyectoSoloConDatosDTO;
  @Input() showActions = true;
  @Output() agregarWishlist = new EventEmitter<number>();

  get porcentajeRecaudado(): number {
    return (this.proyecto.montorecaudado / this.proyecto.montoobjetivo) * 100;
  }

  get diasRestantes(): number {
    const hoy = new Date();
    const fechaFin = new Date(this.proyecto.fechafin);
    const diferencia = fechaFin.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  onAgregarWishlist(): void {
    this.agregarWishlist.emit(this.proyecto.idproyecto);
  }
}