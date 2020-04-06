import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IaxService } from '@services/iax.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'iax',
	templateUrl: './iax.component.html'
})
export class IaxComponent implements OnInit {
	@Input() Alias:string;
	@Input() Numero:string;
	@Input() Context:string;
	@Input() Id:string;

	public identy

	constructor(private route: ActivatedRoute,
		private router: Router,
		private serviceIax: IaxService) {
	}

	ngOnInit() {
		
	}
	
	eliminar() {
		Swal.fire({
			title: 'Esta seguro?',
			text: 'Se eliminará, el número!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, añadirlo!'
		}).then(result => {
			this.eliminariax();
		});
	}

	eliminariax(){
		this.identy = this.route.snapshot.paramMap.get('id');
		console.log(this.identy);
		
		this.serviceIax.deleteIax( this.identy)
		.subscribe(
		rt => {	
			console.log(rt);
			
		},
		er => console.log(er),
		() => console.log('terminado')
		);
	}
}
