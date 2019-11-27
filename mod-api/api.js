'use strict'

const debug = require('debug')('mod:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
//const guard = require('express-jwt-permissions')()
const db = require('mod-db')
//const request = require('request-promise-native')
var bodyParser = require('body-parser')

const multipart = require('connect-multiparty')
const md_upload = multipart({ uploadDir: './uploads/product' })

const fs = require('fs')
const path = require('path')

//Notificaion 
const FCM = require('fcm-node')

const config = require('./config')

const api = asyncify(express.Router())

const moment = require("moment")

//parseado a json todos los bodys
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

let services, Cdr, Extension, Iax, Queue, Sala, Sip, Usuario, Voicemail

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Cdr = services.Cdr
    Extension = services.Extension
    Iax = services.Iax
    Queue = services.Queue
    Sala = services.Sala
    Sip = services.Sip
    Usuario = services.Usuario
    Voicemail = services.Voicemail


  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

api.get('/datosPrueba', async (req, res) => {
  var HoraYFecha = new Date()
  console.log(HoraYFecha)
  const obj = await Sala.create({ 
    nombreSala: "default",
    descripcion: "sala por default"
  })
  //Usuario1
  const obj2 = await Usuario.create(obj.id, {
    nombre: "nombre",
    apPaterno: "paterno",
    apMaterno: "materno",
    tipo: "standard",
    direccion: "direccion1234",
    telefono: "123456",
    correo: "usuario@usuario",
    password: "1234",
    conectado: false
  })
  const obj21 = await Sip.create(obj2.id, {
    name: "7001",
    secret: "7001",
    callerid: "7001",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify:"yes",
    nat:"force_rport,comedia"
  })
  //WEBRTC para usuario 1
  const obj22 = await Sip.create(obj2.id, {
    name: "7010",
    secret: "7010",
    callerid: "7010 <7010>",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify:"yes",
    nat:"force_rport,comedia",

    qualifyfreq:"60",
    deny:"0.0.0.0/0.0.0.0",
    dtnfnode:"rfc2833",
    canreinvite:"no" ,
    trustrpid:"yes",
    sendrpid:"no" ,
    transport:"udp,ws,wss",
    avpf:"yes" ,
    force_avp:"yes" ,
    icesupport:"yes" ,
    encryption:"yes" ,
    callgroup:"",
    pickupgroup:"",
    dial:"SIP/7010",
    permit:"0.0.0.0/0.0.0.0",
    callcounter:"yes" ,
    faxdetect:"no" ,
    directmedia:"no",
    dtlsenable:"yes" ,
    dtlsverify:"fingerprint",
    dtlscertfile:"/etc/asterisk/keys/asterisk.pem",
    dtlscafile:"/etc/asterisk/keys/ca.crt" ,
    dtlssetup:"actpass",
    rtcp_mux:"yes"
  })
  //VOICEMAIL PARA 7001
  const obj23 = await Voicemail.create(obj2.id, {
    uniqueid:"1",
    customer_id:"1",
    context:"default",
    mailbox:"7001",
    password:"1234",
    fullname:"Nombre y apellido",
    email:"edson.anawaya@patelecomsrl.com",
    pager:"",
    tz:"central",
    attach:"yes",
    saycid:"no",
    dialout:"",
    callback:"",
    review:"no",
    operator:"no",
    envelope:"no",
    sayduration:"no",
    saydurationm:1,
    sendvoicemail:"no",
    delete:"no",
    nextaftercmd:"yes",
    forcename:"no",
    forcegreetings:"no",
    hidefromdir:"no",
    stamp:HoraYFecha
  })
  //Usuario2
  const obj3 = await Usuario.create(obj.id, {
    nombre: "2nombre",
    apPaterno: "2paterno",
    apMaterno: "2materno",
    tipo: "standard",
    direccion: "2direccion1234",
    telefono: "22123456",
    correo: "usuario2@usuario2",
    password: "1234",
    conectado: false
  })
  const obj31 = await Sip.create(obj3.id, {
    name: "7002",
    secret: "7002",
    callerid: "7002",
    type: "friend",
    context: "default",
    host: "dynamic",
    disallow: "all",
    allow: "ulaw",
    qualify:"yes",
    nat:"force_rport,comedia"
  })
    //WEBRTC para usuario 1
    const obj33 = await Sip.create(obj2.id, {
      name: "7011",
      secret: "7011",
      callerid: "7011 <7011>",
      type: "friend",
      context: "default",
      host: "dynamic",
      disallow: "all",
      allow: "ulaw",
      qualify:"yes",
      nat:"force_rport,comedia",
      
      qualifyfreq:"60",
      deny:"0.0.0.0/0.0.0.0",
      dtnfnode:"rfc2833",
      canreinvite:"no" ,
      trustrpid:"yes",
      sendrpid:"no" ,
      transport:"udp,ws,wss",
      avpf:"yes" ,
      force_avp:"yes" ,
      icesupport:"yes" ,
      encryption:"yes" ,
      callgroup:"",
      pickupgroup:"",
      dial:"SIP/7011",
      permit:"0.0.0.0/0.0.0.0",
      callcounter:"yes" ,
      faxdetect:"no" ,
      directmedia:"no",
      dtlsenable:"yes" ,
      dtlsverify:"fingerprint",
      dtlscertfile:"/etc/asterisk/keys/asterisk.pem",
      dtlscafile:"/etc/asterisk/keys/ca.crt" ,
      dtlssetup:"actpass",
      rtcp_mux:"yes"
    })
  //VOICEMAIL PARA 7002
  const obj32 = await Voicemail.create(obj2.id, {
    uniqueid:"1",
    customer_id:"1",
    context:"default",
    mailbox:"7002",
    password:"1234",
    fullname:"Nombre y apellido",
    email:"otro@patelecomsrl.com",
    pager:"",
    tz:"central",
    attach:"yes",
    saycid:"no",
    dialout:"",
    callback:"",
    review:"no",
    operator:"no",
    envelope:"no",
    sayduration:"no",
    saydurationm:1,
    sendvoicemail:"no",
    delete:"no",
    nextaftercmd:"yes",
    forcename:"no",
    forcegreetings:"no",
    hidefromdir:"no",
    stamp:HoraYFecha
  })
  
  //Añade 201 para demo-congrats
  const obj4 = await Extension.create(obj.id, {
    context: "default",
    exten: "201",
    priority: "1",
    app: "Playback",
    appdata: "demo-congrats"
  })
  const obj41 = await Extension.create(obj.id, {
    context: "default",
    exten: "201",
    priority: "2",
    app: "hangup",
    appdata: ""
  })
  //Añade para que puedan llamarse entre los 7XXX
  const obj5 = await Extension.create(obj.id, {
    context: "default",
    exten: "_7XXX",
    priority: "1",
    app: "Monitor",
    appdata: "wav,,b"
  })
  const obj51 = await Extension.create(obj.id, {
    context: "default",
    exten: "_7XXX",
    priority: "2",
    app: "Dial",
    appdata: "SIP/${EXTEN},10,Ttr"
  })
  const obj52 = await Extension.create(obj.id, {
    context: "default",
    exten: "_7XXX",
    priority: "3",
    app: "hangup",
    appdata: ""
  })
  //VOICEMAIL
  const obj53 = await Extension.create(obj.id, {
    context: "default",
    exten: "_70XX",
    priority: "3",
    app: "VoiceMail",
    appdata: "${EXTEN}@default"
  })
  //CONSULTAR VOICEMAIL
  const obj54 = await Extension.create(obj.id, {
    context: "default",
    exten: "_*0",
    priority: "1",
    app: "VoiceMailMain",
    appdata: "${CALLERID(num)}@default"
  })
  //RECORD AUDIOS PARA IVR
  const obj55 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "1",
    app: "Answer",
    appdata: ""
  })
  const obj56 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "2",
    app: "Wait",
    appdata: "0.5"
  })
  const obj57 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "3",
    app: "Record",
    appdata: "/tmp/soundsasterisk/recordejemplo.gsm"
  })
  const obj58 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "4",
    app: "Wait",
    appdata: "1"
  })
  const obj59 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "5",
    app: "Playback",
    appdata: "/tmp/soundsasterisk/recordejemplo"
  })
  const obj510 = await Extension.create(obj.id, {
    context: "default",
    exten: "777",
    priority: "6",
    app: "hangup",
    appdata: ""
  })
  //IVR
  const obj61 = await Extension.create(obj.id, {
    context: "default",
    exten: "*500",
    priority: 1,
    app: "Goto",
    appdata: "ivr,s,1"
  })
  const obj62 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "s",
    priority: 1,
    app: "Answer",
    appdata: ""
  })
  const obj63 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "s",
    priority: 2,
    app: "Background",
    appdata: "/tmp/soundsasterisk/ivrejemplo"
  })
  const obj64 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "s",
    priority: 3,
    app: "WaitExten",
    appdata: ""
  })
  //NUMEROS DE IVR
  const obj65 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "1",
    priority: 1,
    app: "Playback",
    appdata: "demo-congrats"
  })
  const obj66 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "2",
    priority: 1,
    app: "Playback",
    appdata: "hello-world"
  })
  const obj67 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "3",
    priority: 1,
    app: "Playback",
    appdata: "tt-monkeys"
  })
  const obj68 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "t",
    priority: 1,
    app: "Playback",
    appdata: "demo-thanks"
  })
  const obj69 = await Extension.create(obj.id, {
    context: "ivr",
    exten: "t",
    priority: 2,
    app: "hangup",
    appdata: ""
  })
  //Calendario de llamadas para horas laborales sino enviar a IVR
  const obj71 = await Extension.create(obj.id, {
    context: "default",
    exten: "8000",
    priority: 1,
    app: "GotoIfTime",
    appdata: "8:30-19:20,mon-fri,*,*?ivr,s,1"
  })
  const obj72 = await Extension.create(obj.id, {
    context: "default",
    exten: "8000",
    priority: 2,
    app: "Playback",
    appdata: "tt-monkeys"
  })
  const obj73 = await Extension.create(obj.id, {
    context: "default",
    exten: "8000",
    priority: 3,
    app: "hangup",
    appdata: ""
  })
  //PARA COLAS DE LLAMADAS, LLAMANDO A ESTE NUMERO SE AÑADE AGENTES PARA RECIBIR LLAMADAS
  const obj81 = await Extension.create(obj.id, {
    context: "default",
    exten: "*201",
    priority: 1,
    app: "AddQueueMember",
    appdata: "support,SIP/${CHANNEL(peername)}"
  })
  const obj82 = await Extension.create(obj.id, {
    context: "default",
    exten: "*201",
    priority: 2,
    app: "Playback",
    appdata: "beep"
  })
  const obj83 = await Extension.create(obj.id, {
    context: "default",
    exten: "*201",
    priority: 3,
    app: "hangup",
    appdata: ""
  })
  //PARA COLAS DE LLAMADAS, LLAMANDO A ESTE NUMERO SE ELIMINA AGENTES PARA RECIBIR LLAMADAS
  const obj91 = await Extension.create(obj.id, {
    context: "default",
    exten: "*202",
    priority: 1,
    app: "RemoveQueueMember",
    appdata: "support,SIP/${CHANNEL(peername)}"
  })
  const obj92 = await Extension.create(obj.id, {
    context: "default",
    exten: "*202",
    priority: 2,
    app: "Playback",
    appdata: "beep"
  })
  const obj93 = await Extension.create(obj.id, {
    context: "default",
    exten: "*202",
    priority: 3,
    app: "hangup",
    appdata: ""
  })
    //AQUI SE LLAMA PARA USAR LAS COLAS DE LLAMADAS (SOPORTE)
    const obj101 = await Extension.create(obj.id, {
      context: "default",
      exten: "*600",
      priority: 1,
      app: "Answer",
      appdata: ""
    })
    const obj102 = await Extension.create(obj.id, {
      context: "default",
      exten: "*600",
      priority: 2,
      app: "Queue",
      appdata: "support,,,,60"
    })
    const obj103 = await Extension.create(obj.id, {
      context: "default",
      exten: "*600",
      priority: 3,
      app: "hangup",
      appdata: ""
    })
  

  res.send({ message: obj, obj2, obj21, obj3,obj31, obj4, obj41, obj5, obj51, obj52,obj53,obj22 });
})

