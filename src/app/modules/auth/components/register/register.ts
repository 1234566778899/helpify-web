import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  isLoading = false;

  tiposDocumento = [
    { value: 'DNI', label: 'DNI' },
    { value: 'Carnet de Extranjería', label: 'Carnet de Extranjería' },
    { value: 'Pasaporte', label: 'Pasaporte' }
  ];

  roles = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Voluntario' },
    { value: 3, label: 'Donante' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombredocumento: ['', Validators.required],
      numerodocumento: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidopaterno: ['', [Validators.required, Validators.minLength(2)]],
      apellidomaterno: ['', [Validators.required, Validators.minLength(2)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),   // ← CAMBIAR de 6 a 8
        Validators.maxLength(20)   // ← AGREGAR validación máxima
      ]],
      idRol: ['', Validators.required],
      aceptaTerminos: [false, Validators.requiredTrue]
    });
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (control?.hasError('email')) {
      return 'Ingresa un correo válido';
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }

    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }

    if (control?.hasError('pattern')) {
      if (field === 'numerodocumento') {
        return 'Ingresa un número de documento válido (8-12 dígitos)';
      }
      if (field === 'celular') {
        return 'Ingresa un número de celular válido (9 dígitos)';
      }
    }

    return '';
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const usuario: Usuario = this.registerForm.value;

    this.authService.register(usuario).subscribe({
      next: (response) => {
        this.snackBar.open('¡Registro exitoso! Por favor inicia sesión', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        let errorMessage = 'Error al registrar usuario';

        if (error.status === 409) {
          errorMessage = 'El correo o usuario ya está registrado';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }

        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}