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
const mime = require('mime');
const path = require('path')

//Notificaion 
const FCM = require('fcm-node')

const config = require('./config')

const api = asyncify(express.Router())

const moment = require("moment")

var shell = require('shelljs')


//parseado a json todos los bodys
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

let services, Cdr, Extension, Iax, Queue, Sala, Sip, Usuario, Voicemail, Agenda

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Agenda = services.Agenda
    Cdr = services.Cdr
    Extension = services.Extension
    Iax = services.Iax
    Queue = services.Queue
    Sala = services.Sala
    Sip = services.Sip
    Usuario = services.Usuario
    Voicemail = services.Voicemail


  }
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-Key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
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
    //Numero para conferencia, numero al llamar exten:3, sala conferencia, appdata:3
    const obj110 = await Extension.create(obj.id, {
      context: "default",
      exten: "3",
      priority: 1,
      app: "answer",
      appdata: ""
    })
    const obj111 = await Extension.create(obj.id, {
      context: "default",
      exten: "3",
      priority: 2,
      app: "confbridge",
      appdata: "3"
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
  //creamos una sala con todos sus atributos
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
  //editamos cualquier atriburo de una sala buscandolo por su id
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
  //buscamos un sala por su id y devolvemos esa sala
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
  //buscamos y devolvemos a todas las salas
  const obj = await Sala.findAll()

  res.send(obj)
})

api.post('/getUsuariosPorSala', async (req, res, next) => {
  var params = req.body
  //obtenemos todos los usuarios
  const usuariosTodos = await Usuario.findAll();
  var usuariosSala = []
  //iteramos a todos los usuario y preguntamos si la sala de un usuario es igual a la q le mandamos por postman
  //si es asi guardamos al usuario y lo devolvemos
  usuariosTodos.forEach(usuario => {
            
          if(usuario.salaId == params.salaId){
             usuariosSala.push(usuario)
          }
  })
  res.send(usuariosSala)
});

api.delete('/deleteSalaWithAll', async(req, res, next) => {
  const params = req.body 
  //obtenemos todos los usuarios, sips e iaxs con sus atributos
  const usuariosSala1 = await Usuario.findAll();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let usuariosSala2 = []
  //itero sobre el usuario y obtenemos los usuarios por su id         
  usuariosSala1.forEach(usuario => {
            
    if(usuario.salaId == params.salaId){
       usuariosSala2.push(usuario.id)
    }
  })
  //iteramos a todos los usuarios y borramos su sip de un usuario
  for (let i = 0; i < usuariosSala2.length; i++) {
    sipsAll.forEach(obj => {
      
      if(obj.usuarioId == usuariosSala2[i]){
        Sip.destroy(obj.usuarioId)
    }
    })
  } 
  //iteramos a todos los ususarios y borramos sus iaxs de un usuario
  for (let i = 0; i < usuariosSala2.length; i++) {
    iaxsAll.forEach(obj => {
      
      if(obj.usuarioId == usuariosSala2[i]){
        Iax.destroy(obj.usuarioId)
    }
    })
  } 
  //iteramos a todos los usuarios y borramos al usuario de una sala
  for (let i = 0; i < usuariosSala2.length; i++) {
    await Usuario.destroy(usuariosSala2[i])
  }
  //borramos la sala 
  await Sala.destroy(params.salaId)

  res.send({message : 'se borro la sala'})
   
})

/// USUARIO /////////////////////////////////////////////////////////////////////

api.post('/addUsuario', async (req, res, next) => {
  const params = req.body
  //creamos un usuario con todos sus atributos atraves del id de la sala 
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
  //editamos un usuario atraves de su id
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
  //buscamos al usuario atraves de su id y lo devolvemos
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
  //buscamos y devolvemos a todos los usuarios
  try{
    obj= await Usuario.findAll()
  }catch(e){
    return next(e)
  }
  
  res.send(obj)
})