api.get('/datosRoot', async (req, res) => {
  //añade un nuevo root
  const obj = await Sala.create({
    nombreSala: "root",
    descripcion: "sala root"
  })
  const obj2 = await Usuario.create(obj.id,{
    nombre: "root",
    apPaterno: "root",
    apMaterno: "root",
    tipo: "root",
    direccion: "root1234",
    telefono: "654321",
    correo: "root@root",
    password: "1234",
    conectado: false

  })

  res.send({ message: obj, obj2 });
})

api.get('/datosOperador', async (req, res) => {
  //añade un nuevo root
  const obj = await Sala.create({
    nombreSala: "Operador",
    descripcion: "sala Operador"
  })
  const obj2 = await Usuario.create(obj.id,{
    nombre: "Operador",
    apPaterno: "Operador",
    apMaterno: "Operador",
    tipo: "Operador",
    direccion: "Operador123",
    telefono: "789456",
    correo: "operador@operador",
    password: "1234",
    conectado: false

  })

  res.send({ message: obj, obj2 });
})

/// SALA /////////////////////////////////////////////////////////////////////

api.post('/addSala', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Sala.create({
      nombreSala: params.nombreSala,
      descripcion: params.descripcion
  
    })
  }catch(e){
    return next(e)
  }
  
  res.send(obj)
})
api.put('/updateSala', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Sala.update(params.id, {
      nombreSala: params.nombreSala,
      descripcion: params.descripcion
    })
  }catch(e){
    return next(e)
  }
  
  res.send(obj)
})

