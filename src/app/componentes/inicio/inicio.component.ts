import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ViewFactsPendientesComponent } from '../view-facts-pendientes/view-facts-pendientes.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ViewFactsPendientesComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
