import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '@services/agenda.service';

@Component({
    selector: 'Agenda',
    templateUrl: './agenda.component.html',
    providers: [AgendaService],
    styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
    public Contactos;
    public Amigos = [];
    public llamada;
    public us = localStorage.getItem('Usuario');
    public usActual = JSON.parse(this.us);

    //@Output() AgendaLlamada = new EventEmitter<string>();
    constructor(private router: Router, private agendaservice: AgendaService) {
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
        // console.log(this.usActual);
        this.listarAmigos();
    }
    LlamadaComponent(id, Nombre, numero) {
        this.llamada = { Nombre: Nombre, Numero: numero, Id: id };
        //this.AgendaLlamada.emit(this.llamada);
    }

    vacio() {
        var cantidad = this.Amigos[0];
        if (cantidad == undefined) {
            return true;
        }
        return false;
    }

    buscar() {}

    listarAmigos() {
        this.agendaservice.listarAmigos(this.usActual.usuarioId).subscribe(
            (response) => {
                var count = 0;
                for (var i = 0; i < response[0].length; i++) {
                    this.Amigos.push({ id: response[0][i], nombre: response[1][i], numero: response[2][i] });
                    // this.deletearAmigo(this.Amigos[0][i]);
                }
            },
            (er) => console.log(er)
        );
    }

    // deletearAmigo(idamigo) {
    //     this.agendaservice.deleteAmigo(idamigo).subscribe(
    //         (response) => {
    //             console.log(response);
    //         },
    //         (er) => console.log(er)
    //     );
    // }

    deletearAmigo(idamigo) {
        this.agendaservice.deleteAmigo(idamigo);
    }

    borrarTodo() {
        for (var i = 0; i < this.Amigos[0].length; i++) {
            this.deletearAmigo(this.Amigos[0][i]);
        }
    }
}
