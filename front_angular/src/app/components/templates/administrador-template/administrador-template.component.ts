import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'models/user';
// import { Sala } from '../../../../models/sala';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
	selector: 'administrador-template',
	templateUrl: './administrador-template.component.html'
	
})
export class AdministradorTemplateComponent implements OnInit {
	user: User;
	private sala;

	constructor(private formBuilder: FormBuilder) {
}
	ngOnInit() {}

}

