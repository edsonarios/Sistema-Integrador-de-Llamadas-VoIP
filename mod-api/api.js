"use strict";

const debug = require("debug")("mod:api:routes");
const express = require("express");
const asyncify = require("express-asyncify");
const auth = require("express-jwt");
//const guard = require('express-jwt-permissions')()
const db = require("mod-db");
const request = require("request-promise-native");
var bodyParser = require("body-parser");

const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: "./uploads/product" });

const fs = require("fs");
const mime = require("mime");
const path = require("path");
const bcrypt = require("bcrypt");

//Notificaion
const FCM = require("fcm-node");

const config = require("./config");

const api = asyncify(express.Router());

const moment = require("moment");

var shell = require("shelljs");
const zip = require("express-zip");
const { get } = require("http");

const geojson = require("geojson");

//parseado a json todos los bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

let services,
  Cdr,
  Extension,
  Iax,
  Queue,
  Sala,
  Sip,
  Usuario,
  Voicemail,
  Agenda,
  Privilegios;

api.use("*", async (req, res, next) => {
  if (!services) {
    debug("Connecting to database");
    try {
      services = await db(config.db);
    } catch (e) {
      return next(e);
    }

    Agenda = services.Agenda;
    Cdr = services.Cdr;
    Extension = services.Extension;
    Iax = services.Iax;
    Queue = services.Queue;
    Sala = services.Sala;
    Sip = services.Sip;
    Usuario = services.Usuario;
    Voicemail = services.Voicemail;
    Privilegios = services.Privilegios;
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-Key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

api.get("/datosPrueba", async (req, res) => {
  var HoraYFecha = new Date();
  console.log(HoraYFecha);
  const obj = await Sala.create({
    nombreSala: "default",
    descripcion: "sala por default",
    switch: "1",
  });
  //Crea una cola de llamada para default, eso solo como ejemplo
  const objj = await Queue.create(obj.id, {
    name: "support",
    musicclass: "default",
    strategy: "ringall",
    timeout: 20,
  });
  //Usuario1
  const obj2 = await Usuario.create(obj.id, {
    nombre: "nombre",
    apPaterno: "paterno",
    apMaterno: "materno",
    tipo: "standard",
    direccion: "direccion1234",
    telefono: "123456",
    correo: "usuario@usuario",
    password: bcrypt.hashSync("1234", 10),
    conectado: false,
  });
  const obj21 = await Sip.create(obj2.id, {
    name: "2001",
    secret: "2001",
    callerid: "2001",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",
  });
  //WEBRTC para usuario 1
  const obj22 = await Sip.create(obj2.id, {
    name: "3010",
    secret: "3010",
    callerid: "3010 <3010>",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",

    qualifyfreq: "60",
    deny: "0.0.0.0/0.0.0.0",
    dtnfnode: "rfc2833",
    canreinvite: "no",
    trustrpid: "yes",
    sendrpid: "no",
    transport: "udp,ws,wss",
    avpf: "yes",
    force_avp: "yes",
    icesupport: "yes",
    encryption: "yes",
    callgroup: "",
    pickupgroup: "",
    dial: "SIP/7010",
    permit: "0.0.0.0/0.0.0.0",
    callcounter: "yes",
    faxdetect: "no",
    directmedia: "no",
    dtlsenable: "yes",
    dtlsverify: "fingerprint",
    dtlscertfile: "/etc/asterisk/keys/asterisk.pem",
    dtlscafile: "/etc/asterisk/keys/ca.crt",
    dtlssetup: "actpass",
    rtcp_mux: "yes",
  });
  //VOICEMAIL PARA 2001
  const obj23 = await Voicemail.create(obj2.id, {
    uniqueid: "1",
    customer_id: "1",
    context: "default",
    mailbox: "2001",
    password: "1234",
    fullname: "Nombre y apellido",
    email: "edson.anawaya@patelecomsrl.com",
    pager: "",
    tz: "central",
    attach: "yes",
    saycid: "no",
    dialout: "",
    callback: "",
    review: "no",
    operator: "no",
    envelope: "no",
    sayduration: "no",
    saydurationm: 1,
    sendvoicemail: "no",
    delete: "no",
    nextaftercmd: "yes",
    forcename: "no",
    forcegreetings: "no",
    hidefromdir: "no",
    stamp: HoraYFecha,
  });
  //Usuario2
  const obj3 = await Usuario.create(obj.id, {
    nombre: "2nombre",
    apPaterno: "2paterno",
    apMaterno: "2materno",
    tipo: "standard",
    direccion: "2direccion1234",
    telefono: "22123456",
    correo: "usuario2@usuario2",
    password: bcrypt.hashSync("1234", 10),
    conectado: false,
  });
  const obj31 = await Sip.create(obj3.id, {
    name: "2002",
    secret: "2002",
    callerid: "2002",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",
  });
  //WEBRTC para usuario 1
  const obj33 = await Sip.create(obj2.id, {
    name: "3011",
    secret: "3011",
    callerid: "3011 <3011>",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",

    qualifyfreq: "60",
    deny: "0.0.0.0/0.0.0.0",
    dtnfnode: "rfc2833",
    canreinvite: "no",
    trustrpid: "yes",
    sendrpid: "no",
    transport: "udp,ws,wss",
    avpf: "yes",
    force_avp: "yes",
    icesupport: "yes",
    encryption: "yes",
    callgroup: "",
    pickupgroup: "",
    dial: "SIP/7011",
    permit: "0.0.0.0/0.0.0.0",
    callcounter: "yes",
    faxdetect: "no",
    directmedia: "no",
    dtlsenable: "yes",
    dtlsverify: "fingerprint",
    dtlscertfile: "/etc/asterisk/keys/asterisk.pem",
    dtlscafile: "/etc/asterisk/keys/ca.crt",
    dtlssetup: "actpass",
    rtcp_mux: "yes",
  });
  //VOICEMAIL PARA 2002
  const obj32 = await Voicemail.create(obj2.id, {
    uniqueid: "1",
    customer_id: "1",
    context: "default",
    mailbox: "2002",
    password: "1234",
    fullname: "Nombre y apellido",
    email: "otro@patelecomsrl.com",
    pager: "",
    tz: "central",
    attach: "yes",
    saycid: "no",
    dialout: "",
    callback: "",
    review: "no",
    operator: "no",
    envelope: "no",
    sayduration: "no",
    saydurationm: 1,
    sendvoicemail: "no",
    delete: "no",
    nextaftercmd: "yes",
    forcename: "no",
    forcegreetings: "no",
    hidefromdir: "no",
    stamp: HoraYFecha,
  });

  //Usuario Jorge
  const obj221 = await Usuario.create(obj.id, {
    nombre: "Jorge",
    apPaterno: "Castro",
    apMaterno: "materno",
    tipo: "standard",
    direccion: "direccion1234",
    telefono: "123456",
    correo: "jorge@usuario",
    password: bcrypt.hashSync("1234", 10),
    conectado: false,
  });

  //WEBRTC para usuario 1
  const obj222 = await Sip.create(obj221.id, {
    name: "3015",
    secret: "3015",
    callerid: "3015 <3015>",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",

    qualifyfreq: "60",
    deny: "0.0.0.0/0.0.0.0",
    dtnfnode: "rfc2833",
    canreinvite: "no",
    trustrpid: "yes",
    sendrpid: "no",
    transport: "udp,ws,wss",
    avpf: "yes",
    force_avp: "yes",
    icesupport: "yes",
    encryption: "yes",
    callgroup: "",
    pickupgroup: "",
    dial: "SIP/3015",
    permit: "0.0.0.0/0.0.0.0",
    callcounter: "yes",
    faxdetect: "no",
    directmedia: "no",
    dtlsenable: "yes",
    dtlsverify: "fingerprint",
    dtlscertfile: "/etc/asterisk/keys/asterisk.pem",
    dtlscafile: "/etc/asterisk/keys/ca.crt",
    dtlssetup: "actpass",
    rtcp_mux: "yes",
  });

  //Usuario Richard
  const obj223 = await Usuario.create(obj.id, {
    nombre: "Richard",
    apPaterno: "Cori",
    apMaterno: "materno",
    tipo: "standard",
    direccion: "direccion1234",
    telefono: "123456",
    correo: "richard@usuario",
    password: bcrypt.hashSync("1234", 10),
    conectado: false,
  });

  //WEBRTC para usuario 1
  const obj224 = await Sip.create(obj223.id, {
    name: "3016",
    secret: "3016",
    callerid: "3016 <3016>",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",

    qualifyfreq: "60",
    deny: "0.0.0.0/0.0.0.0",
    dtnfnode: "rfc2833",
    canreinvite: "no",
    trustrpid: "yes",
    sendrpid: "no",
    transport: "udp,ws,wss",
    avpf: "yes",
    force_avp: "yes",
    icesupport: "yes",
    encryption: "yes",
    callgroup: "",
    pickupgroup: "",
    dial: "SIP/3016",
    permit: "0.0.0.0/0.0.0.0",
    callcounter: "yes",
    faxdetect: "no",
    directmedia: "no",
    dtlsenable: "yes",
    dtlsverify: "fingerprint",
    dtlscertfile: "/etc/asterisk/keys/asterisk.pem",
    dtlscafile: "/etc/asterisk/keys/ca.crt",
    dtlssetup: "actpass",
    rtcp_mux: "yes",
  });

  //Usuario Henry
  const obj225 = await Usuario.create(obj.id, {
    nombre: "Henry",
    apPaterno: "Miranda",
    apMaterno: "materno",
    tipo: "standard",
    direccion: "direccion1234",
    telefono: "123456",
    correo: "jorge@usuario",
    password: bcrypt.hashSync("1234", 10),
    conectado: false,
  });

  //WEBRTC para usuario 1
  const obj226 = await Sip.create(obj225.id, {
    name: "3017",
    secret: "3017",
    callerid: "3017 <3017>",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",

    qualifyfreq: "60",
    deny: "0.0.0.0/0.0.0.0",
    dtnfnode: "rfc2833",
    canreinvite: "no",
    trustrpid: "yes",
    sendrpid: "no",
    transport: "udp,ws,wss",
    avpf: "yes",
    force_avp: "yes",
    icesupport: "yes",
    encryption: "yes",
    callgroup: "",
    pickupgroup: "",
    dial: "SIP/3017",
    permit: "0.0.0.0/0.0.0.0",
    callcounter: "yes",
    faxdetect: "no",
    directmedia: "no",
    dtlsenable: "yes",
    dtlsverify: "fingerprint",
    dtlscertfile: "/etc/asterisk/keys/asterisk.pem",
    dtlscafile: "/etc/asterisk/keys/ca.crt",
    dtlssetup: "actpass",
    rtcp_mux: "yes",
  });
  //Añade 201 para demo-congrats
  const obj4 = await Extension.create(obj.id, {
    context: "default",
    exten: "201",
    priority: "1",
    app: "Playback",
    appdata: "demo-congrats",
  });
  const obj41 = await Extension.create(obj.id, {
    context: "default",
    exten: "201",
    priority: "2",
    app: "hangup",
    appdata: "",
  });
  //Añade para que puedan llamarse entre los numeros con XXXX cantidad de digitos
  const obj5 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXX",
    priority: "1",
    app: "Monitor",
    appdata: "wav,,b",
  });
  const obj51 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXX",
    priority: "2",
    app: "Dial",
    appdata: "SIP/${EXTEN},10,Ttr",
  });
  const obj52 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXX",
    priority: "3",
    app: "hangup",
    appdata: "",
  });

  //VOICEMAIL
  const obj53 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXX",
    priority: "3",
    app: "VoiceMail",
    appdata: "${EXTEN}@default",
  });
  //CONSULTAR VOICEMAIL
  const obj54 = await Extension.create(obj.id, {
    context: "default",
    exten: "_*0",
    priority: "1",
    app: "VoiceMailMain",
    appdata: "${CALLERID(num)}@default",
  });
  //RECORD AUDIOS PARA IVR
  const obj55 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "1",
    app: "Answer",
    appdata: "",
  });
  const obj56 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "2",
    app: "Wait",
    appdata: "0.5",
  });
  const obj57 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "3",
    app: "Record",
    appdata: "/tmp/soundsasterisk/recordejemplo.gsm",
  });
  const obj58 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "4",
    app: "Wait",
    appdata: "1",
  });
  const obj59 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "5",
    app: "Playback",
    appdata: "/tmp/soundsasterisk/recordejemplo",
  });
  const obj510 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "6",
    app: "hangup",
    appdata: "",
  });
  //IVR
  const obj61 = await Extension.create(obj.id, {
    context: "default",
    exten: "*500",
    priority: 1,
    app: "Goto",
    appdata: "ivr,s,1",
  });
  const obj62 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "s",
    priority: 1,
    app: "Answer",
    appdata: "",
  });
  const obj63 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "s",
    priority: 2,
    app: "Background",
    appdata: "/tmp/soundsasterisk/recordejemplo",
  });
  const obj64 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "s",
    priority: 3,
    app: "WaitExten",
    appdata: "5",
  });
  //NUMEROS DE IVR
  const obj65 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "1",
    priority: 1,
    app: "Playback",
    appdata: "demo-congrats",
  });
  const obj66 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "2",
    priority: 1,
    app: "Playback",
    appdata: "hello-world",
  });
  const obj67 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "3",
    priority: 1,
    app: "Playback",
    appdata: "tt-monkeys",
  });
  const obj68 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "t",
    priority: 1,
    app: "Playback",
    appdata: "demo-thanks",
  });
  const obj69 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "t",
    priority: 2,
    app: "hangup",
    appdata: "",
  });
  //Calendario de llamadas para horas laborales sino enviar a IVR
  const obj71 = await Extension.create(obj.id, {
    context: "default",
    exten: "8000",
    priority: 1,
    app: "GotoIfTime",
    appdata: "8:30-19:20,mon-fri,*,*?ivr,s,1",
  });
  const obj72 = await Extension.create(obj.id, {
    context: "default",
    exten: "8000",
    priority: 2,
    app: "Playback",
    appdata: "tt-monkeys",
  });
  const obj73 = await Extension.create(obj.id, {
    context: "default",
    exten: "8000",
    priority: 3,
    app: "hangup",
    appdata: "",
  });
  //PARA COLAS DE LLAMADAS, LLAMANDO A ESTE NUMERO SE AÑADE AGENTES PARA RECIBIR LLAMADAS
  const obj81 = await Extension.create(obj.id, {
    context: "default",
    exten: "*201",
    priority: 1,
    app: "AddQueueMember",
    appdata: "support,SIP/${CHANNEL(peername)}",
  });
  const obj82 = await Extension.create(obj.id, {
    context: "default",
    exten: "*201",
    priority: 2,
    app: "Playback",
    appdata: "beep",
  });
  const obj83 = await Extension.create(obj.id, {
    context: "default",
    exten: "*201",
    priority: 3,
    app: "hangup",
    appdata: "",
  });
  //PARA COLAS DE LLAMADAS, LLAMANDO A ESTE NUMERO SE ELIMINA AGENTES PARA RECIBIR LLAMADAS
  const obj91 = await Extension.create(obj.id, {
    context: "default",
    exten: "*202",
    priority: 1,
    app: "RemoveQueueMember",
    appdata: "support,SIP/${CHANNEL(peername)}",
  });
  const obj92 = await Extension.create(obj.id, {
    context: "default",
    exten: "*202",
    priority: 2,
    app: "Playback",
    appdata: "beep",
  });
  const obj93 = await Extension.create(obj.id, {
    context: "default",
    exten: "*202",
    priority: 3,
    app: "hangup",
    appdata: "",
  });
  //AQUI SE LLAMA PARA USAR LAS COLAS DE LLAMADAS (SOPORTE)
  const obj101 = await Extension.create(obj.id, {
    context: "default",
    exten: "*600",
    priority: 1,
    app: "Answer",
    appdata: "",
  });
  //Pregunta para saber si es numero prioritario o es cualquier otro numero
  const obj102 = await Extension.create(obj.id, {
    context: "default",
    exten: "*600",
    priority: 2,
    app: "GotoIf",
    appdata:
      "$[ $[ '${CHANNEL(peername)}' = '6001' ] | $[ '${CHANNEL(peername)}' = '6002' ] ]?3:4",
  });
  //Si es numero prioritario se incrementa el atributo de prioridad y se coloca 1ro en la cola de llamadas, sino es prioritario, el atributo de prioridad se mantiene en 1
  const obj103 = await Extension.create(obj.id, {
    context: "default",
    exten: "*600",
    priority: 3,
    app: "hangup",
    appdata: "",
  });
  //de acuerdo al atributo de prioridad se establece la llamada con la cola de llamadas
  const obj104 = await Extension.create(obj.id, {
    context: "default",
    exten: "*600",
    priority: 4,
    app: "Queue",
    appdata: "support,,,,60",
  });
  const obj105 = await Extension.create(obj.id, {
    context: "default",
    exten: "*600",
    priority: 5,
    app: "hangup",
    appdata: "",
  });
  //Numero para conferencia, numero al llamar exten:3, sala conferencia, appdata:3
  const obj110 = await Extension.create(obj.id, {
    context: "default",
    exten: "3",
    priority: 1,
    app: "answer",
    appdata: "",
  });
  const obj111 = await Extension.create(obj.id, {
    context: "default",
    exten: "3",
    priority: 2,
    app: "confbridge",
    appdata: "3",
  });

  //Intervenir llamadas en curso
  //555X... Intervenir llamada silencionamente, ninguno de los 2 puede escucharte
  const obj140 = await Extension.create(obj.id, {
    context: "default",
    exten: "_555.",
    priority: 1,
    app: "ChanSpy",
    appdata: "SIP/${EXTEN:3},qb",
  });
  const obj141 = await Extension.create(obj.id, {
    context: "default",
    exten: "_555.",
    priority: 2,
    app: "hangup",
    appdata: "",
  });
  //556X... Intervenir llamada, pero solo el numero que interveniste puede escucharte, no ambos
  const obj150 = await Extension.create(obj.id, {
    context: "default",
    exten: "_556.",
    priority: 1,
    app: "ChanSpy",
    appdata: "SIP/${EXTEN:3},qw",
  });
  const obj151 = await Extension.create(obj.id, {
    context: "default",
    exten: "_556.",
    priority: 2,
    app: "hangup",
    appdata: "",
  });
  //557XXX... Intervenir llamada donde ambos pueden escucharte
  const obj160 = await Extension.create(obj.id, {
    context: "default",
    exten: "_557.",
    priority: 1,
    app: "ChanSpy",
    appdata: "SIP/${EXTEN:3},qB",
  });
  const obj161 = await Extension.create(obj.id, {
    context: "default",
    exten: "_557.",
    priority: 2,
    app: "hangup",
    appdata: "",
  });

  //Llamadas salientes hacia troncal FXO, en este caso para numeros a celular con 8 digitos XXXXXXXX
  const obj531 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXXXXXX",
    priority: "1",
    app: "Monitor",
    appdata: "wav,,b",
  });
  const obj532 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXXXXXX",
    priority: "2",
    app: "Dial",
    appdata: "SIP/salientes/${EXTEN},30,Ttr",
  });
  const obj533 = await Extension.create(obj.id, {
    context: "default",
    exten: "_XXXXXXXX",
    priority: "3",
    app: "hangup",
    appdata: "",
  });

  //Crea troncales para interactuar con la troncal fxo, llamadas entrantes
  //Usuario para sips varios
  const obj171 = await Usuario.create(obj.id, {
    nombre: "UsuarioNoexiste",
    apPaterno: "UsuarioNoexiste",
    apMaterno: "UsuarioNoexiste",
    tipo: "standard",
    direccion: "UsuarioNoexiste",
    telefono: "123456",
    correo: "UsuarioNoexiste@UsuarioNoexiste",
    password: bcrypt.hashSync("1234", 10),
    conectado: false,
  });
  //Sip para el puerto fxo
  const obj172 = await Sip.create(obj171.id, {
    name: "123123",
    host: "dynamic",
    secret: "123123",
    callerid: "fxo",
    type: "friend",
    insecure: "no",
    qualify: "no",
    context: "default",
    switchsip: "1",
  });
  //Troncal entrantes
  const obj173 = await Sip.create(obj171.id, {
    name: "fxo",
    host: "192.168.100.146",
    type: "peer",
    insecure: "no",
    qualify: "no",
    context: "default",
    switchsip: "1",
  });
  //Trocanl salientes
  const obj174 = await Sip.create(obj171.id, {
    name: "salientes",
    host: "192.168.100.50",
    type: "peer",
    insecure: "no",
    qualify: "no",
    context: "default",
    switchsip: "1",
  });

  //Ejemplo para radio (la radio es un sip, q no esta vinculado a un usuario)

  const obj181 = await Sip.createRadio({
    name: "4001",
    secret: "4001",
    callerid: "4001",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify: "yes",
    nat: "force_rport,comedia",
    switchsip: "1",
  });

  res.send({
    message: obj,
    obj2,
    obj21,
    obj3,
    obj31,
    obj4,
    obj41,
    obj5,
    obj51,
    obj52,
    obj53,
    obj22,
  });
});

