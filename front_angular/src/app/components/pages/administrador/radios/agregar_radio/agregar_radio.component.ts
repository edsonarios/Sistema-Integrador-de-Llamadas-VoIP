import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';

@Component({
	selector: 'agrega-radio',
	templateUrl: './agregar_radio.component.html'
})
export class AgregarRadioComponent implements OnInit {

	addForm: FormGroup;

	constructor(private router: Router,
		private formBuilder: FormBuilder,
		private serviceSip: SipService,) {
	}

	ngOnInit() {
		
		this.addForm = this.formBuilder.group({
			alias: ['', Validators.required],
			numero: ['',Validators.required],
			password: ['',Validators.required]
		})
	}

	addradio(){

		console.log(this.addForm.value);
			this.serviceSip.addSIP( 
				this.addForm.value.alias,
				this.addForm.value.numero,
				 'radio',  
				this.addForm.value.password, 
				25)
		   .subscribe(
		   response => {
			   
			   console.log('added Radio SIP Extension... ');
			   console.log(response);
		   },
		   er => console.log(er)
		   
		   );
		   
		   this.addForm = this.formBuilder.group({
			alias: [''],
			numero: [''],
			password: ['']
		})
	}
}
