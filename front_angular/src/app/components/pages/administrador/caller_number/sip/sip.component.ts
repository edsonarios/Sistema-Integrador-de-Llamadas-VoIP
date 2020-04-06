import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SipService } from '@services/sip.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'sip',
	templateUrl: './sip.component.html'
})
export class SipComponent implements OnInit {
	@Input() Alias: string;
	@Input() Numero: string;
	@Input() Context: string;
	@Input() Id: number;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private serviceSip: SipService
	) {}

	ngOnInit() {}

	eliminarsip() {
		console.log(this.Id);
		Swal.fire({
			title: 'Esta seguro?',
			text: 'El SIP se eliminará!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, Eliminarlo!'
		}).then(result => {
			if (result.value) {
				Swal.fire('Eliminado!');
				this.serviceSip.deleteSip(this.Id).subscribe(
					response => {
						console.log(response);
					},
					er => console.log(er),
					() => console.log('terminado')
				);
			}
		});
	}
}
