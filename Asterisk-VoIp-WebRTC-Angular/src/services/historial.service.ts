import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  public idUser = localStorage.getItem('idUser');
  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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

  HistorialLlamadas(): Observable<any> {
    return this.http
      .get<any>(this.url + 'findAllCdr')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  //   Historial x fecha
  //Id del usario y una Fecha
  HistorialxFecha(id, fecha): Observable<any> {
    return this.http
      .post<any>(
        this.url + 'ListarHistorial',
        { usuarioId: id, fecha: fecha },
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Historial x sip o iax
  // sip o iax
  HistorialxSipoIax(obj): Observable<any> {
    return this.http
      .post<any>(
        this.url + 'ListarHistorialBySipsAndIaxs',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Historial de sip o iax x fecha
  // sip o iax y una fecha
  HistorialxSipoIaxxFecha(obj): Observable<any> {
    return this.http
      .post<any>(
        this.url + 'ListarHistorialByFechaBySipsAndIaxs',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Historial de sip o iax entre fechas
  // sip o iax y dos fechas
  HistorialxSipoIaxEntreFecha(obj, fecha1, fecha2): Observable<any> {
    return this.http
      .post<any>(
        this.url + 'ListarHistorialBetweenFechas',
        { numero: obj, fecha1: fecha1, fecha2: fecha2 },
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
}
