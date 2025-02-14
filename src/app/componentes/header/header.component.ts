import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Patmos Generator';
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
