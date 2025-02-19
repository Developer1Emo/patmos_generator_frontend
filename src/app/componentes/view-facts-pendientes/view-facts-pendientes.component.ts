import { Component } from '@angular/core';
import { FacturaDTO } from '../../dto/factura-dto';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';
import { EmployedService } from '../../servicios/employed.service';
import { PaginacionFactDTO } from '../../dto/paginacion-fact-dto';

@Component({
  selector: 'app-view-facts-pendientes',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './view-facts-pendientes.component.html',
  styleUrl: './view-facts-pendientes.component.css'
})
export class ViewFactsPendientesComponent {

  facturas: FacturaDTO[] = [];       // Ahora es un arreglo de 'Usuario'
  paginaActual: number = 1;
  totalPaginas: number = 1;       // Número total de páginas, lo podemos obtener desde la respuesta del backend
  totalUsuarios: number = 0;      // Total de usuarios (debe ser recibido del backend)
  loading: boolean = true;

constructor(private tokenService: TokenService,private router: Router,private eployedService: EmployedService) {  }


  ngOnInit(): void {
      this.obtenerFacturasPendientes(this.paginaActual);
    }
    refrescar(){
      this.obtenerFacturasPendientes(this.paginaActual);
    }
    obtenerFacturasPendientes(pagina: number): void {
        this.loading = true;  // Muestra el cargando
        this.eployedService.getFactsPendientes(pagina).subscribe((response: PaginacionFactDTO) => {
          this.facturas = response.results;  // Ahora recibimos los usuarios
          this.totalUsuarios = response.count; // Total de usuarios
          this.totalPaginas = Math.ceil(this.totalUsuarios / 10);  // Calcula el número total de páginas
          this.loading = false;  // Detiene el cargando
        });
      }
      cambiarPagina(pagina: number): void {
        if (pagina > 0 && pagina <= this.totalPaginas) {
          this.paginaActual = pagina;
          this.obtenerFacturasPendientes(pagina);
        }
      }
}
