import { Component } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroDTO } from '../../dto/registro-dto';
import { PaginacionRegistroDTO } from '../../dto/paginacion-registro-dto';

@Component({
  selector: 'app-gestion-registros',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './gestion-registros.component.html',
  styleUrl: './gestion-registros.component.css'
})
export class GestionRegistrosComponent {
  registros: RegistroDTO[] = [];  // Array donde se almacenarán los registros
  paginaActual: number = 1;
  totalPaginas: number = 1;       // Número total de páginas, lo podemos obtener desde la respuesta del backend
  totalReg: number = 0;      // Total de usuarios (debe ser recibido del backend)
  loading: boolean = true;
 
   busquedaForm !: FormGroup;
  
  fechaDesde: string = '';
  fechaHasta: string = '';
  correoUsuario: string = '';
  errorMessage: string = '';  // Para mostrar errores si la validación falla


  constructor(private router: Router,private adminService: AdministradorService) { }

  ngOnInit(): void {
      this.busquedaForm = new FormGroup({
        correo: new FormControl('', []),
        fecha_desde: new FormControl('', []),
        fecha_hasta: new FormControl('', []),

      });
      
    }

  // Método para obtener los registros según los filtros
  obtenerRegistros(): void {

    this.errorMessage = '';  // Limpiar el mensaje de error

    // Obtener las fechas desde y hasta del formulario
    const fechaDesde = this.busquedaForm.value.fecha_desde;
    const fechaHasta = this.busquedaForm.value.fecha_hasta;
    const correoUsuario = this.busquedaForm.value.correo;

    // Validar que si fechaDesde o fechaHasta están vacíos, asignar la fecha de hoy
    const today = new Date().toISOString().split('T')[0];  // Fecha de hoy en formato 'YYYY-MM-DD'
    
    // Si fechaDesde está vacía, se asigna la fecha de hoy
    const fechaDesdeFinal = fechaDesde ? fechaDesde : today;

    // Si fechaHasta está vacía, se asigna la fecha de hoy
    const fechaHastaFinal = fechaHasta ? fechaHasta : today;

    // Validar que la fecha desde no sea mayor que la fecha hasta
    if (fechaDesdeFinal > fechaHastaFinal) {
      this.errorMessage = 'La fecha "Desde" no puede ser mayor que la fecha "Hasta".';
      this.loading = false;
      return; // Salir de la función si hay un error
    }

    this.adminService.getRegistros(this.fechaDesde, this.fechaHasta, this.correoUsuario, this.paginaActual).subscribe((response: PaginacionRegistroDTO) => {
      this.registros = response.results;  // Ahora recibimos los usuarios
      this.totalReg = response.count; // Total de usuarios
      this.totalPaginas = Math.ceil(this.totalReg / 10);  // Calcula el número total de páginas
      this.loading = false;  // Detiene el cargando
    }); 
  }

  // Cambiar de página (para la paginación)
  cambiarPagina(page: number): void {
    this.paginaActual = page;
    this.obtenerRegistros();
  }

}
