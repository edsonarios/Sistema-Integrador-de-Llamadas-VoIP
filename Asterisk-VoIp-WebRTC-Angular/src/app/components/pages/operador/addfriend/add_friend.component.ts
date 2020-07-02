import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { AgendaService } from '@services/agenda.service';
import { SipService } from '@services/sip.service';

@Component({
    selector: 'Addfriend',
    templateUrl: './add_friend.component.html',
    styleUrls: ['./add_friend.component.scss'],
    providers: [UserService, AgendaService, SipService]
})
export class AddFriendComponent implements OnInit {
    public Friend = [];

    public Contacts;
    public Amigos;
    public Contactos;
    public llamada;
    public us = localStorage.getItem('Usuario');
    public usActual = JSON.parse(this.us);

    constructor(private router: Router, private userservice: UserService, private agendaservice: AgendaService, private sipservice: SipService) {
        this.Contactos = [
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001', id: '21' },
            { Nombre: 'Juan', Estado: 'Desconectado', Numero: '3002', id: '22' },
            { Nombre: 'Marco', Estado: 'Conectado', Numero: '3003', id: '23' },
            { Nombre: 'Mario', Estado: 'Desconectado', Numero: '3004', id: '24' },
            { Nombre: 'Alonso', Estado: 'Conectado', Numero: '3005', id: '25' },
            { Nombre: 'Edgar', Estado: 'Desconectado', Numero: '3006', id: '26' },
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3007', id: '27' },
            { Nombre: 'Ramiro', Estado: 'Desconectado', Numero: '3008', id: '28' },
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3009', id: '29' },
            { Nombre: 'Manuel', Estado: 'Desconectado', Numero: '3010', id: '30' }
        ];
    }

    ngOnInit() {
        this.dataDeploy();
    }

    dataDeploy() {
        //llamar al servicio para listar todos los usuarios
        this.userservice.findAllUsuario().subscribe(
            (response) => {
                this.Contacts = response;

                response.forEach((element) => {
                    this.sipservice.llenarSIPsYIAX(element.id).subscribe(
                        (response) => {
                            this.Friend.push({ idus: element.id, numero: response[0][0].secret + '', nombre: element.nombre });
                        },
                        (er) => console.log(er)
                    );
                });
            },
            (er) => console.log(er)
        );
    }

    buscar() {
        console.log('searching...');
    }

    addAmigo(name, number) {
        this.sipservice.llenarSIPsYIAX(this.usActual.usuarioId).subscribe(
            (response) => {
                this.agendaservice.addAmigo(this.usActual.usuarioId, number).subscribe(
                    (response) => {
                        this.Amigos = response;
                        // console.log(this.Amigos);
                    },
                    (er) => console.log(er)
                );
            },
            (er) => console.log(er)
        );
    }
}
