import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./modules/auth/components/login/login')
            .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./modules/auth/components/register/register')
            .then(m => m.RegisterComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./modules/home/home')
            .then(m => m.HomeComponent)
    },
    {
        path: 'wishlist',
        canActivate: [authGuard],
        loadComponent: () => import('./modules/wishlist/wishlist')
            .then(m => m.WishlistComponent)
    },

    {
        path: 'proyectos',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/proyectos/proyectos.routes')
            .then(m => m.PROYECTOS_ROUTES)
    },
    {
        path: 'wishlist',
        canActivate: [authGuard],
        loadComponent: () => import('./modules/wishlist/wishlist')
            .then(m => m.WishlistComponent)
    },
    // {
    //     path: 'usuario',
    //     canActivate: [authGuard],
    //     loadChildren: () => import('./modules/usuario/usuario')
    //         .then(m => m.USUARIO_ROUTES)
    // },
    {
        path: '**',
        redirectTo: '/home'
    }
];