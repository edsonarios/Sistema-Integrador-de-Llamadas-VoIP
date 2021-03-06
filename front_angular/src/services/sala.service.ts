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

	addSala(objsala): Observable<any> {
		return this.http
			.post<any>(this.url + 'addSala', objsala, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	listarSalas(): Observable<any> {
		return this.http.get<any>(this.url + 'findAllSala').pipe(retry(1), catchError(this.errorHandl));
	}

	findByIdSala(idsala): Observable<any> {
		return this.http
			.post<any>(this.url + 'findByIdSala', idsala, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	updateSala(idsala): Observable<any> {
		return this.http
			.put<any>(this.url + 'updateSala', idsala, this.httpOptions)
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
