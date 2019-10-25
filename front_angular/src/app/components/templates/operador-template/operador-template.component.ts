import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { Sala } from '../../../../models/sala';

@Component({
  selector: 'operador-template',
  templateUrl: './operador-template.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class OperadorTemplateComponent implements OnInit {
user: User;
public sala;


  ngOnInit() { 
  	console.log("Carga el dashboard");
  	this.sala=[{"nombreSala":"dato Prueba",'descripcion':'Descripcion','usuarioId':'1'},
  	{"nombreSala":"dato Prueba2",'descripcion':'Descripcion2','usuarioId':'2'},
  	{"nombreSala":"dato Prueba3",'descripcion':'Descripcion3','usuarioId':'3'},];

  	this.user={
  		'nombre': 'usuario',
        'apPaterno': 'userPat',
        'apMaterno': 'userMat',
        'tipo': 'Operador',
        'direccion': 'Prueba',
        'telefono': '12345',
        'correo': 'ope@operador',
        'password': '1234',
        'conectado': true,
        'salaId': '1'
  	};
  	//console.log(this.sala);
  	//console.log(this.user);
  }
  datosSala(id,nombre,descripcion){
  	 window.alert('Id : '+id+"\n Nombre : "+nombre+'\n Descripcion : '+descripcion+'\n \n \t Listo para recibir metodos!');
  }
   DialPad(){
  	 window.alert('pendiente');
  }
  settings(){
  	 window.alert('pendiente plox');
  }
	addSala(){
  	 window.alert('pendiente , nueva ventana + ruta');
  }

}
