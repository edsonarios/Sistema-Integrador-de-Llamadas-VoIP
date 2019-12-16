import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { Iax } from '../models/iax';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class IaxService {
  
  public url: string;
  public user: User;
  public iax: Iax;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

//   this.addForm.value.alias,
//   this.addForm.value.numero,
//   'friend',  
//   this.addForm.value.password, 
//   this.identy


  addIAX( alias, numero, tipo, password, idu): Observable<any> {
      this.iax = new Iax(alias, password, numero, idu, tipo);
      console.log('Datos obtenido para la extension SIP......');
      console.log(this.iax);
    return this.http.post<any>(this.url + 'addIax',  this.iax,
         this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteIax(idd): Observable<any> {

  return this.http.delete<any>(this.url + 'deleteIax'+ {id: idd}
         );
  }

  llenarSIPsYIAX( idu): Observable<any> {
    
  return this.http.post<any>(this.url + 'getUsuariosWithSipsAndIaxs',  { id: idu },
       this.httpOptions).pipe(
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