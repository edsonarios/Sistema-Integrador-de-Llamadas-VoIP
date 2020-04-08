import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
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
      'Content-Type': 'application/json'
    })
  };





  
 
  HistorialLlamadas(): Observable<any> {
    return this.http.get<any>(this.url + 'findAllCdr').pipe(
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