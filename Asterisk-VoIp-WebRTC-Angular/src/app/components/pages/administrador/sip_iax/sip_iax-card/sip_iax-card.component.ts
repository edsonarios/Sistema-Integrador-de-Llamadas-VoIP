import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from '@services/sip.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'sip_iax-card',
	templateUrl: './sip_iax-card.component.html'
})
export class SIP_IaxCardComponent implements OnInit {
	@Input() Allow:string;
	@Input() Avpf:string;
	@Input() CallCounter:string;
	@Input() CallerId:string;
	@Input() CallGroup:string;
	@Input() CanReInvite:string;
	@Input() Context:string;
	@Input() Deny:string;
	@Input() Dial:string;
	@Input() DirectMedia:string;
	@Input() DisAllow:string;
	@Input() Dtlscafile:string;
	@Input() Dtlscertfile:string;
	@Input() Dtlsenable:string;
	@Input() Dtlssetup:string;
	@Input() Dtlverify:string;
	@Input() Dtnfnode:string;
	@Input() Encryption:string;
	@Input() Faxdetect:string;
	@Input() Force_avp:string;
	@Input() Host:string;
	@Input() Icesupport:string;
	@Input() Id:string;
	@Input() Name:string;
	@Input() Nat:string;
	@Input() Permit:string;
	@Input() PickupGroup:string;
	@Input() Qualify:string;
	@Input() QualifyFreq:string;
	@Input() Rtcp_Mux:string;
	@Input() Secret:string;
	@Input() SendRpid:string;
	@Input() SwitchSip:string;
	@Input() Transport:string;
	@Input() Trustrpid:string;
	@Input() Type:string;
	@Input() UsuarioID:string;
	@Input() Sip_or_Iax:string;
public SIP_IAX;

	constructor(private router: Router,
		private serviceSip: SipService) {
		localStorage.removeItem('SIP_IAX');
	}

	ngOnInit() {
		this.SIP_IAX={
			'allow': this.Allow,
			'avpf': this.Avpf,
			'callcounter': this.CallCounter,
			'callerid': this.CallerId,
			'callgroup': this.CallGroup,
			'canreinvite': this.CanReInvite,
			'context': this.Context,
			'deny': this.Deny,
			'dial': this.Dial,
			'directmedia': this.DirectMedia,
			'disallow': this.DisAllow,
			'dtlscafile': this.Dtlscafile,
			'dtlscertfile': this.Dtlscertfile,
			'dtlsenable': this.Dtlsenable,
			'dtlssetup': this.Dtlssetup,
			'dtlsverify': this.Dtlverify,
			'dtnfnode': this.Dtnfnode,
			'encryption': this.Encryption,
			'faxdetect': this.Faxdetect,
			'force_avp': this.Force_avp,
			'host': this.Host,
			'icesupport': this.Icesupport,
			'id': this.Id,
			'name': this.Name,
			'nat': this.Nat,
			'permit': this.Permit,
			'pickupgroup': this.PickupGroup,
			'qualify': this.Qualify,
			'qualifyfreq': this.QualifyFreq,
			'rtcp_mux': this.Rtcp_Mux,
			'secret': this.Secret,
			'sendrpid': this.SendRpid,
			'switchsip': this.SwitchSip,
			'transport': this.Transport,
			'trustrpid': this.Trustrpid,
			'type': this.Type,
			'usuarioId': this.UsuarioID
		};
	}
	Detalles(){
		localStorage.setItem('SIP_IAX',JSON.stringify(this.SIP_IAX));
		this.router.navigate(['/Administrador/DetalleSIP_IAX']);
	}
	Eliminar(){
		if (this.Sip_or_Iax=="SIP") {
			Swal.fire({
			title: 'Confirmacion',
			text: 'Esta seguro de eliminar el Numero '+this.SIP_IAX.name+'?',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Si estoy seguro'
		}).then(result => {
			if (result.value) {
				 Swal.fire({
				 		icon: 'success',
					  title: 'Numero Eliminado',
					  showConfirmButton: false,
					  timer: 1500,
					 }
				    )

				this.DeleteNumber();
				// this.router.navigate(['/Administrador/Cuentas']);
			}
		});
		}
		else{
			window.alert('Es un Iax');
		}
		
		
	}
	DeleteNumber(){
		this.serviceSip.EliminarSip_Iax(this.SIP_IAX.id)
	}
}
