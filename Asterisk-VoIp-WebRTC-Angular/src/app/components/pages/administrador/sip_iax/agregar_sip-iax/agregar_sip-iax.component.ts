import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';
@Component({
  selector: 'sip_iax-agregar',
  templateUrl: './agregar_sip-iax.component.html',
  providers: [UserService, SipService],
})
export class Agregar_Sip_IaxComponent implements OnInit {
  public IdUsuario;
  Sip_Iax_form: FormGroup;
  public hiddenForm = false;
  public correo;
  public Cuentas;
  public EnableWebRTC = 0;
  public Sip_Iax;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private serviceSipweb: SipService
  ) {
    this.IdUsuario = localStorage.getItem('idCuenta');
    if (this.IdUsuario == null) {
      this.IdUsuario = 'none';

      this.userservice.findAllUsuario().subscribe(
        (rt) => {
          this.Cuentas = rt;
        },
        (er) => console.log(er)
      );
    } else {
      this.correo = localStorage.getItem('Correo');
    }

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
      switch: 0,
    };
    this.buildForm();
  }

  private buildForm() {
    this.Sip_Iax_form = this.formBuilder.group({
      name: ['', Validators.required],
      callerid: ['', Validators.required],
      secret: ['', Validators.required],
      id: [''],
      type: ['friend', Validators.required],
      context: ['default', Validators.required],
      host: ['dynamic', Validators.required],
      disallow: ['disallow', Validators.required],
      allow: ['ulaw', Validators.required],
      qualify: ['yes', Validators.required],
      nat: ['force_rport,comedia', Validators.required],
      //SipWEBRTC
      qualifyfreq: ['70', Validators.required],
      deny: ['0.0.0.0/0.0.0.0', Validators.required],
      dtnfnode: ['rfc2834', Validators.required],
      canreinvite: ['no', Validators.required],
      trustrpid: ['yes', Validators.required],
      sendrpid: ['no', Validators.required],
      transport: ['udp,ws,wss', Validators.required],
      avpf: ['yes', Validators.required],
      force_avp: ['yes', Validators.required],
      icesupport: ['yes', Validators.required],
      encryption: ['yes', Validators.required],
      callgroup: ['-', Validators.required],
      pickupgroup: ['-', Validators.required],
      dial: ['SIP/7015', Validators.required],
      permit: ['0.0.0.0/0.0.0.0', Validators.required],
      callcounter: ['yes', Validators.required],
      faxdetect: ['no', Validators.required],
      directmedia: ['no', Validators.required],
      dtlsenable: ['yes', Validators.required],
      dtlsverify: ['fingerprint', Validators.required],
      dtlscertfile: ['/etc/asterisk/keys/asterisk.pem', Validators.required],
      dtlscafile: ['/etc/asterisk/keys/ca.crt', Validators.required],
      dtlssetup: ['actpass', Validators.required],
      rtcp_mux: ['yes', Validators.required],
    });
  }

  ngOnInit() {}
  SelectSip() {
    this.hiddenForm = true;
  }
  cambio() {
    if (this.EnableWebRTC == 0) {
      this.EnableWebRTC = 1;
    } else {
      this.EnableWebRTC = 0;
    }
  }
  SelectID(id) {
    //console.log('El id seleccionado es:'+id);
    console.log('Cambio');
  }
  addSip() {
    Swal.fire({
      title: 'Confirmacion',
      html:
        'Esta seguro de crear el siguiente numero? ' +
        '<br><b>' +
        this.Sip_Iax_form.value.name +
        '</b> ',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si estoy seguro',
    }).then((result) => {
      if (result.value) {
        if (this.IdUsuario == 'none') {
          this.Sip_Iax.usuarioId = this.Sip_Iax_form.value.id;
        } else {
          this.Sip_Iax.usuarioId = localStorage.getItem('idCuenta');
        }
        this.Sip_Iax.name = this.Sip_Iax_form.value.name;
        this.Sip_Iax.callerid = this.Sip_Iax_form.value.callerid;
        this.Sip_Iax.secret = this.Sip_Iax_form.value.secret;
        this.Sip_Iax.type = this.Sip_Iax_form.value.type;
        this.Sip_Iax.context = this.Sip_Iax_form.value.context;
        this.Sip_Iax.host = this.Sip_Iax_form.value.host;
        this.Sip_Iax.disallow = this.Sip_Iax_form.value.disallow;
        this.Sip_Iax.allow = this.Sip_Iax_form.value.allow;
        this.Sip_Iax.qualify = this.Sip_Iax_form.value.qualify;
        this.Sip_Iax.nat = this.Sip_Iax_form.value.nat;

        if (this.EnableWebRTC != 0) {
          this.Sip_Iax.qualifyfreq = this.Sip_Iax_form.value.qualifyfreq;
          this.Sip_Iax.deny = this.Sip_Iax_form.value.deny;
          this.Sip_Iax.dtnfnode = this.Sip_Iax_form.value.dtnfnode;
          this.Sip_Iax.canreinvite = this.Sip_Iax_form.value.canreinvite;
          this.Sip_Iax.trustrpid = this.Sip_Iax_form.value.trustrpid;
          this.Sip_Iax.sendrpid = this.Sip_Iax_form.value.sendrpid;
          this.Sip_Iax.transport = this.Sip_Iax_form.value.transport;
          this.Sip_Iax.avpf = this.Sip_Iax_form.value.avpf;
          this.Sip_Iax.force_avp = this.Sip_Iax_form.value.force_avp;
          this.Sip_Iax.icesupport = this.Sip_Iax_form.value.icesupport;
          this.Sip_Iax.encryption = this.Sip_Iax_form.value.encryption;
          this.Sip_Iax.callgroup = this.Sip_Iax_form.value.callgroup;
          this.Sip_Iax.pickupgroup = this.Sip_Iax_form.value.pickupgroup;
          this.Sip_Iax.dial = this.Sip_Iax_form.value.dial;
          this.Sip_Iax.permit = this.Sip_Iax_form.value.permit;
          this.Sip_Iax.callcounter = this.Sip_Iax_form.value.callcounter;
          this.Sip_Iax.faxdetect = this.Sip_Iax_form.value.faxdetect;
          this.Sip_Iax.directmedia = this.Sip_Iax_form.value.directmedia;
          this.Sip_Iax.dtlsenable = this.Sip_Iax_form.value.dtlsenable;
          this.Sip_Iax.dtlsverify = this.Sip_Iax_form.value.dtlsverify;
          this.Sip_Iax.dtlscertfile = this.Sip_Iax_form.value.dtlscertfile;
          this.Sip_Iax.dtlscafile = this.Sip_Iax_form.value.dtlscafile;
          this.Sip_Iax.dtlssetup = this.Sip_Iax_form.value.dtlssetup;
          this.Sip_Iax.rtcp_mux = this.Sip_Iax_form.value.rtcp_mux;
        }

        this.serviceSipweb.addSipWebRTC(this.Sip_Iax).subscribe(
          (response) => {
            console.log(response);
          },
          (er) => console.log(er),
          () => console.log()
        );

        Swal.fire({
          icon: 'success',
          title: 'Numero Sip Agregado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.buildForm();
      }
    });
  }
}
