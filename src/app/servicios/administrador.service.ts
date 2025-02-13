import { HttpClient ,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearUsuarioDTO } from '../dto/crear-usuario-dto';
import { PaginacionRespuestaDTO } from '../dto/paginacion-respuesta-dto';
import { ActualizarUsuarioDTO } from '../dto/actualizar-usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {


 private admintURL = "http://localhost:8000/administrator";
                    //http://localhost:8000/administrator/usuarios/detalle-usuario/20
 
 constructor(private http: HttpClient) {  }

 public crearUsuario(crearUser: CrearUsuarioDTO ): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.admintURL}/usuarios/crearUsuarios`, crearUser);
 }

public obtenerUsuarios(pagina: number): Observable<PaginacionRespuestaDTO> {
  let params = new HttpParams();
  params = params.append('page', pagina.toString());  // Agregar la página a la solicitud

  return this.http.get<PaginacionRespuestaDTO>(`${this.admintURL}/usuarios/listUsers`, { params });
}

public obtenerUsuarioId(id :String): Observable<ActualizarUsuarioDTO> {
  return this.http.get<ActualizarUsuarioDTO>(`${this.admintURL}/usuarios/detalle-usuario/${id}` );
}

public actualizarUsuario(id: string, usuarioActualizar: ActualizarUsuarioDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.admintURL}/usuarios/actualizar-usuario/${id}`, usuarioActualizar);
}

}
