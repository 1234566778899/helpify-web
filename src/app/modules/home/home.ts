import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { ProyectoService } from '../../core/services/proyecto.service';
import { ProyectoSoloConDatosDTO } from '../../core/models/proyecto.model';
import { CardProyectoComponent } from '../proyectos/components/card-proyecto/card-proyecto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    CardProyectoComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  userName = '';
  wishlistProyectos: ProyectoSoloConDatosDTO[] = [];
  proyectosDestacados: ProyectoSoloConDatosDTO[] = [];
  isLoading = false;

  estadisticas = {
    proyectosActivos: 0,
    escuelasBeneficiadas: 0,
    voluntarios: 0,
    donacionesRecaudadas: 0
  };

  caracteristicas = [
    {
      icon: 'school',
      titulo: 'Educación de Calidad',
      descripcion: 'Apoyamos proyectos que mejoran la educación en comunidades rurales'
    },
    {
      icon: 'volunteer_activism',
      titulo: 'Voluntariado',
      descripcion: 'Únete como voluntario y participa activamente en los proyectos'
    },
    {
      icon: 'favorite',
      titulo: 'Donaciones Seguras',
      descripcion: 'Tu aporte llega directamente a quien lo necesita'
    },
    {
      icon: 'groups',
      titulo: 'Comunidad Activa',
      descripcion: 'Forma parte de una red de personas comprometidas con el cambio'
    }
  ];

  // Datos de ejemplo para wishlist
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
    private proyectoService: ProyectoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();

    if (this.isAuthenticated) {
      this.cargarWishlist();
    } else {
      this.cargarProyectosDestacados();
      this.cargarEstadisticas();
    }
  }

  checkAuthentication(): void {
    const currentUser = this.authService.currentUserValue;
    this.isAuthenticated = !!currentUser;
    if (currentUser) {
      this.userName = `${currentUser.nombre} ${currentUser.apellidopaterno} ${currentUser.apellidomaterno}`;
    }
  }

  cargarWishlist(): void {
    // TODO: Implementar servicio para obtener wishlist del usuario desde el backend
    this.wishlistProyectos = this.proyectosEjemplo;
  }

  cargarProyectosDestacados(): void {
    this.isLoading = true;
    this.proyectoService.listarProyectos().subscribe({
      next: (proyectos) => {
        this.proyectosDestacados = proyectos
          .sort((a, b) => new Date(b.fechainicio).getTime() - new Date(a.fechainicio).getTime())
          .slice(0, 3);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al cargar proyectos', error);
      }
    });
  }

  cargarEstadisticas(): void {
    this.estadisticas = {
      proyectosActivos: 24,
      escuelasBeneficiadas: 48,
      voluntarios: 156,
      donacionesRecaudadas: 85000
    };
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}