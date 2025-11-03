import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProyectoService } from '../../../../core/services/proyecto.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ProyectoSoloConDatosDTO } from '../../../../core/models/proyecto.model';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-detalle-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSpinner
  ],
  templateUrl: './detalle-proyecto.html',
  styleUrl: './detalle-proyecto.css'
})
export class DetalleProyectoComponent implements OnInit {
  proyecto: ProyectoSoloConDatosDTO | null = null;
  isLoading = true;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('ROLE_ADMIN');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarProyecto(Number(id));
    }
  }

  cargarProyecto(id: number): void {
    this.isLoading = true;
    this.proyectoService.listarProyectos().subscribe({
      next: (proyectos) => {
        this.proyecto = proyectos.find(p => p.idproyecto === id) || null;
        this.isLoading = false;

        if (!this.proyecto) {
          this.snackBar.open('Proyecto no encontrado', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.router.navigate(['/proyectos']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Error al cargar el proyecto', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/proyectos']);
      }
    });
  }

  get porcentajeRecaudado(): number {
    if (!this.proyecto) return 0;
    return (this.proyecto.montorecaudado / this.proyecto.montoobjetivo) * 100;
  }

  get diasRestantes(): number {
    if (!this.proyecto) return 0;
    const hoy = new Date();
    const fechaFin = new Date(this.proyecto.fechafin);
    const diferencia = fechaFin.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  agregarAWishlist(): void {
    // TODO: Implementar lógica de wishlist
    this.snackBar.open('Proyecto agregado a tu wishlist', 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  donar(): void {
    // TODO: Implementar lógica de donación
    this.snackBar.open('Funcionalidad de donación próximamente', 'Cerrar', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }

  compartir(): void {
    if (navigator.share && this.proyecto) {
      navigator.share({
        title: this.proyecto.nombreproyecto,
        text: this.proyecto.descripcion,
        url: window.location.href
      }).catch(() => {
        this.copiarEnlace();
      });
    } else {
      this.copiarEnlace();
    }
  }

  copiarEnlace(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    });
  }

  eliminarProyecto(): void {
    if (!this.proyecto) return;

    const confirmacion = confirm('¿Estás seguro de eliminar este proyecto?');
    if (confirmacion) {
      this.proyectoService.eliminarProyecto(this.proyecto.idproyecto).subscribe({
        next: () => {
          this.snackBar.open('Proyecto eliminado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/proyectos']);
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar el proyecto', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}