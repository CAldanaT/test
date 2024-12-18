import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../config/config';
import { Ciudad } from '../_modules/Ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = URL_API + 'ubicaciones';

  constructor(private http: HttpClient) {}

  buscarUbicaciones(termino: string): Observable<Ciudad[]> {
    let params = new HttpParams().set('termino', termino);
    return this.http.get<Ciudad[]>(this.apiUrl+"/buscar", {params: params});
  }
}