api.post('/findByIdSala', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Sala.findById(params.id)
  }catch(e){
    return next(e)
  }
  if(!obj || obj.lenght==0){
    return next(new Error(`Sala not found with id ${params.id}`))
  }
  
  res.send(obj)
})

api.get('/findAllSala', async (req, res, next) => {

  const obj = await Sala.findAll()

  res.send(obj)
})

api.post('/getUsuariosPorSala', async (req, res, next) => {
  var params = req.body

  const usuariosTodos = await Usuario.findAll();
  var usuariosSala = []

  usuariosTodos.forEach(usuario => {
            
          if(usuario.salaId == params.salaId){
                 
              usuariosSala.push(usuario)
          }
  })

  res.send(usuariosSala)
});
/// USUARIO /////////////////////////////////////////////////////////////////////

api.post('/addUsuario', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Usuario.create(params.salaId, {
      nombre: params.nombre,
      apPaterno: params.apPaterno,
      apMaterno: params.apMaterno,
      tipo: params.tipo,
      direccion: params.direccion,
      telefono: params.telefono,
      correo: params.correo,
      password: params.password,
      conectado: params.conectado
    })
  }catch(e){
    return next(e)
  }
  
  res.send(obj)
})
api.put('/updateUsuario', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Usuario.update(params.id, {
      nombre: params.nombre,
      apPaterno: params.apPaterno,
      apMaterno: params.apMaterno,
      tipo: params.tipo,
      direccion: params.direccion,
      telefono: params.telefono,
      correo: params.correo,
      password: params.password,
      conectado: params.conectado
    })
  }catch(e){
    return next(e)
  }
  
  res.send(obj)
})

