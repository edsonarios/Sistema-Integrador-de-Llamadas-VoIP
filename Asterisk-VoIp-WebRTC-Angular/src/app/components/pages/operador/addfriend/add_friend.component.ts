import { Component, OnInit, Output, EventEmitter, ɵɵelementContainerEnd } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { AgendaService } from '@services/agenda.service';
import { SipService } from '@services/sip.service';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'Addfriend',
    templateUrl: './add_friend.component.html',
    styleUrls: ['./add_friend.component.scss'],
    providers: [UserService, AgendaService, SipService]
})
export class AddFriendComponent implements OnInit {
    public Friend = [];
    // variables para la busqueda
    filtroValue = '';
    search = new FormControl('');

    public Contacts = [];
    public Amigos = [];
    public Contactos;
    public llamada;
    public us = localStorage.getItem('Usuario');
    public usActual = JSON.parse(this.us);
    public nroActual = localStorage.getItem('NumberSelected');

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
        this.listarAmigos();

        this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
            this.filtroValue = value;
        });
    }

    listarOperadores(listadeamigos) {
        this.agendaservice.listarOperadores().subscribe(
            (response) => {
                response.forEach((element) => {
                    const quedice = this.contiene(listadeamigos, element.numeroSip);
                    if (!quedice && element.numeroSip !== this.nroActual) {
                        this.Contacts.push(element);
                    } else {
                        // console.log(' no se añadio  ' + element.numeroSip);
                    }
                });
            },
            (er) => console.log(er)
        );
    }

    contiene(vec, it): boolean {
        let aux = false;
        vec.forEach((element) => {
            if (element.numero === it) {
                aux = true;
            }
        });
        return aux;
    }

    buscar() {
        console.log('searching...');
    }

    addAmigo(numero) {
        this.Contacts = this.Contacts.filter((user) => user.numeroSip !== numero);
        this.agendaservice.addAmigo(this.usActual.usuarioId, numero,null).subscribe(
            (response) => {
                console.log(response);
            },
            (er) => console.log(er)
        );
    }

    listarAmigos() {
        this.agendaservice.listarAmigos(this.usActual.usuarioId).subscribe(
            (response) => {
                for (let i = 0; i < response[0].length; i++) {
                    this.Amigos.push({ id: response[0][i], nombre: response[1][i], numero: response[2][i] });
                }
                this.listarOperadores(this.Amigos);
            },
            (er) => console.log(er)
        );
    }
}