api.post('/findUsuByNomSalaAndContext', async (req, res, next) => {
  var params = req.body
  //Obtengo todos los sips e iaxs
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let results = {}
  //iteramos sobre los sips y preguntamos si el atributo contexto es igual al contexto q enviamos por postman
  //si es igual guardamos sus sips e iaxs en results y luego vaciamos el vector results       
  for (let i = 0; i < sipsAll.length; i++) {
    if(sipsAll[i]["context"] == params.context){
       results[sipsAll[i]['usuarioId']] = {}
       results[sipsAll[i]['usuarioId']]["sips"] = []
       results[sipsAll[i]['usuarioId']]["iaxs"] = []
    }  
  } 
  //iteramos sobre los iaxs y preguntamos si el atributo contexto es igual al contexto q enviamos por postman
  //si es igual guardamos sus sips e iaxs en results y luego vaciamos el vector results   
  for (let i = 0; i < iaxsAll.length; i++) {
    if(iaxsAll[i]["context"] == params.context){
       results[iaxsAll[i]['usuarioId']] = {}
       results[iaxsAll[i]['usuarioId']]["sips"] = []
       results[iaxsAll[i]['usuarioId']]["iaxs"] = []
    }  
  } 
  //iteramos sobre los sips y preguntamos si el atributo contexto es igual al contexto q enviamos por postman
  //si es igual guardamos sus id del usuario en results  
  for (let i = 0; i < sipsAll.length; i++) {
    if(sipsAll[i]["context"] == params.context){
        let x = results[sipsAll[i]['usuarioId']]["sips"]
        results[sipsAll[i]['usuarioId']]["sips"].push(sipsAll[i]['id']) 
     }  
  }   
  //iteramos sobre los iaxs y preguntamos si el atributo contexto es igual al contexto q enviamos por postman
  //si es igual guardamos sus id del usuario en results 
  for (let i = 0; i < iaxsAll.length; i++) {
    if(iaxsAll[i]["context"] == params.context){
        let x = results[iaxsAll[i]['usuarioId']]["iaxs"]
        results[iaxsAll[i]['usuarioId']]["iaxs"].push(iaxsAll[i]['id']) 
     }  
  }    
    res.send(results)
    
});

api.post('/getUsuariosWithSipsAndIaxs', async(req, res, next) => {
  const params = req.body 
  //Obtengo todos los sips e iaxs
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let getsips = []
  let getiaxs = []
  let todos = []
    //itero sobre los sips e iaxs 
    sipsAll.forEach(obj => {
      
      if(obj.usuarioId == params.id){
        getsips.push(obj)
    }
    })
    iaxsAll.forEach(obj => {
      
      if(obj.usuarioId == params.id){
        getiaxs.push(obj)
    }
    })
    //obtenemos los sips e iaxs de un usuario apartir de su id de usuario
    todos.push(getsips)
    todos.push(getiaxs)
  res.send(todos)
   
})

