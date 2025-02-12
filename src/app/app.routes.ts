
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./componentes/inicio/inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent),
    }
];