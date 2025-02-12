import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearUsuarioDTO } from '../dto/crear-usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {


 private admintURL = "http://localhost:8000/administrator";
 
 constructor(private http: HttpClient) {  }

 public crearUsuario(crearUser: CrearUsuarioDTO ): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.admintURL}/usuarios/crearUsuarios`, crearUser);
 }
}
