import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GLOBAL } from './global';

@Injectable({
	providedIn: 'root'
})
export class ExtensionService {
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

	addExtension(idsala): Observable<any> {
		return this.http
			.post<any>(this.url + 'addExtension', idsala, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	updateExetension(idextension): Observable<any> {
		return this.http
			.put<any>(this.url + 'updateExtension', idextension, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	findByIdExtension(idextension): Observable<any> {
		return this.http
			.post<any>(this.url + 'findByIdExtension', idextension, this.httpOptions)
			.pipe(retry(1), catchError(this.errorHandl));
	}

	findAllExtension(): Observable<any> {
		return this.http
			.get<any>(this.url + 'findAllExtension')
			.pipe(retry(1), catchError(this.errorHandl));
	}
}
