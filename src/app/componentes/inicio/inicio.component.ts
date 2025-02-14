import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ViewFactsPendientesComponent } from '../view-facts-pendientes/view-facts-pendientes.component';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ViewFactsPendientesComponent],
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
    constructor(private tokenService: TokenService,private router: Router) {
      this.isLogged = this.tokenService.isLogged();
      
   
      if (this.isLogged) {
        this.email = this.tokenService.getEmail();
        this.rol= this.tokenService.getRol();
        this.isAdmin = this.tokenService.isAdmin();
        this.isEmpleado = this.tokenService.isEmpleado();
        this.idUser=this.tokenService.getID();
      }
    }
   
   
    public logout() {
      this.tokenService.logout();
    }
}
