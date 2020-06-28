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
addSipWebRTC(obj): Observable<any> {
    console.log(obj);
    return this.http
      .post<any>(this.url + 'addSipWebRtc', obj, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  addSIP( alias, numero, tipo, password, idu): Observable<any> {
      this.sip = new Sip(alias, password, numero, idu, tipo);
      console.log('Datos obtenido para la extension SIP......');
      console.log(this.sip);
    return this.http.post<any>(this.url + 'addSip',  this.sip,
         this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  AddSipRadio(obj): Observable<any> {
    return this.http
      .post<any>(this.url + 'addSipRadio', obj, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  deleteSip( idd): Observable<any> {
      return this.http.delete<any>(this.url + 'deleteSip'+ {id: idd}
      );    
}

  llenarSIPsYIAX( idu): Observable<any> {
  return this.http.post<any>(this.url + 'getUsuariosWithSipsAndIaxs',  { id: idu },
       this.httpOptions).pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}


findAllSip(): Observable<any> {
  return this.http.get<any>(this.url + 'findAllSip').pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

EliminarSip_Iax(Identity) {
         this.http.request('delete',this.url+'deleteSip', {body:{id:Identity}}).subscribe(
           data => {
          console.log(data); 
          });
  }

ObtenerUsuarioContexto(contexto){
    return this.http.post<any>(this.url + 'getUsuByContextOfSip',  { context: contexto },
       this.httpOptions).pipe(
    retry(1),
    catchError(this.errorHandl)
  );
  }
obtenerAllExtensions(){
  return this.http.get<any>(this.url + 'findAllExtension').pipe(
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