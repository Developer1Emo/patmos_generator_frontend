
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./componentes/inicio/inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'gestionUsuarios',
        loadComponent: () => import('./componentes/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent),
    },
    {
        path: 'crearUsuario',
        loadComponent: () => import('./componentes/crear-usuarios/crear-usuarios.component').then(m => m.CrearUsuariosComponent),
    }
];