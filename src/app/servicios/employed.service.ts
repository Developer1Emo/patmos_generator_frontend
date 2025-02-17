import { HttpClient ,HttpParams } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployedService {

  private employedURL = "http://localhost:8000/employed";

  constructor(private http: HttpClient) { }

// Método para descargar el archivo
public descargarArchivo(id: string): Observable<HttpResponse<Blob>> {
  return this.http.get(`${this.employedURL}/crearPlano/${id}`, {
    observe: 'response',
    responseType: 'blob'  // Indicamos que esperamos una respuesta en formato Blob
  });
}


}
