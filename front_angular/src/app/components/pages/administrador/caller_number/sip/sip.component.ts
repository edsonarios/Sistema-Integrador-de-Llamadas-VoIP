import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SipService } from '@services/sip.service';

@Component({
	selector: 'sip',
	templateUrl: './sip.component.html'
})
export class SipComponent implements OnInit {
	@Input() Alias: string;
	@Input() Numero: string;
	@Input() Context: string;
	@Input() Id: string;

	public identy;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private serviceSip: SipService
	) {}

	ngOnInit() {}

	eliminarsip() {
		console.log(this.Id);
		this.identy = this.route.snapshot.paramMap.get('id');
		console.log(this.identy);

		this.serviceSip.deleteSip(this.Id).subscribe(
			rt => {
				console.log(rt);
			},
			er => console.log(er),
			() => console.log('terminado')
		);
	}
}