api.get("/datosRoot", async (req, res) => {
  //añade un nuevo root
  const obj = await Sala.create({
    nombreSala: "root",
    descripcion: "sala root",
    switch: "switch encendido-apagado",
  });
  const obj2 = await Usuario.create(obj.id, {
    nombre: "root",
    apPaterno: "root",
    apMaterno: "root",
    tipo: "root",
    direccion: "root1234",
    telefono: "654321",
    correo: "root@root",
    password: "1234",
    conectado: false,
  });

  res.send({ message: obj, obj2 });
});

api.get("/datosOperador", async (req, res) => {
  //añade un nuevo root
  const obj = await Sala.create({
    nombreSala: "Operador",
    descripcion: "sala Operador",
    switch: "switch encendido-apagado",
  });
  const obj2 = await Usuario.create(obj.id, {
    nombre: "Operador",
    apPaterno: "Operador",
    apMaterno: "Operador",
    tipo: "Operador",
    direccion: "Operador123",
    telefono: "789456",
    correo: "operador@operador",
    password: "1234",
    conectado: false,
  });

  res.send({ message: obj, obj2 });
});

/// SALA /////////////////////////////////////////////////////////////////////

api.post("/addSala", async (req, res, next) => {
  //leemos el archivo extensions.conf, donde se añadira una nueva extension para la sala
  let dat1 = fs.readFileSync("/etc/asterisk/extensions.conf", "utf8");

  const params = req.body;
  //creamos una sala con todos sus atributos
  let obj;
  try {
    obj = await Sala.create({
      nombreSala: params.nombreSala,
      descripcion: params.descripcion,
      switch: params.switch,
    });
    //En el archivo extensions.conf de asterisk, creamos la nueva sala
    dat1 += `\n[${params.nombreSala}]\nswitch = Realtime/@`;
    fs.writeFile("/etc/asterisk/extensions.conf", dat1, (err) => {
      if (err) console.log(err);
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});
api.put("/updateSala", async (req, res, next) => {
  const params = req.body;
  //editamos cualquier atriburo de una sala buscandolo por su id
  let obj, obj2;
  try {
    //obtenemos el nombre antiguo de la sala, antes del cambio
    obj2 = await Sala.findById(params.id);

    obj = await Sala.update(params.id, {
      nombreSala: params.nombreSala,
      descripcion: params.descripcion,
      switch: params.switch,
    });

    //Actualizamos la sala de extensions.conf de asterisk
    let dat1 = fs.readFileSync("/etc/asterisk/extensions.conf", "utf8");
    var sw = 0,
      sw2 = -1,
      aux = "",
      pos = -1,
      pos2 = -1,
      final = "";
    //For para buscar la sala indicada
    for (let i = 0; i < dat1.length; i++) {
      //if para detectar el caracter [
      if (dat1.charCodeAt(i) == 91) {
        sw = 1;
        pos = i;
      }
      //Concatena el nombre dentro del corchete
      if (sw == 1) {
        aux += dat1[i];
      }
      //Detiene la concatenacion del nombre de la sala
      if (dat1.charCodeAt(i) == 93) {
        sw = 0;
        //compara el contexto con la sala, si es la sala indicada, sale del for
        if (aux.substring(1, aux.length - 1) == obj2.nombreSala) {
          pos2 = i;
          sw2 = 1;
          break;
        }
        aux = "";
      }
    }
    //switch para validar que si existe la sala
    if (sw2 == 1) {
      //concatena de 0 a la primera posicion
      final += dat1.substring(0, pos + 1);
      //actualizamos el nombre de la sala
      final += params.nombreSala;
      //concatena el resto del archivo extensions.conf, exceptuando la sala
      final += dat1.substring(pos2, dat1.length);
      //if para confirmar que no haya un espacio extra despues de borrar la sala
      if (final.charCodeAt(final.length - 1) == 10) {
        final = final.substring(0, final.length - 1);
      }
      //escribe en el archivo extesions.conf
      fs.writeFile("/etc/asterisk/extensions.conf", final, (err) => {
        if (err) console.log(err);
      });
    }
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdSala", async (req, res, next) => {
  const params = req.body;
  //buscamos un sala por su id y devolvemos esa sala
  let obj;
  try {
    obj = await Sala.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Sala not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllSala", async (req, res, next) => {
  //buscamos y devolvemos a todas las salas
  const obj = await Sala.findAll();

  res.send(obj);
});

api.post("/getUsuariosPorSala", async (req, res, next) => {
  var params = req.body;
  //obtenemos todos los usuarios
  const usuariosTodos = await Usuario.findAll();
  const sipTodos = await Sip.findAll();
  var usuariosSala = [];

  //iteramos a todos los usuario y preguntamos si la sala de un usuario es igual a la q le mandamos por postman
  //si es asi guardamos al usuario y lo devolvemos
  usuariosTodos.forEach((usuario) => {
    sipTodos.forEach((obj) => {
      if (
        usuario.salaId == params.salaId &&
        usuario.id == obj.usuarioId &&
        obj.allow != null
      ) {
        usuariosSala.push({
          id: `${usuario.id}`,
          nombre: `${usuario.nombre}`,
          apPaterno: `${usuario.apPaterno}`,
          apMaterno: `${usuario.apMaterno}`,
          conectado: `${usuario.conectado}`,
          telefono: `${usuario.telefono}`,
          correo: `${usuario.correo}`,
          salaId: `${usuario.salaId}`,
          numeroSip: `${obj.name}`,
        });
      }
    });
  });

  res.send(usuariosSala);
});

api.post("/deleteSala", async (req, res, next) => {
  const params = req.body;
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let sipsdeusuario = [];
  let iaxsdeusuario = [];
  let edit;

  sipsAll.forEach((obj) => {
    if (obj.context == params.context) {
      sipsdeusuario.push(obj);
    }
  });

  iaxsAll.forEach((obj) => {
    if (obj.context == params.context) {
      iaxsdeusuario.push(obj);
    }
  });

  sipsdeusuario.forEach((obj) => {
    try {
      edit = Sip.updatesipCont(obj.context, {
        context: params.nuevaSala,
      });
    } catch (e) {
      return next(e);
    }
  });

  iaxsdeusuario.forEach((obj) => {
    try {
      edit = Iax.updateiaxCont(obj.context, {
        context: params.nuevaSala,
      });
    } catch (e) {
      return next(e);
    }
  });

  await Sala.destroynomSala(params.context);

  //Eliminamos la sala de extensions.conf de asterisk
  let dat1 = fs.readFileSync("/etc/asterisk/extensions.conf", "utf8");
  var sw = 0,
    sw2 = -1,
    aux = "",
    pos = -1,
    pos2 = -1,
    final = "";
  //For para buscar la sala indicada
  for (let i = 0; i < dat1.length; i++) {
    //if para detectar el caracter [
    if (dat1.charCodeAt(i) == 91) {
      sw = 1;
      pos = i;
    }
    //Concatena el nombre dentro del corchete
    if (sw == 1) {
      aux += dat1[i];
    }
    //Detiene la concatenacion del nombre de la sala
    if (dat1.charCodeAt(i) == 93) {
      sw = 0;
      //compara el contexto con la sala, si es la sala indicada, sale del for
      if (aux.substring(1, aux.length - 1) == params.context) {
        pos2 = i;
        sw2 = 1;
        break;
      }
      aux = "";
    }
  }
  //switch para validar que si existe la sala
  if (sw2 == 1) {
    //concatena de 0 a la primera posicion
    final += dat1.substring(0, pos);
    //concatena el resto del archivo extensions.conf, exceptuando la sala
    final += dat1.substring(pos2 + 22, dat1.length);
    //if para confirmar que no haya un espacio extra despues de borrar la sala
    if (final.charCodeAt(final.length - 1) == 10) {
      final = final.substring(0, final.length - 1);
    }
    //escribe en el archivo extesions.conf
    fs.writeFile("/etc/asterisk/extensions.conf", final, (err) => {
      if (err) console.log(err);
    });
  }

  res.send(edit);
});
/// USUARIO /////////////////////////////////////////////////////////////////////

api.post("/addUsuario", async (req, res, next) => {
  const params = req.body;
  //creamos un usuario con todos sus atributos atraves del id de la sala
  let obj;
  try {
    obj = await Usuario.create(params.salaId, {
      nombre: params.nombre,
      apPaterno: params.apPaterno,
      apMaterno: params.apMaterno,
      tipo: params.tipo,
      direccion: params.direccion,
      telefono: params.telefono,
      correo: params.correo,
      password: bcrypt.hashSync(params.password, 10),
      conectado: params.conectado,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});
api.put("/updateUsuario", async (req, res, next) => {
  const params = req.body;
  //editamos un usuario atraves de su id
  let obj;
  try {
    obj = await Usuario.update(params.id, {
      nombre: params.nombre,
      apPaterno: params.apPaterno,
      apMaterno: params.apMaterno,
      tipo: params.tipo,
      direccion: params.direccion,
      telefono: params.telefono,
      correo: params.correo,
      password: bcrypt.hashSync(params.password, 10),
      conectado: params.conectado,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdUsuario", async (req, res, next) => {
  const params = req.body;
  //buscamos al usuario atraves de su id y lo devolvemos
  let obj;
  try {
    obj = await Usuario.findById(params.id);
  } catch (e) {
    return next(e);
  }

  if (!obj || obj.lenght == 0) {
    return next(new Error(`Usuario not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllUsuario", async (req, res, next) => {
  let obj;
  //buscamos y devolvemos a todos los usuarios
  try {
    obj = await Usuario.findAll();
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/getUsuByContextOfSip", async (req, res, next) => {
  var params = req.body;
  //Obtengo todos los sips e iaxs
  const usuariosAll = await Usuario.findAll();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  //creo variables todos son vectores
  let siptodos = [];
  let sipid = [];
  let iaxtodos = [];
  let iaxid = [];
  let usuariostodossips = [];
  let usuariostodosiaxs = [];
  let todos = [];
  //itero sobre los sips y obtengo los ids ademas de su id, name, callerid.
  sipsAll.forEach((obj) => {
    //preguntamos si el contexto del objeto es igual al parametro que enviamos por postman
    if (obj.context == params.context) {
      //guardo solo los IDS
      sipid.push(obj.usuarioId);
      //guardo el id, name, y callerid para despues mostrarlos con el nombre de sus atributos
      siptodos.push({
        id: `${obj.id}`,
        name: `${obj.name}`,
        callerid: `${obj.callerid}`,
      });
    }
  });
  //itero sobre los iaxs y obtengo los ids ademas de su id, name, callerid.
  iaxsAll.forEach((obj) => {
    //preguntamos si el contexto del objeto es igual al parametro que enviamos por postman
    if (obj.context == params.context) {
      //guardo solo los IDS
      iaxid.push(obj.usuarioId);
      //guardo el id, name, y callerid para despues mostrarlos con el nombre de sus atributos
      iaxtodos.push({
        id: `${obj.id}`,
        name: `${obj.name}`,
        callerid: `${obj.callerid}`,
      });
    }
  });
  //iteramos sobres los IDS de los sips obtenidos
  sipid.forEach((sip) => {
    //iteramos sobre los usuarios
    usuariosAll.forEach((obj) => {
      //preguntamos si id del usuario es igual a los IDS
      if (obj.id == sip) {
        //obtenemos el id, nombre, ap Paterno, ap Materno del usuario y lo guardamos en un vector
        usuariostodossips.push({
          id: `${obj.id}`,
          nombre: `${obj.nombre}`,
          apPaterno: `${obj.apPaterno}`,
          apMaterno: `${obj.apMaterno}`,
        });
      }
    });
  });
  //iteramos sobres los IDS de los iaxs obtenidos
  iaxid.forEach((iax) => {
    //iteramos sobre los usuarios
    usuariosAll.forEach((obj) => {
      //preguntamos si id del usuario es igual a los IDS
      if (obj.id == iax) {
        //obtenemos el id, nombre, ap Paterno, ap Materno del usuario y lo guardamos en un vector
        usuariostodosiaxs.push({
          id: `${obj.id}`,
          nombre: `${obj.nombre}`,
          apPaterno: `${obj.apPaterno}`,
          apMaterno: `${obj.apMaterno}`,
        });
      }
    });
  });
  //devolvemos a los usuarios y sips separados (vectores dentro de vectores)
  todos.push(usuariostodossips, siptodos);
  //devolvemos a los usuarios y iaxs separados (vectores dentro de vectores)
  todos.push(usuariostodosiaxs, iaxtodos);
  //mostramos todo el vector
  res.send(todos);
});

api.put("/updateContextAndIdSala", async (req, res, next) => {
  const params = req.body;
  //creamos la variable obj
  let obj;
  //editamos la salaId del usuario atravez del id del usuario
  try {
    obj = await Usuario.update(params.id, {
      salaId: params.cambioSalaId,
    });
  } catch (e) {
    return next(e);
  }
  //editamos el contexto de un sip por su numero de sip
  try {
    obj = await Sip.updateForNumber(params.numero, {
      context: params.cambioSala,
    });
  } catch (e) {
    return next(e);
  }
  //devolvemos el obj con un mensaje con el numero "1" que dice que se edito correctamente
  res.send(obj);
});

api.post("/getUsuariosWithSipsAndIaxs", async (req, res, next) => {
  const params = req.body;
  //Obtengo todos los sips e iaxs
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let getsips = [];
  let getiaxs = [];
  let todos = [];
  //itero sobre los sips e iaxs
  sipsAll.forEach((obj) => {
    if (obj.usuarioId == params.id) {
      getsips.push(obj);
    }
  });
  iaxsAll.forEach((obj) => {
    if (obj.usuarioId == params.id) {
      getiaxs.push(obj);
    }
  });
  //obtenemos los sips e iaxs de un usuario apartir de su id de usuario
  todos.push(getsips);
  todos.push(getiaxs);
  res.send(todos);
});

api.get("/getUsuariosTodos", async (req, res, next) => {
  const params = req.body;
  //Obtengo todos los sips e iaxs
  const usuariosAll = await Usuario.findAllOrder();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let getusuarios = [];
  //itero sobre los usuarios ordenados por nombre
  usuariosAll.forEach((obj) => {
    //itero sobre los sips
    sipsAll.forEach((obj1) => {
      //preguntamos si el id del usuario es igual al id del sip y separamos a los sips troncales
      if (obj.id == obj1.usuarioId && obj1.nat != null) {
        //guardamos en un vector los usuarios con su id nombre y su numero sip
        getusuarios.push({
          usuarioId: `${obj.id}`,
          nombre: `${obj.nombre}`,
          numeroSip: `${obj1.name}`,
        });
        //getusuarios.push({ numeroSip: `${obj1.name}` });
      }
    });
  });
  //mostramos a los usuarios
  res.send(getusuarios);
});

api.post("/getSalaPorUsuarioId", async (req, res, next) => {
  const params = req.body;
  //Obtengo todos los usuarios y salas
  const usuariosAll = await Usuario.findAll();
  const salasAll = await Sala.findAll();

  let getsala = [];
  //itero sobre los usuarios
  usuariosAll.forEach((obj) => {
    //itero sobre las salas
    salasAll.forEach((obj1) => {
      //preguntamos si el id del usuario es igual al id que le mandamos por postman
      if (obj.id == params.idUsuario && obj.salaId == obj1.id) {
        //guardamos en un vector el nombre de la sala
        getsala.push({
          nombreSala: `${obj1.nombreSala}`,
        });
      }
    });
  });
  //mostramos el nombre de la sala
  res.send(getsala);
});

api.delete("/deleteUsuarioWithAll", async (req, res, next) => {
  const params = req.body;
  //Obtengo todos los usuario de la tabla usuarios. A todos sips e iaxs
  const usuariosSala1 = await Usuario.findAll();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  const agendasAll = await Agenda.findAll();
  let usuariosSala3 = [];
  //iteramos toda la tabla usuario para obtener el id del usuario y guardarlo en un vector
  usuariosSala1.forEach((usuario) => {
    if (usuario.id == params.id) {
      usuariosSala3.push(usuario.id);
    }
  });
  //recorremos el vector con los ids de los usuarios y borramos sus sips iaxs
  for (let i = 0; i < usuariosSala3.length; i++) {
    sipsAll.forEach((obj) => {
      if (obj.usuarioId == usuariosSala3[i]) {
        Sip.destroy1(obj.id);
      }
    });
  }

  for (let i = 0; i < usuariosSala3.length; i++) {
    iaxsAll.forEach((obj) => {
      if (obj.usuarioId == usuariosSala3[i]) {
        Iax.destroy1(obj.id);
      }
    });
  }
  for (let i = 0; i < usuariosSala3.length; i++) {
    agendasAll.forEach((obj) => {
      if (obj.usuarioId == usuariosSala3[i]) {
        Agenda.destroy(obj.id);
      }
    });
  }
  //borramos al usuario apartir de su id
  await Usuario.destroy(params.id);
  res.send({ message: "Se elimino Usuario" });
});

//LOGIN
api.post("/login", async (req, res, next) => {
  var params = req.body;
  var correo = params.correo;
  var pass = params.password;
  Usuario.findOneCorreo(correo).then(function (result, err) {
    if (err) {
      res.status(500).send({ message: "error al comprobar el usuario" });
    } else {
      console.log(result);
      if (result) {
        if (bcrypt.compareSync(pass, result.password)) {
          res.status(200).send({ result });
        } else {
          res
            .status(404)
            .send({ message: "error al introducir la contraseña" });
        }
      } else {
        res.status(404).send({ message: "el usuario no existe" });
      }
    }
  });
});

/// SIP /////////////////////////////////////////////////////////////////////

api.post("/addSip", async (req, res, next) => {
  const params = req.body;
  //creo un sip con todos sus atributos apartir del id del usuario
  let obj;
  try {
    obj = await Sip.create(params.usuarioId, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat,
      switchsip: params.switchsip,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/addSipWebRtc", async (req, res, next) => {
  const params = req.body;
  //creo un sip con todos sus atributos apartir del id del usuario
  let obj;
  try {
    obj = await Sip.create(params.usuarioId, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat,
      switchsip: params.switchsip,

      qualifyfreq: params.qualifyfreq,
      deny: params.deny,
      dtnfnode: params.dtnfnode,
      canreinvite: params.canreinvite,
      trustrpid: params.trustrpid,
      sendrpid: params.sendrpid,
      transport: params.transport,
      avpf: params.avpf,
      force_avp: params.force_avp,
      icesupport: params.icesupport,
      encryption: params.encryption,
      callgroup: params.callgroup,
      pickupgroup: params.pickupgroup,
      dial: params.dial,
      permit: params.permit,
      callcounter: params.callcounter,
      faxdetect: params.faxdetect,
      directmedia: params.directmedia,
      dtlsenable: params.dtlsenable,
      dtlsverify: params.dtlsverify,
      dtlscertfile: params.dtlscertfile,
      dtlscafile: params.dtlscafile,
      dtlssetup: params.dtlssetup,
      rtcp_mux: params.rtcp_mux,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/addSipRadio", async (req, res, next) => {
  const params = req.body;
  //creo un sip (Radio) con todos sus atributos
  let obj;
  try {
    obj = await Sip.createRadio({
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat,
      switchsip: params.switchsip,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/addSipTroncal", async (req, res, next) => {
  const params = req.body;
  //creo un sip Troncal con todos sus atributos
  let obj;
  try {
    obj = await Sip.createRadio({
      name: params.name,
      host: params.host,
      type: params.type,
      insecure: params.insecure,
      qualify: params.qualify,
      context: params.context,
      switchsip: params.switchsip,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.put("/updateSipTroncal", async (req, res, next) => {
  const params = req.body;
  //creo un sip Troncal con todos sus atributos
  let obj;
  try {
    obj = await Sip.update(params.id, {
      name: params.name,
      host: params.host,
      type: params.type,
      insecure: params.insecure,
      qualify: params.qualify,
      context: params.context,
      switchsip: params.switchsip,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.put("/updateSip", async (req, res, next) => {
  const params = req.body;
  //edito un sip buscandolo por su id
  let obj;
  try {
    obj = await Sip.update(params.id, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat,
      switchsip: params.switchsip,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.put("/updateSipWebRtc", async (req, res, next) => {
  const params = req.body;
  //edito un sip buscandolo por su id
  let obj;
  try {
    obj = await Sip.update(params.id, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat,
      switchsip: params.switchsip,

      qualifyfreq: params.qualifyfreq,
      deny: params.deny,
      dtnfnode: params.dtnfnode,
      canreinvite: params.canreinvite,
      trustrpid: params.trustrpid,
      sendrpid: params.sendrpid,
      transport: params.transport,
      avpf: params.avpf,
      force_avp: params.force_avp,
      icesupport: params.icesupport,
      encryption: params.encryption,
      callgroup: params.callgroup,
      pickupgroup: params.pickupgroup,
      dial: params.dial,
      permit: params.permit,
      callcounter: params.callcounter,
      faxdetect: params.faxdetect,
      directmedia: params.directmedia,
      dtlsenable: params.dtlsenable,
      dtlsverify: params.dtlsverify,
      dtlscertfile: params.dtlscertfile,
      dtlscafile: params.dtlscafile,
      dtlssetup: params.dtlssetup,
      rtcp_mux: params.rtcp_mux,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdSip", async (req, res, next) => {
  const params = req.body;
  //obtebgo un sip buscondolo por el id del sip
  let obj;
  try {
    obj = await Sip.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Sip not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllSip", async (req, res, next) => {
  //obtengo todos los sips
  const SipsAll = await Sip.findAll();
  //creo un vector
  let getsipsnot = [];
  //itero sobre todos los sips
  SipsAll.forEach((obj) => {
    //preguntamos si sus atributos son distintos de null
    if (obj.disallow != null && obj.nat != null) {
      //guardamos todos los sips q no tienen esos parametros con null
      getsipsnot.push(obj);
    }
  });
  //mostramos todos los sips no troncales
  res.send(getsipsnot);
});

api.post("/findSipByNumber", async (req, res, next) => {
  const params = req.body;
  //obtengo todos los sips y usuarios
  const SipsAll = await Sip.findAll();
  const UsuariosAll = await Usuario.findAll();
  //creo vectores
  let getsip = [];
  let getusuario = [];
  //itero sobre todos los sips
  SipsAll.forEach((obj) => {
    //preguntamos si su numero es igual al parametro que mando por postman
    if (obj.name == params.numero) {
      //guardamos todos los sips con el numero enviado
      getsip.push(obj.usuarioId);
    }
  });
  //itero sobre todos los usuarios
  UsuariosAll.forEach((obj) => {
    //preguntamos si el sip que guardamos es igual al id del usuario
    if (obj.id == getsip) {
      //guardamos al usuario con ese sip
      getusuario.push({
        nombre: `${obj.nombre}`,
        apPaterno: `${obj.apPaterno}`,
        apMaterno: `${obj.apMaterno}`,
        correo: `${obj.correo}`,
        direccion: `${obj.direccion}`,
        telefono: `${obj.telefono}`,
      });
    }
  });
  //mostramos al usuario con ese numero sip enviado
  res.send(getusuario);
});

api.get("/findLastSip", async (req, res, next) => {
  //obtengo todos los sips
  const SipsAll = await Sip.findAll();
  //creo un vector
  let getsipsnot = [];
  //itero sobre todos los sips
  SipsAll.forEach((obj) => {
    //preguntamos si sus atributos son distintos de null
    if (obj.disallow != null && obj.nat != null) {
      //guardamos todos los sips q no tienen esos parametros con null
      getsipsnot.push(obj);
    }
  });
  //mostramos el ultimo sip que no sea troncal
  res.send(getsipsnot[getsipsnot.length - 1]);
});

api.get("/findAllRadios", async (req, res, next) => {
  //obtengo todos los sips
  const SipsAll = await Sip.findAll();
  //creo un vector
  let getradios = [];
  //itero sobre todos los sips
  SipsAll.forEach((obj) => {
    //preguntamos si la radio tiene el usuario en null
    if (obj.usuarioId == null) {
      //guardamos todas las radios
      getradios.push(obj);
    }
  });
  //mostramos todas las radios
  res.send(getradios);
});

api.delete("/deleteSip", async (req, res, next) => {
  const params = req.body;
  //borro un sip apartir del id del sip
  await Sip.destroy1(params.id);

  res.send({ message: "se borro el sip" });
});
/// EXTENSION /////////////////////////////////////////////////////////////////////

api.post("/addExtension", async (req, res, next) => {
  const params = req.body;
  //creo una extension con todos sus atributos
  let obj;
  try {
    obj = await Extension.create(params.salaId, {
      context: params.context,
      exten: params.exten,
      priority: params.priority,
      app: params.app,
      appdata: params.appdata,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});
api.put("/updateExtension", async (req, res, next) => {
  const params = req.body;
  //edito cualquier atributo de de la tabla extension buscando por el id de la extension
  let obj;
  try {
    obj = await Extension.update(params.id, {
      context: params.context,
      exten: params.exten,
      priority: params.priority,
      app: params.app,
      appdata: params.appdata,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdExtension", async (req, res, next) => {
  const params = req.body;
  //busco y devuelvo todos los atributos de la tabla extension buscando por el id de extension
  let obj;
  try {
    obj = await Extension.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Extension not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllExtension", async (req, res, next) => {
  let obj;
  //busco y devuelvo todos los atributos de la tabla extension
  try {
    obj = await Extension.findAll();
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findAllExtensionByContext", async (req, res, next) => {
  const params = req.body;
  //obtengo todos los atributos de la tabla cdrs
  const extensionsAll = await Extension.findAll();
  let getcontextos = [];
  extensionsAll.forEach((obj) => {
    if (obj.context == params.context) {
      getcontextos.push(obj);
    }
  });

  res.send(getcontextos);
});

api.post("/findAllExtensionByFunctions", async (req, res, next) => {
  const params = req.body;
  let sw = "0";
  if (params.funcion == "llamadasDemo") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "playback",
      appdata: `${params.audio}`,
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion llamada Entre Miembros De Una Sala con numeros De Cuatro Digitos
  if (params.funcion == "llamadaEntreMiembrosDeUnaSalaDeCuatroDigitos") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Monitor",
      appdata: `${params.audio}`,
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Dial",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "hangup",
      appdata: "",
    });
    const obj4 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "VoiceMail",
      appdata: `${params.audio}`,
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Al Correo De Voz
  if (params.funcion == "llamadaAlCorreoDeVoz") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "VoiceMailMain",
      appdata: `${params.audio}`,
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Para Grabar Audios
  if (params.funcion == "llamadaParaGrabarAudios") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Answer",
      appdata: "",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Wait",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "Record",
      appdata: `${params.audio}`,
    });
    const obj4 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "4",
      app: "Wait",
      appdata: `${params.audio}`,
    });
    const obj5 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "5",
      app: "Playback",
      appdata: `${params.audio}`,
    });
    const obj6 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Al Ivr
  if (params.funcion == "llamadaAlIvr") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Goto",
      appdata: `${params.audio}`,
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Funciones del Ivr
  if (params.funcion == "llamadaFuncionesIvr" && params.numero == "s") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Answer",
      appdata: "",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Background",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "WaitExten",
      appdata: "5",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  if (params.funcion == "llamadaFuncionesIvr" && params.numero == "1") {
    const obj4 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: `${params.app}`,
      appdata: `${params.audio}`,
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  if (params.funcion == "llamadaFuncionesIvr" && params.numero == "2") {
    const obj5 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: `${params.app}`,
      appdata: `${params.audio}`,
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  if (params.funcion == "llamadaFuncionesIvr" && params.numero == "3") {
    const obj6 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: `${params.app}`,
      appdata: `${params.audio}`,
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  if (params.funcion == "llamadaFuncionesIvr" && params.numero == "t") {
    const obj7 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Playback",
      appdata: `${params.audio}`,
    });
    const obj8 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Horario De Atencion
  if (params.funcion == "llamadaHorarioDeAtencion") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "GotoIfTime",
      appdata: `${params.audio}`,
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Playback",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Para Volverse Agente
  if (params.funcion == "llamadaParaVolverseAgente") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "AddQueueMember",
      appdata: `${params.audio + ",SIP/${CHANNEL(peername)}"}`,
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Playback",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada Para Dejar de ser Agente
  if (params.funcion == "llamadaParaDejarDeSerAgente") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "RemoveQueueMember",
      appdata: `${params.audio + ",SIP/${CHANNEL(peername)}"}`,
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Playback",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada para la cola de llamadas
  if (params.funcion == "llamadaColaDeLlamadas") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Answer",
      appdata: "",
    });
    if (params.audio != params.audio2) {
      const obj2 = await Extension.create(1, {
        context: `${params.sala}`,
        exten: `${params.numero}`,
        priority: "2",
        app: "GotoIf",
        appdata: `${
          "$[ $[ '${CHANNEL(peername)}' = '" +
          params.audio +
          "' | $[ '${CHANNEL(peername)}' = '" +
          params.audio2 +
          "' ] ]?3:4"
        }`,
      });
    }
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "Set",
      appdata: "",
    });
    const obj4 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "4",
      app: "Queue",
      appdata: `${params.audio + ",,,,60"}`,
    });
    const obj5 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "5",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada de Conferencia
  if (params.funcion == "llamadaConferencia") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "answer",
      appdata: "",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "confbridge",
      appdata: "3",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Espiar llamadas silenciosamente
  if (params.funcion == "llamadaEspiarLlamadaSilenciosamente") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "ChanSpy",
      appdata: "SIP/${EXTEN:3},qb",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Espiar llamada solo a la persona que llamo
  if (params.funcion == "llamadaEspiarLlamadaSoloConAgente") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "ChanSpy",
      appdata: "SIP/${EXTEN:3},qw",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion espiar llamada a ambas personas
  if (params.funcion == "llamadaEspiarLlamadaConAmbos") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "ChanSpy",
      appdata: "SIP/${EXTEN:3},qB",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Llamada a celulares fuera del sistema
  if (params.funcion == "llamadaHaciaCelularesExternos") {
    sw = "1";
    const obj = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "Monitor",
      appdata: "wav,,b",
    });
    const obj2 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "Dial",
      appdata: `${params.audio}`,
    });
    const obj3 = await Extension.create(1, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "3",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  if (sw == "0") {
    res.send({ message: "Funcion no encontrada" });
  }
});

api.post("/pruebaIntervencion", async (req, res, next) => {
  const params = req.body;
  let sw = "0";

  if (params.funcion == "llamadaEspiarLlamadaSilenciosamente") {
    sw = "1";
    const obj = await Extension.create(params.salaId, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "ChanSpy",
      appdata: "SIP/${EXTEN:3},qb",
    });
    const obj2 = await Extension.create(params.salaId, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  //Creamos las entradas para la funcion Espiar llamada solo a la persona que llamo
  if (params.funcion == "llamadaEspiarLlamadaSoloConAgente") {
    sw = "1";
    const obj = await Extension.create(params.salaId, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "ChanSpy",
      appdata: "SIP/${EXTEN:3},qw",
    });
    const obj2 = await Extension.create(params.salaId, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }
  if (params.funcion == "llamadaEspiarLlamadaConAmbos") {
    sw = "1";
    const obj = await Extension.create(params.salaId, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "1",
      app: "ChanSpy",
      appdata: "SIP/${EXTEN:3},qB",
    });
    const obj2 = await Extension.create(params.salaId, {
      context: `${params.sala}`,
      exten: `${params.numero}`,
      priority: "2",
      app: "hangup",
      appdata: "",
    });
    res.send({ message: "La funcion se creo correctamente" });
  }

  if (sw == "0") {
    res.send({ message: "Funcion no encontrada" });
  }
});

api.post("/pruebas", async (req, res, next) => {
  //busco y devuelvo todos los atributos de la tabla cdrs
  const params = req.body;
  //obtengo todos los atributos de la tabla cdrs
  const extensionsAll = await Extension.findAll();
  const usuariosAll = await Usuario.findAll();
  let getusuariosPrueba = [];

  usuariosAll.forEach((obj) => {
    extensionsAll.forEach((obj1) => {
      if (obj.salaId == params.idsala && obj1.id == params.idsala) {
        getusuariosPrueba.push(obj);
      }
    });
  });

  res.send(getusuariosPrueba);
});

/// PRIVILEGIOS /////////////////////////////////////////////////////////////////////

api.post("/addPrivilegios", async (req, res, next) => {
  const params = req.body;
  let obj;
  //Creo un privilegio asignado a un usuario
  try {
    obj = await Privilegios.create(params.usuarioId, {
      context: params.context,
      numerofun: params.numerofun,
      switch: params.switch,
    });
  } catch (e) {
    return next(e);
  }
  res.send(obj);
});

api.put("/updatePrivilegios", async (req, res, next) => {
  const params = req.body;
  //edito cualquier atributo de de la tabla Privilegios buscando por el id de los Privilegios
  let obj;
  try {
    obj = await Privilegios.update(params.id, {
      context: params.context,
      numerofun: params.numerofun,
      switch: params.switch,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.put("/updatePrivilegiosSwitch", async (req, res, next) => {
  const params = req.body;
  //edito el atributo switch de de la tabla Privilegios buscando por el id de los Privilegios
  let obj;
  try {
    obj = await Privilegios.update(params.id, {
      switch: params.switch,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdPrivilegios", async (req, res, next) => {
  const params = req.body;
  //busco los cdrs apartir de su id de cdr
  let obj;
  try {
    obj = await Privilegios.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Sala not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllPrivilegios", async (req, res, next) => {
  let obj;
  //busco y devuelvo todos los atributos de la tabla Agenda
  try {
    obj = await Privilegios.findAll();
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findPrivilegiosByUsuario", async (req, res, next) => {
  const params = req.body;
  const privilegiosAll = await Privilegios.findAll();
  let getfuncion = [];

  privilegiosAll.forEach((obj) => {
    if (obj.usuarioId == params.usuarioId) {
      getfuncion.push({
        nombreSala: `${obj.context}`,
        funcion: `${obj.numerofun}`,
        switch: `${obj.switch}`,
      });
    }
  });

  res.send(getfuncion);
});

/// CDR /////////////////////////////////////////////////////////////////////

api.get("/findAllCdr", async (req, res, next) => {
  //busco y devuelvo todos los atributos de la tabla cdrs
  const obj = await Cdr.findAll();
  res.send(obj);
});

api.post("/findByIdCdr", async (req, res, next) => {
  const params = req.body;
  //busco los cdrs apartir de su id de cdr
  let obj;
  try {
    obj = await Cdr.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Sala not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/downloadCalls/:uniqueid/:SIP/:channel", async (req, res, next) => {
  const params = req.params;
  var id = params.uniqueid;
  var chanel = params.SIP + "/" + params.channel;
  let a = [],
    download = [];
  var sw = -1;
  //lista todos los archivos en la carpeta uploads, q es un enlace referencial de var/spool/asterisk/monitor de asterisk
  a = shell.ls("-l", `${__dirname}/upload/monitor`);
  //itera sobre todos los elementos de la carpeta
  for (let i = 0; i < a.length; i++) {
    //compara: sip, channel, uniqueid
    if (
      a[i].name.substring(11, 14) == chanel.substring(0, 3) &&
      parseInt(id) <= parseInt(a[i].name.substring(0, 10)) &&
      parseInt(id) + 20 >= parseInt(a[i].name.substring(0, 10)) &&
      a[i].name.substring(15, a[i].name.lastIndexOf("-")) ==
        chanel.substring(4, chanel.lenght)
    ) {
      sw = 1;
      download.push(`/var/spool/asterisk/monitor/${a[i].name}`);
    }
  }
  //si se encontro el archivo, se empaque los 2 (in,out) en un zip para descargarlo en el navegador
  //otra forma de descargar, pero los navegadores solo admiten un archivo a la vez res.download(download[0]);
  if (sw == 1) {
    res.zip(
      [
        {
          path: `${download[0]}`,
          name: `${download[0].substring(28, download[0].length)}`,
        },
        {
          path: `${download[1]}`,
          name: `${download[1].substring(28, download[1].length)}`,
        },
      ],
      `${chanel}.zip`
    );
  } else {
    return next(new Error(`Audio not found`));
  }
});

api.post("/listenCalls", function (req, res, next) {
  const params = req.body;
  var id = params.uniqueid;
  var chanel = params.channel;
  let a = [],
    download = [];
  var sw = -1;
  //lista todos los archivos en la carpeta uploads, q es un enlace referencial de var/spool/asterisk/monitor de asterisk
  a = shell.ls("-l", `${__dirname}/upload/monitor`);
  //itera sobre todos los elementos de la carpeta
  for (let i = 0; i < a.length; i++) {
    //compara: sip, channel, uniqueid
    /*console.log(
      a[i].name.substring(11, 14),
      ";",
      parseInt(id),
      ";",
      a[i].name.substring(15, a[i].name.lastIndexOf("-"))
    );
    console.log("--------");
    console.log(
      chanel.substring(0, 3),
      ";",
      parseInt(a[i].name.substring(0, 10)),
      ";",
      chanel.substring(4, chanel.lenght)
    );
    console.log("--------------------------");*/
    if (
      a[i].name.substring(11, 14) == chanel.substring(0, 3) &&
      parseInt(id) <= parseInt(a[i].name.substring(0, 10)) &&
      parseInt(id) + 20 >= parseInt(a[i].name.substring(0, 10)) &&
      a[i].name.substring(15, a[i].name.lastIndexOf("-")) ==
        chanel.substring(4, chanel.lenght)
    ) {
      sw = 1;
      download.push(`/monitor/${a[i].name}`);
    }
  }
  //si se encontro el archivo, se empaque los 2 (in,out) en un zip para descargarlo en el navegador
  //otra forma de descargar, pero los navegadores solo admiten un archivo a la vez res.download(download[0]);
  if (sw == 1) {
    res.send(download);
  } else {
    return next(new Error(`Audio not found`));
  }
});

api.post("/ListarHistorialByFechaBySipsAndIaxs", async (req, res, next) => {
  const params = req.body;
  //obtengo todos los atributos de la tabla cdrs ordenados por fecha
  const cdrsAll = await Cdr.findAllOrder();
  let gethistorial = [];
  //empiezo a iterar sobre todos los atributos de cdrs ordenados por fecha
  cdrsAll.forEach((obj) => {
    //transformo el obj.calldate en un formato "yyyy-mm-dd" y pregunto si es igual al parametro q le mando por postman
    if (moment(moment(obj.start).format("YYYY-MM-DD")).isSame(params.fecha)) {
      //preguntamos si el numero es igual al numero que nos envian por postman
      if (obj.src == params.numero) {
        //guardamos los numeros en un vector(vector con objetos)
        gethistorial.push({
          numero: `${obj.dst}`,
          estado: `${obj.disposition}`,
          fechayhora: `${obj.start}`,
          tipo: "saliente",
        });
      }
      //preguntamos si el numero es igual al numero que nos envian por postman
      if (obj.dst == params.numero) {
        //guardamos los numeros en un vector(vector con objetos)
        gethistorial.push({
          numero: `${obj.src}`,
          estado: `${obj.disposition}`,
          fechayhora: `${obj.start}`,
          tipo: "entrante",
        });
      }
    }
  });
  //devolvemos el vector con objetos dentro
  res.send(gethistorial);
});

api.post("/ListarHistorialBetweenFechas", async (req, res, next) => {
  const params = req.body;
  //obtengo todos los atributos de la tabla cdrs ordenados por fecha
  const cdrsAll = await Cdr.findAllOrder();
  let gethistorial = [];
  //empiezo a iterar sobre todos los atributos de cdrs
  cdrsAll.forEach((obj) => {
    //transformo el obj.start en un formato "yyyy-mm-dd" y pregunto si es igual al parametro q le mando por postman
    if (
      moment(moment(obj.start).format("YYYY-MM-DD")).isBetween(
        params.fecha1,
        params.fecha2
      )
    ) {
      //preguntamos si el numero es igual al numero que nos envian por postman
      if (obj.src == params.numero) {
        //guardamos los numeros en un vector(vector con objetos)
        gethistorial.push({
          numero: `${obj.dst}`,
          estado: `${obj.disposition}`,
          fechayhora: `${obj.start}`,
          tipo: "saliente",
        });
      }
    }
    if (
      moment(moment(obj.start).format("YYYY-MM-DD")).isBetween(
        params.fecha1,
        params.fecha2
      )
    ) {
      //preguntamos si el numero es igual al numero que nos envian por postman
      if (obj.dst == params.numero) {
        //guardamos los numeros en un vector(vector con objetos)
        gethistorial.push({
          numero: `${obj.src}`,
          estado: `${obj.disposition}`,
          fechayhora: `${obj.start}`,
          tipo: "entrante",
        });
      }
    }
  });
  //devolvemos el vector con objetos dentro
  res.send(gethistorial);
});

api.post("/ListarHistorialBySipsAndIaxs", async (req, res, next) => {
  const params = req.body;
  //obtengo todos los atributos de la tabla cdrs ordenado por fechas
  const cdrsAll = await Cdr.findAllOrder();
  let gethistorial = [];
  //empiezo a iterar sobre todos los atributos de cdrs para las llamadas
  cdrsAll.forEach((obj) => {
    //preguntamos si el numero es igual al numero que nos envian por postman
    if (obj.src == params.numero) {
      //guardamos los numeros en un vector(vector con objetos)
      gethistorial.push({
        numero: `${obj.dst}`,
        estado: `${obj.disposition}`,
        fechayhora: `${obj.start}`,
        tipo: "saliente",
        segundos: `${obj.duration}`,
        milisegundos: `${obj.billsec}`,
        uniqueid: `${obj.uniqueid}`,
        channel: `${obj.channel}`,
      });
    }
    //preguntamos si el numero es igual al numero que nos envian por postman
    if (obj.dst == params.numero) {
      //guardamos los numeros en un vector(vector con objetos)
      gethistorial.push({
        numero: `${obj.src}`,
        estado: `${obj.disposition}`,
        fechayhora: `${obj.start}`,
        tipo: "entrante",
        segundos: `${obj.duration}`,
        milisegundos: `${obj.billsec}`,
        uniqueid: `${obj.uniqueid}`,
        channel: `${obj.channel}`,
      });
    }
  });
  //devolvemos el vector con objetos dentro
  res.send(gethistorial);
});

/// AGENDA /////////////////////////////////////////////////////////////////////

api.post("/addAgenda", async (req, res, next) => {
  const params = req.body;
  let obj;
  //creo una agenda apartir del id de un usuario
  try {
    obj = await Agenda.create(params.usuarioId, {
      numero: params.numero,
      nombre: params.nombre,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

/*api.post("/addAgendaDialpad", async (req, res, next) => {
  const params = req.body;
  let obj;
  //creo una agenda apartir del id de un usuario
  try {
    obj = await Agenda.createWhithoutIdUsu({
      contactos: params.contactos,
      nombre: params.nombre,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});*/

api.put("/updateAgenda", async (req, res, next) => {
  const params = req.body;
  //edito cualquier atributo de de la tabla Agenda buscando por el id de la Agenda
  let obj;
  try {
    obj = await Agenda.update(params.id, {
      numero: params.numero,
      nombre: params.nombre,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.get("/findAllAgenda", async (req, res, next) => {
  let obj;
  //busco y devuelvo todos los atributos de la tabla Agenda
  try {
    obj = await Agenda.findAll();
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/ListarContactos", async (req, res, next) => {
  const params = req.body;
  //Obtengo todos los contactos de agenda. A todos los usuarios, sips e iaxs
  const AgendaAll = await Agenda.findAllOrder();
  const usuarioAll = await Usuario.findAll();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let getnumero = [];
  let getnombre = [];
  let getusuarios = [];
  let getidusu = [];
  let getiaxs = [];
  let getsips = [];
  let getidagenda = [];
  let getidagendaN = [];
  let todos = [];

  //obtengo los contactos de la tabla Agenda
  AgendaAll.forEach((obj) => {
    if (obj.usuarioId == params.usuarioId) {
      getnumero.push(obj.numero);
      getnombre.push(obj.nombre);
      getidagenda.push(obj.id);
    }
    if (obj.nombre != null && params.usuarioId == obj.usuarioId) {
      getusuarios.push(obj.nombre);
      getsips.push(obj.numero);
      getidagendaN.push(obj.id);
    }
  });

  getnumero.forEach((algo) => {
    sipsAll.forEach((obj) => {
      if (algo == obj.name) {
        getidusu.push(obj.usuarioId);
        getsips.push(obj.name);
      }
    });
  });

  getnumero.forEach((algo) => {
    iaxsAll.forEach((obj) => {
      if (algo == obj.name) {
        getidusu.push(obj.usuarioId);
        getiaxs.push(obj.name);
      }
    });
  });

  getidusu.forEach((algo2) => {
    usuarioAll.forEach((obj) => {
      if (obj.id == algo2) {
        getusuarios.push(obj.nombre);
      }
    });
    //getusuarios = [];
  });

  todos.push(getidagenda);
  todos.push(getusuarios);
  todos.push(getsips);
  //todos.sort();
  res.send(todos);
});

api.delete("/deleteAgenda", async (req, res, next) => {
  const params = req.body;
  //borro una genda apartir del id de agenda
  await Agenda.destroy(params.id);
  res.send({ message: "se borro la Agenda" });
});

/// IAX /////////////////////////////////////////////////////////////////////

api.post("/addIax", async (req, res, next) => {
  const params = req.body;
  //creo un iax apartir del id del usuario, con todos sus atributos
  let obj;
  try {
    obj = await Iax.create(params.usuarioId, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      switchiaxs: params.switchiaxs,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.put("/updateIax", async (req, res, next) => {
  const params = req.body;
  //edito el iax aportir del id de iax, con todos sus atributos
  let obj;
  try {
    obj = await Iax.update(params.id, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      switchiaxs: params.switchiaxs,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdIax", async (req, res, next) => {
  const params = req.body;
  let obj;
  //busco un iax apartir del id del iax
  try {
    obj = await Iax.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Iax not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllIax", async (req, res, next) => {
  let obj;
  //busco y listo todos los iaxs
  try {
    obj = await Iax.findAll();
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.delete("/deleteIax", async (req, res, next) => {
  const params = req.body;
  //borro todos los iaxs a partir del id del iax
  await Iax.destroy1(params.id);
  res.send({ message: "se borro el iax" });
});

/// QUEUE /////////////////////////////////////////////////////////////////////

api.post("/addQueue", async (req, res, next) => {
  const params = req.body;
  //creo un queue apartir del id de la sala, con todos sus atributos
  let obj;
  try {
    obj = await Queue.create(params.salaId, {
      name: params.name,
      musicclass: params.musicclass,
      strategy: params.strategy,
      timeout: params.timeout,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.put("/updateQueue", async (req, res, next) => {
  const params = req.body;
  //edito el queue aportir del id de queue, con todos sus atributos
  let obj;
  try {
    obj = await Queue.update(params.id, {
      name: params.name,
      musicclass: params.musicclass,
      strategy: params.strategy,
      timeout: params.timeout,
    });
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.post("/findByIdQueue", async (req, res, next) => {
  const params = req.body;
  let obj;
  //busco un queue apartir del id del queue
  try {
    obj = await Queue.findById(params.id);
  } catch (e) {
    return next(e);
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Queue not found with id ${params.id}`));
  }

  res.send(obj);
});

api.get("/findAllQueue", async (req, res, next) => {
  let obj;
  //busco y listo todos los queues
  try {
    obj = await Queue.findAll();
  } catch (e) {
    return next(e);
  }

  res.send(obj);
});

api.delete("/deleteQueue", async (req, res, next) => {
  const params = req.body;
  //borro todos los queues a partir del id del queue
  await Queue.destroy(params.id);
  res.send({ message: "se borro el queue" });
});

//api para parsear datos de flespi a geojson y enviar a front
api.get("/flespiParse", async (req, res, next) => {
  const options = {
    method: "GET",
    url: `https://flespi.io/gw/channels/30789/messages?data=%7B%22limit_count%22%3A100%2C%22limit_size%22%3A100000000%7D`,
    json: true,
    headers: {
      Authorization:
        "FlespiToken bxuB94VMd5VIn00dN5YVib943aluouOpP6OO0zr1saAD0oGBhskqtikkitEuLgHr",
    },
  };

  let data;
  try {
    data = await request(options);
  } catch (e) {
    return next(new Error(`token expiration`));
  }
  let data2 = await geojson.parse(data, {
    Point: ["position.latitude", "position.longitude"],
  });

  let result = [],
    result2 = [];
  console.log(data);
  console.log(data2.result);
  data2.properties.result.forEach((obj) => {
    if (
      obj["position.latitude"] != undefined &&
      obj["position.longitude"] != undefined
    ) {
      result.push(obj["position.longitude"], obj["position.latitude"]);
      result2.push(result);
      result = [];
    }
  });
  //console.log(result2);

  res.send(result2);
});
module.exports = api;
//moment(m.createdAt).format("YYYY-MM-DD")
