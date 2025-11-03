import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Token expirado o inválido
                authService.logout();
                router.navigate(['/login']);
            }

            if (error.status === 403) {
                // No tiene permisos
                console.error('No tienes permisos para realizar esta acción');
            }

            const errorMessage = error.error?.message || error.message || 'Error desconocido';
            return throwError(() => new Error(errorMessage));
        })
    );
};