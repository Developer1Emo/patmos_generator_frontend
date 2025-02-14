
import { Routes } from '@angular/router';
import { LoginGuard } from './servicios/permiso.service';
import { RolesGuard } from './servicios/roles.service';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./componentes/inicio/inicio.component').then(m => m.InicioComponent),
        canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR","EMPLEADO"] }
    },
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent),
        canActivate: [LoginGuard],
    },
    {
        path: 'gestionUsuarios',
        loadComponent: () => import('./componentes/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent),
        canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } 
    },
    {
        path: 'crearUsuario',
        loadComponent: () => import('./componentes/crear-usuarios/crear-usuarios.component').then(m => m.CrearUsuariosComponent),
        canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }
    },
    {
        path: 'detalleUsuario/:id',
        loadComponent: () => import('./componentes/detalle-usuario/detalle-usuario.component').then(m => m.DetalleUsuarioComponent),
        canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }
    }
];