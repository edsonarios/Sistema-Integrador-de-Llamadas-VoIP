import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SalaService } from '../../../../../../services/sala.service';


@Component({
	selector: 'agregarSala',
	templateUrl: './agregar_sala.component.html',
	providers: [SalaService],
})
export class AgregarSalaComponent implements OnInit {
	
	addForm: FormGroup;
	
	constructor(private router: Router,
		private formBuilder: FormBuilder,
		private serviceSala: SalaService) {
		
	}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			nombreSala: ['', Validators.required],
			descripcion:['',Validators.required]
		})	
	}
	
	addSala(){
		console.log(this.addForm.value);
		this.serviceSala.addSala( this.addForm.value)
		.subscribe(
		response => {	
			console.log(response);
		},
		er => console.log(er),
		() => console.log('terminado')
		);

	}

}
