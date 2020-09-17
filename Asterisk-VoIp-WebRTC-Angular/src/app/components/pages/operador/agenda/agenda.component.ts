import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '@services/agenda.service';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { AsteriskConnectionService } from '../../../../../services/asterisk-connection.service';
import { UsuarioEstado } from '../../../../../models/estadoAsterisk';
@Component({
    selector: 'Agenda',
    templateUrl: './agenda.component.html',
    providers: [AgendaService],
    styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
    // public Contactos;
    public Amigos = [];
    public llamada;
    public session: WebRTCService;
    public us = localStorage.getItem('Usuario');
    public usActual = JSON.parse(this.us);
    public estado = faCircle;
    public color = 'text-danger';
    public arrayNumeros: string[] = [];
    public arrayEstados: string[];

    @Output() AgendaLlamada = new EventEmitter<string>();
    constructor(private router: Router, private agendaservice: AgendaService, public estadoService: AsteriskConnectionService) {}

    ngOnInit() {
        this.session = new WebRTCService();
        this.session.sessionEvents();
        this.listarAmigos();
        this.arrayEstados = ['desconectado', 'desconectado', 'desconectado', 'desconectado', 'desconectado'];
        this.estadoSocket();
    }
    LlamadaComponent(numero) {
        this.session.sipCall(numero);
    }

    vacio() {
        const cantidad = this.Amigos[0];
        if (cantidad === undefined) {
            return true;
        }
        return false;
    }

    listarAmigos() {
        this.agendaservice.listarAmigos(this.usActual.usuarioId).subscribe(
            (response) => {
                // console.log(response);
                for (let i = 0; i < response[0].length; i++) {
                    this.Amigos.push({ id: response[0][i], nombre: response[1][i], numero: response[2][i] });
                }
                this.prepararArray();
            },
            (er) => console.log(er)
        );
    }

    deletearAmigo(idamigo, numero) {
        this.agendaservice.deleteAmigo(idamigo);
        this.Amigos = this.Amigos.filter((user) => user.numero !== numero);
        console.log('el usuario con id y numero  ' + idamigo + '  ' + numero + '  fue eliminado');
    }
    estadoSocket() {
        this.estadoService.getResponse('usuarioEstado').subscribe((msg: UsuarioEstado) => {
            console.log('mensaje del socket', msg);
            this.verificaNumero(msg);
        });
    }

    verificaNumero(msg: UsuarioEstado) {
        const numero = msg.numero.split('/');
        const res = this.arrayNumeros.indexOf(numero[1]);
        if (res >= 0) {
            this.arrayEstados[res] = msg.estado;
        }
    }
    prepararArray() {
        this.arrayNumeros = [];
        for (const user of this.Amigos) {
            this.arrayNumeros.push(user.numero);
        }
    }
}
