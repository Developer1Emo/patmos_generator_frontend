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

// Método para obtener usuarios con búsqueda y paginación
public getUsuariosCadena(busqueda: string = '', page: number = 1): Observable<any> {
  let params = new HttpParams()
    .set('busqueda', busqueda)
    .set('page', page.toString());

  return this.http.get(`${this.admintURL}/usuarios/target/`, { params });
}

// Método para obtener los registros con fecha y correo de usuario
getRegistros(fechaDesde: string, fechaHasta: string, correoUsuario: string, page: number = 1): Observable<any> {
  let params = new HttpParams()
    .set('fecha_desde', fechaDesde)
    .set('fecha_hasta', fechaHasta)
    .set('correo', correoUsuario)
    .set('page', page.toString());  // Paginación si es necesario

  return this.http.get<any>(`${this.admintURL}/usuarios/registros/listReg/`, { params });
}

}
