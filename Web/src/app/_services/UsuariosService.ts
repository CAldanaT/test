import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../config/config';
import { Ciudad } from '../_modules/Ciudad.model';
import { Usuario } from '../_modules/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = URL_API + 'usuarios';

  constructor(private http: HttpClient) {}

  nuevoUsuario(usuario:Usuario): Observable<any> {
    return this.http.post(this.apiUrl+"/PostUsuario", usuario);
  }

  sendConfirmationEmail(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl+"", usuario);
  }

}