import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  public idUser = localStorage.getItem('idUser');
  public url: string;
  public user: User;
  
  
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };



 
 addSala(sala): Observable<any> {
    return this.http.post<any>(this.url + 'addSala', sala, this.httpOptions).pipe(
     retry(1),
     catchError(this.errorHandl)
    );
   }
  
  listarSalas(): Observable<any> {
   return this.http.get<any>(this.url + 'findAllSala').pipe(
    retry(1),
    catchError(this.errorHandl)
   );
  }

  buscarSala(): Observable<any> {
    return this.http.post<any>(this.url + 'findByIdSala', "ID sala", this.httpOptions).pipe(
     retry(1),
     catchError(this.errorHandl)
    );
   }
   
   updateSala(): Observable<any> {
    return this.http.put<any>(this.url + 'updateSala', "ID sala", this.httpOptions).pipe(
     retry(1),
     catchError(this.errorHandl)
    );
   }


   deleteSala(context): Observable<any> {
    return this.http.post<any>(this.url + 'deleteSala', {'context':context,'nuevaSala':'default'}, this.httpOptions).pipe(
     retry(1),
     catchError(this.errorHandl)
    );
   }

   ParticipantesSala(context){
      return this.http.post<any>(this.url + 'findUsuByNomSalaAndContext', {'context':context,'nombreSala':context}, this.httpOptions).pipe(
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