api.post('/findByIdUsuario', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Usuario.findById(params.id)
  }catch(e){
    return next(e)
  }
  
  if(!obj || obj.lenght==0){
    return next(new Error(`Usuario not found with id ${params.id}`))
  }

  res.send(obj)
})

api.get('/findAllUsuario', async (req, res, next) => {

  let obj 
  try{
    obj= await Usuario.findAll()
  }catch(e){
    return next(e)
  }
  
  res.send(obj)
})

//LOGIN
api.post('/login', async(req, res, next) => {
  
  var params = req.body
  var correo = params.correo
  var pass = params.password
  Usuario.findOneCorreo(correo).then(function (result,err){
    if(err)
      {
        res.status(500).send({message: "error al comprobar el usuario"})
      }else{
        if(result)
        { if(pass === result.password)
          {
            res.status(200).send({result})
          }
          else{
            res.status(404).send({message: "error al introducir la contraseña"})
          }
        }
        else{
          res.status(404).send({message: "el usuario no existe"})
        }
      }
  })
  
})

/// SIP /////////////////////////////////////////////////////////////////////

api.post('/addSip', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Sip.create(params.usuarioId, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})
api.put('/updateSip', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Sip.update(params.id, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow,
      qualify: params.qualify,
      nat: params.nat
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.post('/findByIdSip', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Sip.findById(params.id)
  }catch(e){
    return next(e)
  }
  if(!obj || obj.lenght==0){
    return next(new Error(`Sip not found with id ${params.id}`))
  }

  res.send(obj)
})

