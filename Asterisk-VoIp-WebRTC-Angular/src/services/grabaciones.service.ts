import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GLOBAL } from './global';

@Injectable({
    providedIn: 'root'
})
export class GrabacionesService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    
    repro(unique, chann): Observable<any> {
        console.log(unique, chann); 
        return this.http
          .post<any>(this.url+'listenCalls',
            { uniqueid: unique, channel: chann },
            this.httpOptions
          )
          .pipe(catchError(this.errorHandl));
      }   

    downloadFile(uni, chan) {
        console.log(uni, chan);
        return this.http.get(this.url+'downloadCalls/'+uni+'/'+chan, {
          responseType: 'arraybuffer'
        });
    }
}
