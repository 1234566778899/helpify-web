import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProyectoService } from '../../../../core/services/proyecto.service';
import { ProyectoSoloConDatosDTO } from '../../../../core/models/proyecto.model';
import { CardProyectoComponent } from '../card-proyecto/card-proyecto';

@Component({
  selector: 'app-lista-proyectos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    CardProyectoComponent
  ],
  templateUrl: './lista-proyectos.html',
  styleUrl: './lista-proyectos.css'
})
export class ListaProyectosComponent implements OnInit {
  proyectos: ProyectoSoloConDatosDTO[] = [];
  proyectosFiltrados: ProyectoSoloConDatosDTO[] = [];
  isLoading = false;
  searchTerm = '';
  ordenar = 'reciente';

  constructor(
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.isLoading = true;
    this.proyectoService.listarProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.proyectosFiltrados = data;
        this.aplicarOrden();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Error al cargar proyectos', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  buscarProyectos(): void {
    if (!this.searchTerm.trim()) {
      this.proyectosFiltrados = this.proyectos;
    } else {
      this.proyectosFiltrados = this.proyectos.filter(proyecto =>
        proyecto.nombreproyecto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proyecto.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proyecto.escuelabeneficiada?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proyecto.nombreorganización?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.aplicarOrden();
  }

  aplicarOrden(): void {
    switch (this.ordenar) {
      case 'reciente':
        this.proyectosFiltrados.sort((a, b) =>
          new Date(b.fechainicio).getTime() - new Date(a.fechainicio).getTime()
        );
        break;
      case 'antiguo':
        this.proyectosFiltrados.sort((a, b) =>
          new Date(a.fechainicio).getTime() - new Date(b.fechainicio).getTime()
        );
        break;
      case 'mayorMonto':
        this.proyectosFiltrados.sort((a, b) => b.montoobjetivo - a.montoobjetivo);
        break;
      case 'menorMonto':
        this.proyectosFiltrados.sort((a, b) => a.montoobjetivo - b.montoobjetivo);
        break;
    }
  }

  agregarAWishlist(idProyecto: number): void {
    // TODO: Implementar lógica de wishlist
    this.snackBar.open('Proyecto agregado a tu wishlist', 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  limpiarBusqueda(): void {
    this.searchTerm = '';
    this.buscarProyectos();
  }
}