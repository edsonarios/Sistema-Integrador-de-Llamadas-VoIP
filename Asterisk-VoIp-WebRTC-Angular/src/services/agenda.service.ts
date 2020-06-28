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
export class AgendaService {
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

	addAmigo(id, name): Observable<any> {
		return this.http
			.post<any>(this.url + 'addAgenda', { usuarioId: id, Contactos: name }, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	listarAmigos(id): Observable<any> {
		return this.http
			.post<any>(this.url + 'ListarContactos', { usuarioId: id }, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
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
