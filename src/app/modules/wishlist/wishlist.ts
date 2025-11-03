import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { ProyectoSoloConDatosDTO } from '../../core/models/proyecto.model';
import { CardProyectoComponent } from '../proyectos/components/card-proyecto/card-proyecto';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CardProyectoComponent
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class WishlistComponent implements OnInit {
  userName = '';
  wishlistProyectos: ProyectoSoloConDatosDTO[] = [];

  // Datos de ejemplo (reemplazar con datos reales del backend)
  proyectosEjemplo: ProyectoSoloConDatosDTO[] = [
    {
      idproyecto: 1,
      nombreproyecto: 'Tecnología para Aprender',
      descripcion: 'Contribuye a llevar computadoras y acceso a internet a escuelas rurales. La educación digital abre nuevas oportunidades.',
      montoobjetivo: 10000,
      montorecaudado: 6500,
      fechainicio: '2025-01-01',
      fechafin: '2025-12-31',
      nombreorganización: 'Fundación Educativa',
      escuelabeneficiada: 'I.E. Rural San José',
      cupoMaximo: 50,
      imagen: 'assets/images/proyecto-tecnologia.jpg'
    },
    {
      idproyecto: 2,
      nombreproyecto: 'Escuelas con Futuro',
      descripcion: 'Apoya la mejora de escuelas rurales con aulas equipadas, materiales y un mejor entorno de aprendizaje para los niños.',
      montoobjetivo: 15000,
      montorecaudado: 8200,
      fechainicio: '2025-02-01',
      fechafin: '2025-11-30',
      nombreorganización: 'ONG Educación para Todos',
      escuelabeneficiada: 'I.E. Santa Rosa',
      cupoMaximo: 75,
      imagen: 'assets/images/proyecto-escuela.jpg'
    }
  ];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userName = `${currentUser.nombre} ${currentUser.apellidopaterno} ${currentUser.apellidomaterno}`;
    }

    // Cargar proyectos del wishlist (simulado)
    this.cargarWishlist();
  }

  cargarWishlist(): void {
    // TODO: Implementar servicio para obtener wishlist del usuario
    // Por ahora usamos datos de ejemplo
    this.wishlistProyectos = this.proyectosEjemplo;
  }

  eliminarDeWishlist(idProyecto: number): void {
    this.wishlistProyectos = this.wishlistProyectos.filter(
      p => p.idproyecto !== idProyecto
    );

    this.snackBar.open('Proyecto eliminado de tu wishlist', 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}