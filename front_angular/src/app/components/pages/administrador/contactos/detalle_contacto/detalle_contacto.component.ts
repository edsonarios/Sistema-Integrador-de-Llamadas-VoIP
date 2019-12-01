import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'DetalleContacto',
	templateUrl: './detalle_contacto.component.html'
})
export class DetalleContactoComponent implements OnInit {
	public Contacto;

	constructor(private router: Router) {
		this.Contacto={
				
					'Id':'1',
					'Nombre':'Nelson Richard',
					'ApPaterno':'Cori',
					'ApMaterno':'Sirpa',
					'correo':'Richard@usuario.com',
					'Direccion':'Zona X, Calle Y #2235',
					'Nro_Telefono':'78839131',
					'Tipo':'Standar',
					'Sip':[
						{
						'Numero':'3001',
						'Alias':'3001',
						'context':'default'
						},
						{
						'Numero':'3002',
						'Alias':'3002',
						'context':'default'
						},
						{
						'Numero':'3004',
						'Alias':'3004',
						'context':'default'
						},
						{
						'Numero':'3005',
						'Alias':'3005',
						'context':'default'
						}],
					'Iax':[
						{
						'Numero':'3003',
						'Alias':'3003',
						'context':'default'
						},
						{
						'Numero':'3006',
						'Alias':'3006',
						'context':'default'
						}]
		};
	}

	ngOnInit() {
		console.log(this.Contacto);
	}
	
}
