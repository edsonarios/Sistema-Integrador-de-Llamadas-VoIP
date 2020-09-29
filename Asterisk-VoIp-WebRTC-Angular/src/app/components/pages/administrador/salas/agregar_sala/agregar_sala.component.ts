import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SipService } from '@services/sip.service';
import { SalaService } from '@services/sala.service';

import Swal from 'sweetalert2';
@Component({
    selector: 'agregarSala',
    templateUrl: './agregar_sala.component.html',
    providers: [SalaService, SipService]
})
export class AgregarSalaComponent implements OnInit {
    addForm: FormGroup;
    tipeForm: FormGroup;
    addRadioForm: FormGroup;
    SelectedOption = 'nothing';

    public sala;
    public Sip_Iax;

    constructor(private router: Router, private formBuilder: FormBuilder, private serviceSala: SalaService, private serviceSipweb: SipService) {
        this.sala = {
            nombreSala: '',
            descripcion: '',
            switch: 0
        };
        this.Sip_Iax = {
            usuarioId: '',
            name: '',
            secret: '',
            callerid: '',
            type: '',
            context: '',
            host: '',
            disallow: '',
            allow: '',
            qualify: '',
            nat: '',
            qualifyfreq: '',
            deny: '',
            dtnfnode: '',
            canreinvite: '',
            trustrpid: '',
            sendrpid: '',
            transport: '',
            avpf: '',
            force_avp: '',
            icesupport: '',
            encryption: '',
            callgroup: '',
            pickupgroup: '',
            dial: '',
            permit: '',
            callcounter: '',
            faxdetect: '',
            directmedia: '',
            dtlsenable: '',
            dtlsverify: '',
            dtlscertfile: '',
            dtlscafile: '',
            dtlssetup: '',
            rtcp_mux: '',
            switch: 1
        };
    }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            nombreSala: ['', Validators.required],
            descripcion: ['', Validators.required],
            switch: 1
        });
        this.tipeForm = this.formBuilder.group({
            Tipo: 'Select'
        });
        this.addRadioForm = this.formBuilder.group({
            NombreRadio: ['', Validators.required],
            DescripcionRadio: ['', Validators.required],
            NumeroSip: ['', Validators.required],
            CallerId: ['', Validators.required],
            Secret: ['', Validators.required]
        });
    }

    addSala() {
        Swal.fire({
            title: 'Esta seguro de Agregar la Sala?',
            text: this.addForm.value.nombreSala,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si estoy seguro'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: this.addForm.value.nombreSala + ' Agregada',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.serviceSala.addSala(this.addForm.value).subscribe(
                    (response) => {
                        console.log(response);
                    },
                    (er) => console.log(er),
                    () => console.log('terminado')
                );
            }
        });
    }
    OptionSelected() {
        // console.log(this.tipeForm.value);
        this.SelectedOption = this.tipeForm.value.Tipo;
    }
    private buildForm() {
        this.addRadioForm = this.formBuilder.group({
            NombreRadio: ['', Validators.required],
            DescripcionRadio: ['', Validators.required],
            NumeroSip: ['', Validators.required],
            CallerId: ['', Validators.required],
            Secret: ['', Validators.required]
        });
    }
    addradio() {
        Swal.fire({
            title: 'Esta seguro de Agregar la Radio?',
            text: this.addRadioForm.value.NombreRadio,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si estoy seguro'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: this.addRadioForm.value.NombreRadio + ' Agregada',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.crearRadio(this.addRadioForm.value.NombreRadio, this.addRadioForm.value.DescripcionRadio);
                this.CrearSipRadio(
                    this.addRadioForm.value.NumeroSip,
                    this.addRadioForm.value.CallerId,
                    this.addRadioForm.value.Secret,
                    this.addRadioForm.value.NombreRadio
                );
                this.buildForm();
            }
        });
    }
    crearRadio(nombre, desc) {
        //console.log('Crea la Radio :');

        this.sala.nombreSala = nombre;
        this.sala.descripcion = desc;

        this.serviceSala.addSala(this.sala).subscribe(
            (response) => {
                //SuccessFull
                console.log(response);
            },
            (er) => console.log(er),
            () => console.log('terminado')
        );

        //console.log(this.sala);
    }
    CrearSipRadio(nombre, C_id, Secrt, contexto) {
        //console.log('Crea el Sip para la Radio :');
        console.log('Entra a crear el SIP');
        this.Sip_Iax.usuarioId = '500';
        this.Sip_Iax.name = nombre;
        this.Sip_Iax.callerid = C_id;
        this.Sip_Iax.secret = Secrt;
        this.Sip_Iax.type = 'friend';
        this.Sip_Iax.context = contexto;
        this.Sip_Iax.host = 'dynamic';
        this.Sip_Iax.disallow = 'disallow';
        this.Sip_Iax.allow = 'ulaw';
        this.Sip_Iax.qualify = 'yes';
        this.Sip_Iax.nat = 'force_rport,comedia';

        this.serviceSipweb.AddSipRadio(this.Sip_Iax).subscribe(
            (response) => {
                console.log(response);
            },
            (er) => console.log(er),
            () => console.log()
        );
    }
}
