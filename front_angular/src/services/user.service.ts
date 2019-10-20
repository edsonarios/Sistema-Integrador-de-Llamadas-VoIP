import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


import 'rxjs/add/operator/map';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public url: string;

	httpOptions = {
		headers: new Headers({
		  'Content-Type': 'application/json'
		})
	  }  

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}
	


	

	
	
	
}