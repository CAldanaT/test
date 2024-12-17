import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = URL_API + 'ubicaciones';

  constructor(private http: HttpClient) {}

  buscarUbicaciones(termino: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }
}