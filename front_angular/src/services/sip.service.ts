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
export class SipService {
  
  public url: string;
  public user: User;
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

  addSIP( name, callerid, idu): Observable<any> {
      this.sip = new Sip(name, callerid, callerid, idu);
      console.log('Datos obtenido para la extension SIP......');
      console.log(this.sip);
    return this.http.post<any>(this.url + 'addSip',  this.sip,
         this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // updateSip(obj): Observable<any> {
  //   this.sip = new Sip(obj.alias, obj.telnumero, obj.telnumero);

  // return this.http.post<any>(this.url + 'updateSip',  this.sip,
  //      this.httpOptions).pipe(
  //   retry(1),
  //   catchError(this.errorHandl)
  // );
  // }



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