api.delete('/deleteUsuarioWithAll', async(req, res, next) => {
  const params = req.body 
  //Obtengo todos los usuario de la tabla usuarios. A todos sips e iaxs
  const usuariosSala1 = await Usuario.findAll();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let usuariosSala3 = []
  //iteramos toda la tabla usuario para obtener el id del usuario y guardarlo en un vector         
  usuariosSala1.forEach(usuario => {
            
    if(usuario.id == params.id){
       usuariosSala3.push(usuario.id)
    }
  })
  //recorremos el vector con los ids de los usuarios y borramos sus sips iaxs
  for (let i = 0; i < usuariosSala3.length; i++) {
    sipsAll.forEach(obj => {
      
      if(obj.usuarioId == usuariosSala3[i]){
        Sip.destroy1(obj.id)
    }
    })
  } 
  
  for (let i = 0; i < usuariosSala3.length; i++) {
    iaxsAll.forEach(obj => {
      
      if(obj.usuarioId == usuariosSala3[i]){
        Iax.destroy1(obj.id)
    }
    })
  } 
  //borramos al usuario apartir de su id
  await Usuario.destroy(params.id)
  res.send({message: 'Se elimino Usuario'})   
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
  //creo un sip con todos sus atributos apartir del id del usuario
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

api.post('/addSipWebRtc', async (req, res, next) => {
  const params = req.body
  //creo un sip con todos sus atributos apartir del id del usuario
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
      nat: params.nat,

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
      dtlscafile: params.dtlscafile ,
      dtlssetup: params.dtlssetup,
      rtcp_mux: params.rtcp_mux
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})
api.put('/updateSip', async (req, res, next) => {
  const params = req.body
  //edito un sip buscandolo por su id
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
  //obtebgo un sip buscondolo por el id del sip
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
  //busco y devuelvo todos los atributos de la tabla sip
  try{
    obj= await Sip.findAll()
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.get('/findLastSip', async (req, res, next) => {
  var params = req.body
  //busco y listo el ultimo sip de la tabla ordenandolo descendentemente
  const lastSip = await Sip.findOne(
    {
      order: [ [ 'id', 'DESC' ]],
    }
  );
  
    res.send(lastSip)
});

api.delete('/deleteSip', async(req, res, next) => {
  const params = req.body
  //borro un sip apartir del id del sip
  await Sip.destroy1(params.id)
 
  res.send({message: 'se borro el sip'})
})
/// EXTENSION /////////////////////////////////////////////////////////////////////

api.post('/addExtension', async (req, res, next) => {
  const params = req.body
  //creo una extension con todos sus atributos
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
  //edito cualquier atributo de de la tabla extension buscando por el id de la extension
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
  //busco y devuelvo todos los atributos de la tabla extension buscando por el id de extension
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
  //busco y devuelvo todos los atributos de la tabla extension
  try{
    obj= await Extension.findAll()
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.post('/findAllExtensionByIVR', async (req, res, next) => {
  const params = req.body 
  //obtengo todos los atributos de la tabla cdrs
  const extensionsAll = await Extension.findAll();
  let getcontextos = []
  extensionsAll.forEach(obj => {
      if (obj.context == params.context){
        getcontextos.push(obj)
      }
  })

  res.send(getcontextos)
})

/// CDR /////////////////////////////////////////////////////////////////////

api.get('/findAllCdr', async (req, res, next) => {
  //busco y devuelvo todos los atributos de la tabla cdrs
  const obj = await Cdr.findAll()
  res.send(obj)
})

api.post('/findByIdCdr', async (req, res, next) => {
  const params = req.body
  //busco los cdrs apartir de su id de cdr
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

api.get('/download', function(req, res, next){

  var file = __dirname + '/upload/monitor/1577308526-SIP-7001-00000000-in.wav';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.on("error",(e)=>{
    if(e.code == "ENOENT"){
      console.log("404")
      //res.status(404).end()
      return next(e)
    }
    console.log("500")
    res.status(500).end()
  })
  console.log("200")
  filestream.pipe(res);
});

api.post('/listar', function(req, res, next){
  const params = req.body
  var id=params.id
  var chanel=params.channel
  let a=[]
  let download=[]
  a=shell.ls('-l',`${__dirname}/upload/monitor`)
  //console.log(a)
  //console.log(a.length)
  for (let i = 0; i < a.length; i++) {
    //console.log(a[i].name)
    //console.log(a[i].name.substring(0,10))
    if((a[i].name.substring(11,14)==chanel.substring(0,3)) && (parseInt(id) <= parseInt(a[i].name.substring(0,10)) && (parseInt(id)+5) >= parseInt(a[i].name.substring(0,10))) && (a[i].name.substring(15,28)==chanel.substring(4,18))){
      //console.log("si")
      download.push(`/var/spool/asterisk/monitor/${a[i].name}`)
    }
  }
  //console.log(download)
  for (let i = 0; i < download.length; i++) {
    //res.download(download[i]);
    //console.log(i)
  }
  res.download(download[1]);
  //setTimeout(res.download(download[1]), 1000);
  //res.download("/var/spool/asterisk/monitor/1577308318-SIP-7001-00000006-out.wav");
  //res.send("obj")
});

api.post('/ListarHistorialByFechaBySipsAndIaxs', async(req, res, next) => {
  const params = req.body 
  //obtengo todos los atributos de la tabla cdrs
  const cdrsAll = await Cdr.findAll();
  let getentrantes = [];
  let getsalientes = [];
  let getperdidas = [];
  let todos = [];
  //empiezo a iterar sobre todos los atributos de cdrs
  cdrsAll.forEach(obj => {
    //transformo el obj.calldate en un formato "yyyy-mm-dd" y pregunto si es igual al parametro q le mando por postman
    if(moment(moment(obj.calldate).format("YYYY-MM-DD")).isSame(params.fecha)){
        if(obj.src == params.numero){
            getsalientes.push(obj.dst)
            getperdidas.push(obj.disposition)
        }
        if (obj.dst == params.numero){
          getentrantes.push(obj.src)
          getperdidas.push(obj.disposition)
        }
    }  
  })
    //guardo todos los atributos q necesito devolver
    todos.push(getentrantes)
    todos.push(getsalientes)
    todos.push(getperdidas)
  res.send(todos)
  
})

api.post('/ListarHistorialBetweenFechas', async(req, res, next) => {
  const params = req.body 
  //obtengo todos los atributos de la tabla cdrs
  const cdrsAll = await Cdr.findAll();
  let getentrantes = [];
  let getsalientes = [];
  let getperdidas = [];
  let todos = [];
  //empiezo a iterar sobre todos los atributos de cdrs
  cdrsAll.forEach(obj => {
    //transformo el obj.calldate en un formato "yyyy-mm-dd" y pregunto si es igual al parametro q le mando por postman
    if(moment(moment(obj.calldate).format("YYYY-MM-DD")).isBetween(params.fecha1,params.fecha2)){
      if(obj.src == params.numero){
          getsalientes.push(obj.dst)
          getperdidas.push(obj.disposition)
      }
    }  
  })

  cdrsAll.forEach(obj => {
    //transformo el obj.calldate en un formato "yyyy-mm-dd" y pregunto si es igual al parametro q le mando por postman
    if(moment(moment(obj.calldate).format("YYYY-MM-DD")).isBetween(params.fecha1,params.fecha2)){
      if (obj.dst == params.numero){
        getentrantes.push(obj.src)
        getperdidas.push(obj.disposition)
      }
  }  
  })
    //guardo todos los atributos q necesito devolver
    todos.push(getentrantes)
    todos.push(getsalientes)
    todos.push(getperdidas)
  res.send(todos)
  
})


api.post('/ListarHistorialBySipsAndIaxs', async(req, res, next) => {
  const params = req.body 
  //obtengo todos los atributos de la tabla cdrs
  const cdrsAll = await Cdr.findAll();
  let getentrantes = [];
  let getsalientes = [];
  let getperdidas = [];
  let getminutos = [];
  let getsegundos = [];
  let todos = [];
  //empiezo a iterar sobre todos los atributos de cdrs para las llamadas salientes
  cdrsAll.forEach(obj => {
      if(obj.src == params.numero){
        getsalientes.push(obj.dst)
        getperdidas.push(obj.disposition)
        getminutos.push(obj.duration)
        getsegundos.push(obj.billsec)
      }
  })
  //empiezo a iterar sobre todos los atributos de cdrs para las llamadas entrantes
  cdrsAll.forEach(obj => {
    if (obj.dst == params.numero){
      getentrantes.push(obj.src)
      getperdidas.push(obj.disposition)
      getminutos.push(obj.duration)
      getsegundos.push(obj.billsec)
    }
})
  //guardo todos los atributos q necesito devolver
    todos.push(getentrantes)  
    todos.push(getsalientes)
    todos.push(getperdidas)
    todos.push(getminutos)
    todos.push(getsegundos)
  res.send(todos)
})

/// AGENDA /////////////////////////////////////////////////////////////////////

api.post('/addAgenda', async (req, res, next) => {
  const params = req.body
  let obj
  //creo una agenda apartir del id de un usuario
  try{
    obj= await Agenda.create(params.usuarioId, {
      Contactos: params.Contactos
    })
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.post('/ListarContactos', async(req, res, next) => {
  const params = req.body 
  //Obtengo todos los contactos de agenda. A todos los usuarios, sips e iaxs
  const AgendaAll = await Agenda.findAll();
  const usuarioAll = await Usuario.findAll();
  const sipsAll = await Sip.findAll();
  const iaxsAll = await Iax.findAll();
  let getcontactos = [];
  let getusuarios = [];
  let getiaxs = [];
  let getsips = [];
  let todos = [];
  let todos2 = [];
//obtengo los contactos de la tabla Agenda
  AgendaAll.forEach(obj => {
     if(obj.usuarioId == params.usuarioId){
      getcontactos.push(obj.Contactos)
    }
  })
//empiezo a iterar sobre todos los contactos de un usuario
getcontactos.forEach(contacto => {
        
  usuarioAll.forEach(usuario => {
    if(usuario.id == contacto){
      getusuarios.push(usuario.nombre, usuario.apPaterno, usuario.apMaterno)
    }
    
  })
  
  sipsAll.forEach(sips => {
    
    if(sips.usuarioId == contacto){
      getsips.push(sips.name)
    }
  })

  iaxsAll.forEach(iaxs => {
    
    if(iaxs.usuarioId == contacto){
      getiaxs.push(iaxs.name)
    }
  })
  //guardo todos los usuarios, sips e iaxs
  todos.push(getusuarios)
  todos.push(getsips)
  todos.push(getiaxs)
  
  todos2.push(todos)
  //vacio los vectores de usuarios, sips e iaxs
  getusuarios=[]
  getsips=[]
  getiaxs=[]
  todos=[]
  
})
  res.send(todos2)
})

api.delete('/deleteAgenda', async(req, res, next) => {
  const params = req.body
  //borro una genda apartir del id de agenda
  await Agenda.destroy(params.id)
  res.send({message: 'se borro la Agenda'})
})


/// IAX /////////////////////////////////////////////////////////////////////

api.post('/addIax', async (req, res, next) => {
  const params = req.body
  //creo un iax apartir del id del usuario, con todos sus atributos
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
  //edito el iax aportir del id de iax, con todos sus atributos
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
  //busco un iax apartir del id del iax
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
  //busco y listo todos los iaxs
  try{
    obj= await Iax.findAll()
  }catch(e){
    return next(e)
  }

  res.send(obj)
})

api.delete('/deleteIax', async(req, res, next) => {
  const params = req.body
  //borro todos los iaxs a partir del id del iax
  await Iax.destroy1(params.id)
  res.send({message: 'se borro el iax'})
})
module.exports = api
//moment(m.createdAt).format("YYYY-MM-DD")