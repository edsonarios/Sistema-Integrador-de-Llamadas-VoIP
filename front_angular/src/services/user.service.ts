import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { Sip } from '../models/sip';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public idUser = localStorage.getItem('idUser');
  public url: string;
  public user;
  public sip: Sip;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  datosPrueba(): Observable<any> {
    return this.http.get<any>(this.url + 'datosPrueba').pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  findAllUsuario(): Observable<any> {
    return this.http.get<any>(this.url + 'findAllUsuario').pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  datosRoot(): Observable<any> {
    return this.http.get<any>(this.url + 'datosRoot').pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  datosOperador(): Observable<any> {
    return this.http.get<any>(this.url + 'datosOperador').pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  login(user): Observable<any> {
    return this.http.post<any>(this.url + 'login', JSON.stringify(user), this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
 

  addUsuario( user): Observable<any> {
    this.user = new User(user.nombre, user.apPaterno, user.apMaterno, user.direccion, user.telefono, user.correo, user.password);
  
    console.log('Datos registrados de Contacto ...   ');
    console.log(this.user);
    return this.http.post<any>(this.url + 'addUsuario',  this.user , this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateUser( user): Observable<any> {
    this.user = user;
    return this.http.put<any>(this.url + 'updateUsuario',  this.user , this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  findByIdUsuario( id): Observable<any> {
    return this.http.post<any>(this.url + 'findByIdUsuario',  id , this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
  listarContactos(): Observable<any> {
    return this.http.get<any>(this.url + 'findAllUsuario').pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }


  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