api.get('/findAllSip', async (req, res, next) => {

  let obj
  try{
    obj= await Sip.findAll()
  }catch(e){
    return next(e)
  }

  res.send(obj)
})


api.get('/findLastSip', async (req, res, next) => {
  var params = req.body

  const lastSip = await Sip.findOne(
    {
      order: [ [ 'id', 'DESC' ]],
    }
  );
  
    res.send(lastSip)
});
/// EXTENSION /////////////////////////////////////////////////////////////////////

api.post('/addExtension', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Extension.create(params.salaId, {
      context: params.context,
      exten: params.exten,
      priority: params.priority,
      app: params.app,
      appdata: params.appdata
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})
api.put('/updateExtension', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Extension.update(params.id, {
      context: params.context,
      exten: params.exten,
      priority: params.priority,
      app: params.app,
      appdata: params.appdata
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.post('/findByIdExtension', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Extension.findById(params.id)
  }catch(e){
    return next(e)
  }
  if(!obj || obj.lenght==0){
    return next(new Error(`Extension not found with id ${params.id}`))
  }
  

  res.send(obj)
})

api.get('/findAllExtension', async (req, res, next) => {

  let obj
  try{
    obj= await Extension.findAll()
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

/// CDR /////////////////////////////////////////////////////////////////////

api.get('/findAllCdr', async (req, res, next) => {

  const obj = await Cdr.findAll()

  res.send(obj)
})

api.post('/findByIdCdr', async (req, res, next) => {
  const params = req.body

  let obj 
  try{
    obj= await Cdr.findById(params.id)
  }catch(e){
    return next(e)
  }
  if(!obj || obj.lenght==0){
    return next(new Error(`Sala not found with id ${params.id}`))
  }
  
  res.send(obj)
})


/// IAX /////////////////////////////////////////////////////////////////////

api.post('/addIax', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Iax.create(params.usuarioId, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.put('/updateIax', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Iax.update(params.id, {
      name: params.name,
      secret: params.secret,
      callerid: params.callerid,
      type: params.type,
      context: params.context,
      host: params.host,
      disallow: params.disallow,
      allow: params.allow
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.post('/findByIdIax', async (req, res, next) => {
  const params = req.body

  let obj
  try{
    obj= await Iax.findById(params.id)
  }catch(e){
    return next(e)
  }
  if(!obj || obj.lenght==0){
    return next(new Error(`Iax not found with id ${params.id}`))
  }

  res.send(obj)
})

api.get('/findAllIax', async (req, res, next) => {

  let obj
  try{
    obj= await Iax.findAll()
  }catch(e){
    return next(e)
  }

  res.send(obj)
})
module.exports = api
