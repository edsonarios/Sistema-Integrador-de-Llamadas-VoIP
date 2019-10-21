import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//import { Sala } from '../../../models/sala';
import { User } from '../../../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../sass/main.scss'],
  providers: [UserService],
})

export class LoginComponent implements OnInit {
  
  public formulario: FormGroup;
  public identity: Object;
  
  public status: string;
   public user: User;
  public 	 username;
	public  password;
  constructor(
    private router:Router,
    public userService: UserService,  
   // public salamodel: Sala,
    
    ){ }

  ngOnInit() {
    console.log('Componente formulario cargado');
    
    this.mostrar()
  }

 

enviar(e) {
  //if (this.formulario.value.input1 === null || this.formulario.value.input2 === null ) {
    //  console.log('estan vacios');
   // }
  //else{
    //this.username = this.formulario.value.input1.toLowerCase();
    //this.password = this.formulario.value.input2.toLowerCase();
    this.username = 'root@root';
    this.password = '1234';
    this.user = new User('','','','','','','root@root','1234',false,'');
    this.userService.login(this.user).subscribe(
			result =>{	
				this.identity = result;	
          console.log(this.identity);
          console.log(result.result.id);
          if(result.result.tipo == 'root'){
            this.router.navigate(['/Operador/Contactos']);
          }

          //this.router.navigate(['/Operador/Contactos']);
			},
			error =>{	
			this.status='denied'
			console.log('error...' + error);
			}
		)
 // }  

}



  
/*

Login(e){
  e.preventDefault(); 



  console.log('usuario'+ this.username+ '   contraseña '+ this.password);
	//Convierte todo a minusculas
	this.username = this.username.toLowerCase();
	this.password = this.password.toLowerCase();
  
	this.user = new User('','','','','','','root@root','1234',false,'');

	
	//obtenemos todo el valor de el usuario
	this.userService.login(this.user).subscribe(
			response =>{	
				this.identity = response;	
          console.log('entramos...' + this.identity);
          
          //this.router.navigate(['/Operador/Contactos']);
			},
			error =>{	
			this.status='denied'
			console.log('error...' + error);
			}
		)
}




  Autentificador(e){
  	console.log("Carga");
  	
  	this.router.navigate(['/Operador/Contactos']);
  }


  login(){
      this.userService.login(this.salamodel).subscribe(res => {
        console.log('Sala added!')
        
      }); 
  }

*/
 // Issues list
 mostrar() {
  return this.userService.datosPrueba().subscribe(res => {
    console.log(res)
  })
}
  /*
  mostrar(){
    this.userService.datosPrueba().subscribe(res =>{ console.log('retorno el mensaje')})
  }
  */
}
