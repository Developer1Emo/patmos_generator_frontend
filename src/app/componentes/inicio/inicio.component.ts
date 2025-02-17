import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ViewFactsPendientesComponent } from '../view-facts-pendientes/view-facts-pendientes.component';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployedService } from '../../servicios/employed.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ViewFactsPendientesComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


  isLogged = false;
    isAdmin = false;
    isEmpleado = false;
  
    nombre: string = "";
    email: string = "";
    rol: string = "";
    idUser:string ='';
    constructor(private tokenService: TokenService,private router: Router,private eployedService: EmployedService) {
      this.isLogged = this.tokenService.isLogged();
      
   
      if (this.isLogged) {
        this.email = this.tokenService.getEmail();
        this.rol= this.tokenService.getRol();
        this.isAdmin = this.tokenService.isAdmin();
        this.isEmpleado = this.tokenService.isEmpleado();
        this.idUser=this.tokenService.getID();
      }
    }
   
    public generarPlano() {
      this.eployedService.descargarArchivo(this.idUser).subscribe({
        next: (response: HttpResponse<Blob>) => {
          if (response.body) {  // Validamos que `response.body` no sea null
            // Crear una URL para el Blob que contiene el archivo
            const url = window.URL.createObjectURL(response.body);
            const a = document.createElement('a'); // Crear un enlace para descargar
            a.href = url;
            a.download = 'mi_archivo.txt';  // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();  // Simula el clic para la descarga
            window.URL.revokeObjectURL(url);  // Liberar el URL después de la descarga
    
            // Mostrar mensaje de éxito con Swal
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'El archivo se descargó correctamente.',
              confirmButtonText: 'Aceptar'
            });
          } else {
            // Si `response.body` es null, muestra un mensaje de error
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'El archivo no se pudo descargar porque no se recibió el archivo.',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error: (error) => {
          console.error('Error al descargar el archivo', error);
    
          // Mostrar mensaje de error con Swal
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al intentar descargar el archivo.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
    
    public logout() {
      this.tokenService.logout();
    }
}
