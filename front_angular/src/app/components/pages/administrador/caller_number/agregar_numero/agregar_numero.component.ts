import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';

@Component({
	selector: 'AgregarNumero',
	templateUrl: './agregar_numero.component.html'
})
export class AgregarNumeroComponent implements OnInit {
	public identy;
	addForm: FormGroup;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private serviceSip: SipService) {
	}

	ngOnInit() {
		this.identy = this.route.snapshot.paramMap.get('id');
		console.log(this.route.snapshot.paramMap.get('id'));

		this.addForm = this.formBuilder.group({
			alias: ['', Validators.required],
			tipo: ['',Validators.required],
			numero: ['',Validators.required],
			password: ['',Validators.required]
		})
	}

	addnumero(){
		console.log(this.addForm.value);
			this.serviceSip.addSIP( 
				this.addForm.value.alias,
				this.addForm.value.numero,
				this.addForm.value.tipo,  
				this.addForm.value.password, 
				this.identy)
		   .subscribe(
		   rt => {
			   
			   console.log('added SIP Extension... ');
			   console.log(rt);
		   },
		   er => console.log(er),
		   () => console.log('terminado')
		   );
		   console.log(this.addForm.value);		
	}
	
}
