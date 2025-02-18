import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioDTO } from '../../dto/usuario-dto';
import { PaginacionRespuestaDTO } from '../../dto/paginacion-respuesta-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent {

  usuarios: UsuarioDTO[] = [];       // Ahora es un arreglo de 'Usuario'
  paginaActual: number = 1;
  totalPaginas: number = 1;       // Número total de páginas, lo podemos obtener desde la respuesta del backend
  totalUsuarios: number = 0;      // Total de usuarios (debe ser recibido del backend)
  loading: boolean = true;

  busquedaForm !: FormGroup;

  constructor(private router: Router,private adminService: AdministradorService) { }

  ngOnInit(): void {
    this.busquedaForm = new FormGroup({
      cadenaBuscada: new FormControl('', []),
    });
    this.obtenerUsuarios(this.paginaActual);
  }

  obtenerUsuarios(pagina: number): void {
    this.loading = true;  // Muestra el cargando
    this.adminService.obtenerUsuarios(pagina).subscribe((response: PaginacionRespuestaDTO) => {
      this.usuarios = response.results;  // Ahora recibimos los usuarios
      this.totalUsuarios = response.count; // Total de usuarios
      this.totalPaginas = Math.ceil(this.totalUsuarios / 10);  // Calcula el número total de páginas
      this.loading = false;  // Detiene el cargando
    });
  }

  cambiarPagina(pagina: number): void {
    if (pagina > 0 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.obtenerUsuarios(pagina);
    }
  }

  buscar(){
    // Llamada al servicio para actualizar el usuario
    const cadena: string = this.busquedaForm.value.cadenaBuscada;
    

    this.adminService.getUsuariosCadena(cadena,this.paginaActual).subscribe((response: PaginacionRespuestaDTO) => {
      this.usuarios = response.results;  // Ahora recibimos los usuarios
      this.totalUsuarios = response.count; // Total de usuarios
      this.totalPaginas = Math.ceil(this.totalUsuarios / 10);  // Calcula el número total de páginas
      this.loading = false;  // Detiene el cargando
    }); 
    
  }
}
