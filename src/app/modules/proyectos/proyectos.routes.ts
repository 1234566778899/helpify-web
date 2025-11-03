import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const PROYECTOS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/lista-proyectos/lista-proyectos')
            .then(m => m.ListaProyectosComponent)
    },
    {
        path: 'crear',
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] },
        loadComponent: () => import('./components/crear-proyecto/crear-proyecto')
            .then(m => m.CrearProyectoComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/detalle-proyecto/detalle-proyecto')
            .then(m => m.DetalleProyectoComponent)
    }
];