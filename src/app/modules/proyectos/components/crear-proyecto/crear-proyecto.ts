import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProyectoService } from '../../../../core/services/proyecto.service';
import { ProyectoDTO } from '../../../../core/models/proyecto.model';

@Component({
  selector: 'app-crear-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './crear-proyecto.html',
  styleUrl: './crear-proyecto.css'
})
export class CrearProyectoComponent implements OnInit {
  proyectoForm!: FormGroup;
  isLoading = false;
  imagenPreview: string | null = null;
  imagenBase64: string = '';

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.proyectoForm = this.fb.group({
      nombreproyecto: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
      montoobjetivo: ['', [Validators.required, Validators.min(0)]],
      montorecaudado: [0],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      nombreorganización: ['', Validators.maxLength(255)],
      escuelabeneficiada: ['', Validators.maxLength(255)],
      cupoMaximo: ['', Validators.min(1)]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Por favor selecciona una imagen válida', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open('La imagen no debe superar los 5MB', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
        this.imagenBase64 = e.target.result.split(',')[1]; // Obtener solo el base64
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.proyectoForm.invalid) {
      this.proyectoForm.markAllAsTouched();
      return;
    }

    if (!this.imagenBase64) {
      this.snackBar.open('Por favor selecciona una imagen', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isLoading = true;

    const proyecto: ProyectoDTO = {
      ...this.proyectoForm.value,
      imagen: this.imagenBase64,
      fechainicio: this.formatDate(this.proyectoForm.value.fechainicio),
      fechafin: this.formatDate(this.proyectoForm.value.fechafin)
    };

    this.proyectoService.crearProyecto(proyecto).subscribe({
      next: (response) => {
        this.snackBar.open(response.mensaje, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/proyectos']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Error al crear el proyecto', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getErrorMessage(field: string): string {
    const control = this.proyectoForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }

    if (control?.hasError('min')) {
      return 'El valor debe ser mayor a 0';
    }

    return '';
  }
}