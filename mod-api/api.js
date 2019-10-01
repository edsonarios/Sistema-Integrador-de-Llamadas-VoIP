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
const md_upload = multipart({ uploadDir: './uploads/product'})

const fs = require('fs')
const path = require('path')

//Notificaion
const FCM = require('fcm-node')

const config = require('./config')

const api = asyncify(express.Router())

const moment = require("moment")

//parseado a json todos los bodys
api.use(bodyParser.urlencoded({extended:false}))
api.use(bodyParser.json())

let services, Agent, Metric,Usuario, Invernadero, Controlador, HistorialProducto, HistorialSensor, Pines, Producto, Dispositivo, Horario, Camara, Notificacion,TokenNotificacion

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Agent = services.Agent
    Metric = services.Metric

    Controlador = services.Controlador
    HistorialProducto = services.HistorialProducto
    HistorialSensor = services.HistorialSensor
    Invernadero = services.Invernadero
    Pines = services.Pines
    Producto = services.Producto
    Usuario = services.Usuario
    Dispositivo = services.Dispositivo
    Horario = services.Horario
    Camara = services.Camara
    Notificacion = services.Notificacion
    TokenNotificacion = services.TokenNotificacion

  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

api.get('/datosPrueba',async (req,res)=>{
  //añade un nuevo usuario
  const varUs = await Usuario.createOrUpdate({
    nombre: 'nomPrueba', 
    ap_paterno: 'paternoPrueba',
    ap_materno: 'maternoPrueba',
    tipo: 'user',
    direccion: 'dir3',
    telefono: 6663,
    correo:'prueba@prueba',
    password:'1234',
    conectado:'false',
    change:'0000'
  }) 
  //añade un nuevo invernadero segun un usuario
  const varIn = await Invernadero.create(varUs.id, {
    departamento: 'Prueba',
    ubicacion: 'Prueba',
    provincia: 'Prueba',
    tempMaxima: '',
    tempMedia: '',
    tempMinima: '',
    tiempoIntermitencia:'00:03:00',
    tiempoPausa:'00:00:30',
    tiempoFuncionMotor:'00:00:10',
    logo: 'img.jpg'
    
  })
  //añade un nuevo controladr (arduino), en funcion a un invernadero
  const varContr = await Controlador.create(varIn.id, {
    uuid: 'arduino',
    marcaC: 'arduino',
    modeloC: 'uno',
    nroPines: 20,
    hostname: 'miPc3',
    connected: 'false',
    imagenControlador: ''
  })

  //añade todos los pines segun el controlador
    //variable para ver si son digitales y el resto analogicos  
    const digitales= 14;
    var num=0
    
  for (let i = 0; i < varContr.nroPines; i++) {
    let m
    if(digitales>i){
      var tipo ='digital'
      var clasePin =2
      var nroPin=i
    }else{
      var tipo ='analogico'
      var clasePin =1
      var nroPin = 'A'+num
      num++
    }
    
      m = await Pines.create(varContr.id, {
        nroPin:nroPin,
        estado:0,
        clasePin:clasePin,
        tipoPin:tipo,
        accionPin:0,
        descripcionPin:'',
        modelo:'',
        marca:'',
        sensorId:-1,
        depende:-1,
        tiempoMotor:'00:00:00'
      })
  }
  
  res.send({message: varUs,varIn,varContr});
})

api.get('/datosRoot',async (req,res)=>{
  //añade un nuevo usuario
  const varUs = await Usuario.createOrUpdate({
    nombre: 'usuario', 
    ap_paterno: 'ap_paterno',
    ap_materno: 'ap_materno',
    tipo: 'root',
    direccion: 'dir3',
    telefono: 6663,
    correo:'root@root',
    password:'1234',
    conectado:'false',
    change:'0000'

  }) 
  
  res.send(varUs.change);
})

api.get('/pruebaControlador',async (req,res)=>{
  
  //añade un nuevo controladr (arduino), en funcion a un invernadero
  const varContr = await Controlador.create(1, {
    uuid: 'arduino',
    marcaC: 'Arduino3',
    modeloC: 'Controlino3',
    nroPines: 86,
    hostname: 'miPc3', 
    connected: false,
    imagenControlador: ''
  })

  //añade todos los pines segun el controlador
    //variable para ver si son digitales y el resto analogicos  
    const digitales= 70;
    var num=0
    
  for (let i = 0; i < varContr.nroPines; i++) {
    let m
    if(digitales>i){
      var tipo ='digital'
      var clasePin =2
      var nroPin=i
    }else{
      var tipo ='analogico'
      var clasePin =1
      var nroPin = 'A'+num
      num++
    }
    
      m = await Pines.create(varContr.id, {
        nroPin:nroPin,
        estado:1,
        clasePin:clasePin,
        tipoPin:tipo,
        accionPin:0,
        descripcionPin:'puerta '+i,
        modelo:'',
        marca:'',
        sensorId:-1,
        depende:-1,
        tiempoMotor:'00:00:00'
      })
  }
  
  res.send({message:varContr});
})

api.get('/usuariosLocos',async (req,res)=>{
 
  for (let i = 0; i < 100; i++) {
    const varUs = await Usuario.createOrUpdate({
      nombre: 'vico'+i,
      ap_paterno: 'ticona',
      ap_materno: 'quispe',
      tipo: 'user',
      direccion: 'dir3',
      telefono: 6663,
      correo:'vico@vico'+i,
      password:i
    })
  }
  
  res.send('esto se va a descontrolar.....!!!!');
})

api.post('/addControlador', async (req, res, next) => {
  
  var params = req.body
  
  const usuario = await Usuario.findUno(params.usuarioId)

  const varContr = await Controlador.create(params.invernaderoId, {
    uuid: usuario.nombre+usuario.ap_paterno+usuario.ap_materno+usuario.correo,
    //uuid:'arddddddd', 
    marcaC: params.marcaC,
    modeloC: params.modeloC,
    nroPines: parseInt(params.pinesDigitales)+parseInt(params.pinesAnalogicos),
    hostname: 'Pc',
    connected: false,
    imagenControlador: ''
  }) 

  //añade todos los pines segun el controlador
    //variable para ver si son digitales y el resto analogicos  
    const digitales= params.pinesDigitales;
    var num=0
    let m
  for (let i = 0; i < varContr.nroPines; i++) {
    
      if(digitales>i){
        var tipo ='digital'
        var clasePin =2
        var nroPin=i
      }else{
        var tipo ='analogico'
        var clasePin =1
        var nroPin = 'A'+num
        num++
      }
    
     m = await Pines.create(varContr.id, {
        nroPin:nroPin,
        estado:0,
        clasePin:clasePin,
        tipoPin:tipo,
        accionPin:0,
        descripcionPin:'',
        modelo:'',
        marca:'',
        sensorId:-1,
        depende:-1,
        tiempoMotor:'00:00:00'
      })
  }
  
  res.send(m)
  
  
})

api.post('/mostrarControladores', async (req, res, next) => {
  
  var params = req.body
  
  const controlador = await Controlador.findAllId(params.invernaderoId)
  res.send(controlador)
  
  
})

api.get('/mostrarControladores1', async (req, res, next) => {
  
  var params = req.body
  //insertar indernaderoId del controlador
  const controlador = await Controlador.findAllId(1)
  res.send(controlador)
  
  
})

api.post('/mostrarTodosPines', async (req, res, next) => {
  
  const params = req.body

  const  result  = await Controlador.findAllId(params.invernaderoId)
  
  
  var vector = []
  if(result){
    
      if(Array.isArray(result)){
        result.forEach(m => {
          vector.push(m)
          })
      }
 
      let vector2 =[]
      
      for(let i=0; i < vector.length; i++){
        let result2  
        result2 = await Pines.findByAllActive(vector[i].id)

        
        
        var sw=0
        let auxiliar = []
        if (Array.isArray(result2)) {
            result2.forEach(m => {
            if(m.clasePin!=3){
              sw=1
              auxiliar.push(m)
            }
          })
        }
        vector2[i]=auxiliar
      }
          res.send(vector2)
  }else{
    let ve =[]
    res.send(ve)
    }
  
  
}) 

api.post('/mostrarTodosPinesControlador', async (req, res, next) => {
  
  const params = req.body

 
  let pines = await Pines.findByAllPines(params.controladorId)
  
  res.send(pines)
  
})
api.post('/mostrarTodosPinesControladorOcupados', async (req, res, next) => {
  
  const params = req.body

 
  let pines = await Pines.findByAllPinesOcupados(params.controladorId)
  
  res.send(pines)
  
})
api.post('/mostrarTodosPinesControladorAnalogicos', async (req, res, next) => {
  
  const params = req.body

 
  let pines = await Pines.findByAllPinesAnalogicos(params.controladorId)
      
  res.send(pines)
  
})
api.post('/mostrarBombas', async (req, res, next) => {
  
  const params = req.body

  var actuador = 'bomba'
  let pines = await Pines.findActuadorActive(params.controladorId,actuador)
  
  res.send(pines)
  
})
api.post('/mostrarVentiladores', async (req, res, next) => {
  
  const params = req.body

  var actuador = 'ventilador'
  let pines = await Pines.findActuadorActive(params.controladorId,actuador)
  
  res.send(pines)
  
})
api.post('/mostrarPuertas', async (req, res, next) => {
  
  const params = req.body
  var actuador = 'puerta'
  let pines = await Pines.findActuadorActive(params.controladorId,actuador)
  var puertas = []
  var puertas1 = []
  let final 
  for (let i = 0; i < pines.length; i++) {

    final = await Pines.findFinalCarrera(pines[i].id)
    
    puertas.push(pines[i])
    for (let j = 0; j < final.length; j++) {
      puertas.push(final[i])
      
    }
    puertas1.push(puertas)
    puertas=[]
    
  }
  
  res.send(puertas1)
  
})

api.post('/mostrarVentanas', async (req, res, next) => {
  
  const params = req.body

  var actuador = 'ventana'
  let pines = await Pines.findActuadorActive(params.controladorId,actuador)
  var puertas = []
  var puertas1 = []
  let final 
  for (let i = 0; i < pines.length; i++) {

    final = await Pines.findFinalCarrera(pines[i].id)
    
    puertas.push(pines[i])
    for (let j = 0; j < final.length; j++) {
      puertas.push(final[i])
      
    }
    puertas1.push(puertas)
    puertas=[]
    
  }
  
  res.send(puertas1)
  
})

api.post('/mostrarActuadores', async (req, res, next) => {
  
  const params = req.body


  const controlador = await Controlador.findAllId(params.invernaderoId)
  
  let vec=[],vec2=[],vec3=[], pines=[],pines2=[],pines3=[],pines4=[]
  for (let i = 0; i < controlador.length; i++) {
    //para bombas
    pines = await Pines.findActuadorActive(controlador[i].id,'bomba')
    vec2.push(pines)
    //para ventilador
    pines2 = await Pines.findActuadorActive(controlador[i].id,'ventilador')
    vec2.push(pines2)
     
    //para ventanas
    let pines3 = await Pines.findActuadorActive(controlador[i].id,'ventana')
    var puertas = []
    var puertas1 = []
    let final1,final2,final3
    for (let i = 0; i < pines3.length; i++) {
  
      puertas.push(pines3[i])

      //actuador+'Off'
      final1 = await Pines.findFinalCarrera(pines3[i].id,pines3[i].descripcionPin+'Off')
      for (let j = 0; j < final1.length; j++) {
        
        puertas.push(final1[j])  
      }
      

      //finalOn
      final2 = await Pines.findFinalCarrera(pines3[i].id,'finalOn')
      for (let j = 0; j < final2.length; j++) {
      puertas.push(final2[j])
      }
      //finalOff
      final3 = await Pines.findFinalCarrera(pines3[i].id,'finalOff')
      for (let j = 0; j < final3.length; j++) {
        puertas.push(final3[j])
      }
      puertas1.push(puertas)
      puertas=[]
      
    }
    vec2.push(puertas1)
    
    //para puertas
    let pines4 = await Pines.findActuadorActive(controlador[i].id,'puerta')
    var puertas2 = []
    var puertas12 = []
    let final12,final22,final32
    for (let i = 0; i < pines4.length; i++) {
  
      puertas2.push(pines4[i])

      //actuador+'Off'
      final12 = await Pines.findFinalCarrera(pines4[i].id,pines4[i].descripcionPin+'Off')
      for (let j = 0; j < final12.length; j++) {
        puertas2.push(final12[j])
      }
      //finalOn
      final22 = await Pines.findFinalCarrera(pines4[i].id,'finalOn')
      for (let j = 0; j < final22.length; j++) {
        puertas2.push(final22[j])
      }
      //finalOff
      final32 = await Pines.findFinalCarrera(pines4[i].id,'finalOff')
      for (let j = 0; j < final32.length; j++) {
        puertas2.push(final32[j])
      }
      puertas12.push(puertas2)
      puertas2=[]
      
    }
    vec2.push(puertas12)

    //guardamos todo
    vec.push(vec2)
    vec2=[]

  }

 
  res.send(vec)
  
})


api.post('/activarPin', async (req, res, next) => {
  
  //const { usuario, nroPin,  estadoPin, descripcionPin, modelo, marca } = req.body
  var params = req.body
  
  //CLASEPIN: 1=sensor, 2=actuador, 3=final carrera

  let pines = await Pines.updatePin(params.controladorId, {
    nroPin:params.nroPin,
    estado:1,
    clasePin:params.clasePin,
    descripcionPin:params.descripcionPin,
    modelo:params.modelo,
    marca:params.marca,
    depende: params.depende,
    tiempoMotor:params.tiempoMotor,
    sensorId: params.sensorId
  })
  res.send(pines)
  
   
})

api.post('/desactivarPin', async (req, res, next) => {
  
  //const { usuario, nroPin,  estadoPin, descripcionPin, modelo, marca } = req.body
  var params = req.body
  
  //CLASEPIN: 1=sensor, 2=actuador, 3=final carrera

  let pines = await Pines.desactivarPin(params.id, {
    estado:0,
    accionPin:0,
    descripcionPin:'',
    modelo:'',
    marca:'',
    depende:-1,
    sensorId:-1,
    tiempoMotor:'00:00:00'
  })

  let pinesAllDepende = await Pines.findByAllDepende(params.id)
 
  if (Array.isArray(pinesAllDepende)) {
    pinesAllDepende.forEach(m => {
      let pines = Pines.desactivarPin(m.id, {
        estado:0,
        accionPin:0,
        descripcionPin:'',
        modelo:'',
        marca:'',
        depende:-1,
        sensorId:-1,
        tiempoMotor:'00:00:00'
      })
    })
  }

  let m = await HistorialSensor.deleteSensor(params.descripcionPin, params.controladorId )
  res.send("Se ha desactivado el pin")
  
  
})

api.post('/findOnePin', async (req, res, next) => {
  
  
  var params = req.body
  
  let pines = await Pines.findOnePin(params.id)
  res.send(pines)
  
   
})

api.post('/deleteControlador', async (req, res, next) => {
  
  const params = req.body

  let controlador = await Controlador.deleteControlador(params.controladorId)
  let pines = await Pines.deletePines(params.controladorId)
  res.send(controlador) 
})

api.post('/borrarSensor', async (req, res, next) => {
  
  const { type , controladorId } = req.body
  //mandar type, controladorId, de la tabla historialSensor, del cual se desea borrar
  let m = await HistorialSensor.deleteSensor(type, controladorId )
  res.send(m)
})

api.post('/eraseSensorByDate', async (req, res, next) => {
  
  const params = req.body 
  let obj = await HistorialSensor.findAllByUuid(params.uuid)
  let er=[]
  if (Array.isArray(obj)) {
    obj.forEach(m => {
      //if(moment(moment(m.createdAt).format("YYYY-MM-DD")).isSame(params.date)){
      if(moment(moment(m.createdAt).format("YYYY-MM-DD")).isBetween(moment(obj[0].createdAt).format("YYYY-MM-DD"), params.date)){
        //moment('2015-10-20').isBetween('2015-10-19', '2015-10-25');
        er.push(m) 
      }
    })
  } 
  var cont=0
  if (Array.isArray(er)) {
    er.forEach(m => { 
      HistorialSensor.deleteSensorbyDate(m.id,obj[0].controladorId)
      cont++
    })
  }
  res.send(`${cont} datos eliminados`)
})

//borra todos los pines de un controlador especifico
api.post('/deletePines', async (req, res, next) => {
  
  const params = req.body 

  let pines = await Pines.deletePines(params.controladorId)

  let m = await HistorialSensor.deleteSensorContr(params.controladorId )
  res.send(pines) 
})


//eliminar un usuario
api.post('/eliminarUsuario', async(req, res) => {
  const itemId = req.body
  
  //busca los invernaderos con el id del usuario
  const id2 = await Invernadero.findById(itemId.id)
  
  if(id2[0] != null){
   
   const inv = id2[0]
  

   //buscar a los controladores con id del invernadero
   const contr = await Controlador.findById2(inv.id)
   if(contr[0] != null){
  
   const contr1 = contr[0]
   //borra todo el historial sensor del controlador
  await HistorialSensor.deleteSensorContr(itemId.id)
  
   //elimina los pines  del controlador
   await Pines.destroyAll(contr1.id)   
   //elimina los controladores del invernadero 
   await Controlador.destroyAll(inv.id) 
   //elimina los invernaderos del usuario
   await Invernadero.destroyAll(itemId.id) 
   //elimina al usuario
   await Usuario.destroy(itemId.id)
   
   res.send({message: 'se borro al usuario, invernadero, controlador y pines'})
 
   }else{
  
   //elimina los invernaderos del usuario
   await Invernadero.destroyAll(itemId.id) 
   //elimina al usuario
   await Usuario.destroy(itemId.id)
   
   res.send({message: 'se borro al usuario, invernadero'})
  }
 }
  else{
   await Usuario.destroy(itemId.id)
   
   res.send({message: 'se borro al usuario'})
  }
})

//eliminar un invernadero
api.post('/eliminarInvernadero', async(req, res, next) => {
  const itemId = req.body
  
  const contr = await Controlador.findById2(itemId.id)
  if(contr[0] != null){
    
  const contro = contr[0]

  //borra todo el historial sensor del controlador
  await HistorialSensor.deleteSensorContr(contro.id)
  //eliminar pines
  await Pines.destroyAll(contro.id) 
  //eliminar controlador
  await Controlador.destroyAll(itemId.id)
  //eliminar invernadero
  await Invernadero.destroy(itemId.id) 

  

  res.send({message: 'se borro el invernadero, controlador y pines'})  
  }else{
    //eliminar invernadero
  await Invernadero.destroy(itemId.id) 

  res.send({message: 'se borro el invernadero'})
  }
  
})

//eliminar un producto
api.post('/eliminarProducto', async(req, res, next) => {
  const params = req.body
  
  
  await Producto.destroy(params.id)
 
  res.send({message: 'se borro el producto'})
})

//eliminar historialProducto
api.post('/eliminarHistorialProducto', async(req, res, next) => {
  const params = req.body
  
  
  await HistorialProducto.destroy(params.id)

  res.send({message: 'se borro el producto'})
})

//eliminar controlador
api.post('/eliminarControlador', async (req, res, next) =>{
  const params = req.body
  
  await HistorialSensor.deleteSensorContr(params.id)
  await Pines.destroyAll(params.id)
  await Controlador.destroy(params.id)
  
  
  res.send({message: 'se borro el controlador'})
})

//modifica todos los valores de la tabla historialsensor, para uno nuevo
api.post('/modificarSensor', async (req, res, next) => {
  
  const { type , Nuevotype, controladorId } = req.body

  let m = await HistorialSensor.modifySensor(type, controladorId,{
    type:Nuevotype
  })
  res.send(m)
})

api.post('/modAccionPin', async (req, res, next) => {
     
  const { uuid, pin, value } = req.body  
   
  let m = await Pines.updateAccionPin(uuid, {    
  nroPin:pin, 
  accionPin:value
  }) 
  res.send(m)
     
   
})


api.get('/obtenerPines/:uuid', async (req, res, next) => {
  const { uuid} = req.params
 
  let varPin =[]
    
  varPin = await Pines.findByPinUuid(uuid)
          
            
    
  res.send(varPin)
}) 


api.get('/agents', auth(config.auth), async (req, res, next) => {
  debug('A request has come to /agents')

  const { user } = req

  if (!user || !user.username) {
    return next(new Error('Not authorized'))
  }

  let agents = []
  try {
    if (user.admin) {
      agents = await Controlador.findConnected()
    } else {
      //agents = await Controlador.findByUsername(user.username)
    }
  } catch (e) {
    return next(e)
  }

  res.send(agents)
})

api.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /agent/${uuid}`)

  let agent
  try {
    agent = await Controlador.findByUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!agent) {
    return next(new Error(`Agent not found with uuid ${uuid}`))
  }

  res.send(agent)
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug(`request to /metrics/${uuid}`)

  const result  = await Pines.findNameSensorsUuid(uuid)
  let result2=[]
  
  if (Array.isArray(result)) {
    result.forEach(m => {
      result2.push({"type":m.descripcionPin})
    }) 
  }
  console.log(result2)
  if (!result || result.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid ${uuid}`))
  }

  res.send(result2)
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params
 
  debug(`request to /metrics/${uuid}/${type}`)

  let metrics = []
  try {
    metrics = await HistorialSensor.findByTypeAgentUuid(type, uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics (${type}) not found for agent with uuid ${uuid}`))
  }

  res.send(metrics)
})
  
//API ACTUADORES
api.get('/actuador/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /All actuador/${uuid}`)

  let actuador = []
  try {
    actuador = await Pines.findAllActive(1,2,uuid)
  } catch (e) { 
    return next(e)
  }

  if (!actuador || actuador.length === 0) {
    return next(new Error(`Actuador not found for agent with uuid ${uuid}`))
  }
 
  res.send(actuador)
})

//Se usa para agregar usuarios
api.post('/usuario', async (req, res, next) => {
  
  const { nombre, ap_paterno, ap_materno, tipo, direccion, 
    telefono, correo, password, conectado,change} = req.body
    
    //añade un nuevo usuario
    const varUs = await Usuario.createOrUpdate({
      nombre: nombre,
      ap_paterno: ap_paterno,
      ap_materno: ap_materno,
      tipo: tipo,
      direccion: direccion,
      telefono: telefono,
      correo:correo,
      password:password,
      conectado:'false',
      change:''
    })
 
  res.send(nombre, ap_paterno, ap_materno, tipo, direccion, telefono, correo, password, conectado,change)
}) 
  
//obtiene todos los usuarios
api.get('/obtenerUsuarios', async (req, res, next) => {
  const user = 'user'
  const varUser = await Usuario.findUser(user)
  
  res.send(varUser)
 })

 api.get('/obtenerTester', async (req, res, next) => {
  const user = 'tester'
  const varUser = await Usuario.findUser(user)
  res.send(varUser)
 })
 
 api.get('/obtenerAdmins', async (req, res, next) => {
  const user = 'admin'
  const varUser = await Usuario.findUser(user)
  
  res.send(varUser)
 }) 
  
 //Verifica con correo y contraseña, devolviendo los datos del usuario
 api.post('/login', async(req, res) => {
  
  var params = req.body
  var correo = params.correo
  var pass = params.password
  Usuario.findOne(correo).then(function (result,err){
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
    //res.send(usu)
  })
  
})

//Agrega un nuevo invernadero con un id usuario
api.post('/invernadero', async (req, res, next) => {
  
  const varInv = req.body    
  
    //añade un nuevo producto
    const varUs = await Invernadero.create(varInv.usuarioId, {
      departamento: varInv.departamento,
      ubicacion: varInv.ubicacion,
      provincia: varInv.provincia,
      tempMaxima: varInv.tempMaxima,
      tempMinima: varInv.tempMinima,
      tempMedia: varInv.tempMedia,
      tiempoIntermitencia: varInv.tiempoIntermitencia,
      tiempoPausa: varInv.tiempoPausa,
      tiempoFuncionMotor: varInv.tiempoFuncionMotor,
      logo: varInv.logo
    })
  
  res.send(varUs) 
}) 


//Muestra un invernadero de acuerdo a su id
api.post('/obtenerInv', async (req, res, next) => {
  const params = req.body
  
  const id = params.id
  const varUs = await Invernadero.findOne(id)
res.send(varUs) 
})


// Con ID del usuario Obtiene todos los invernaderos
api.post('/obtenerInvernaderos', async (req, res, next) => {
  var usuarioId = req.body
  var id = usuarioId.id
  const varInv = await Invernadero.findById(id)
   
 res.send(varInv)
}) 


//Añadi un nuevo producto para el catalogo
api.post('/producto', async (req, res, next) => {
  
  const params = req.body   
    //añade un nuevo invernadero
    const varProd = await Producto.create({
      nombreProducto: params.nombreProducto,
      tiempoProduccion: params.tiempoProduccion,
      tempMaxRecomendada: params.tempMaxRecomendada,
      tempMinRecomendada: params.tempMinRecomendada,
      imagen:params.imagen
      
      
      
    })
 
  res.send(varProd)
}) 


//Obtiene todos los productos de toda la base de datos (catalogo)
api.get('/obtenerProductos', async (req, res, next) =>{
  const productos = await Producto.findAll()
  res.send(productos) 
})

//recibe un id invernadero, id producto para obtener, los productos de un invernadero especifico
api.post('/obtenerProdInv', async (req, res, next)=>{
  const varI = req.body
  const  result  = await HistorialProducto.findProd(varI.invernaderoId)
  
  if(result){
    var vector = []
      if(Array.isArray(result)){
        result.forEach(m => {
          vector.push(m)
          })
      }
 
      let vector2 =[]
      
      for(let i=0; i < vector.length; i++){
        let result2  
        result2 = await Producto.findProd(vector[i].productoId)
        vector2[i]=result2
        }
          res.send(vector2)
  }else{
    let ve =[]
    res.send(ve)
    }
  
})

//AGREGA HISTORIAL PRODUCTO
api.post('/agregarHistorialProducto', async (req, res)=>{
  
  const varP = req.body 
  
  const result2 = await Producto.findProd(varP.productoId)
  
  const mes = result2[0].tiempoProduccion
  const cad = mes.split(' ')
  const nroM = parseInt(cad[0])
  console.log(nroM)
  
  const date = new Date
  const mes2 = date.getMonth()
  console.log("--------------------------------------------------")
  console.log(mes2)

  const nmes = mes2 + nroM
  console.log("--------------------------------------------------")
  console.log(nmes)
  
  console.log(varP.productoId,varP.invernaderoId)
  const result = await HistorialProducto.create({
    cantidad: varP.cantidad,
    fechaCosecha: date.setMonth(nmes),
    productoId: varP.productoId,
    invernaderoId:varP.invernaderoId
  })
  console.log(result) 
    res.send(result)
})

api.post('/updateUsuarioPassword', async (req, res ) =>{
  const params = req.body
  
  const usuario=Usuario.updateUsuarioPassword(params.id,{
    password : params.password
  })
   
  res.send(usuario)

})

api.post('/updateUsuario', async (req, res ) =>{
  const params = req.body
  
  const usuario=Usuario.updateUsuario(params.id,
    {
    nombre : params.nombre,
    ap_paterno : params.ap_paterno,
    ap_materno : params.ap_materno,
    ap_tipo : params.ap_tipo,
    direccion : params.direccion,
    telefono : params.telefono,
    correo : params.correo,
    password : params.password,
    conectado: params.conectado,
    change :params.change
  })
   
  res.send(usuario)

})

//actualiza los datos de un invernadero
api.post('/updateInvernadero', async (req, res ) =>{
  const params = req.body
  
  const usuario=Invernadero.updateInvernadero(params.id,{
    departamento : params.departamento,
    ubicacion : params.ubicacion,
    provincia : params.provincia,
    tempMaxima : params.tempMaxima,
    tempMinima : params.tempMinima,
    tempMedia: params.tempMedia,
    tiempoIntermitencia: params.tiempoIntermitencia,
    tiempoPausa: params.tiempoPausa,
      tiempoFuncionMotor: params.tiempoFuncionMotor,
      logo: params.logo
  })
   
  res.send(usuario)

})

//obtiene un usuario con su propio id usuario
api.post('/obtenerUser', async (req, res, next) =>{
  const varI = req.body
  const usu = await Usuario.findUs(varI.id)
  res.send(usu) 
})

//Obtiene un controlador con su propio id del controlador
api.post('/obtenerControlador', async (req, res, next) =>{
  const params = req.body
  const controlador = await Controlador.findUno(params.id)
  res.send(controlador) 
})
//USUARIOS--------------------------------------------------------------------------------------------------------

//Muestra todos los pines activos de un invernadero
api.post('/uObtenerControladores', async (req, res, next)=>{
  const params = req.body
  const  result  = await Controlador.findAllId(params.invernaderoId)
  
  if(result){
    var vector = []
      if(Array.isArray(result)){
        result.forEach(m => {
          vector.push(m)
          })
      }
 
      let vector2 =[]
      
      for(let i=0; i < vector.length; i++){
        let result2
        result2 = await Pines.findByAllsensor(vector[i].id)
        vector2[i]=result2
        }
          res.send(vector2)
  }else{
    let ve =[]
    res.send(ve)
    }
  
})
//DISPOSITIVOS
//crear
api.post('/addDispositivo', async (req, res) =>{
  const dispo = req.body
  const result = await Dispositivo.create({
    modelo: dispo.modelo,
    marca: dispo.marca,
    nroDigitales: dispo.nroDigitales,
    nroAnalogicos:dispo.nroAnalogicos,
    imagenControlador: dispo.imagenControlador
  })
res.send(result)
})

//eliminar
api.post('/eliminarDispositivo', async (req, res)=>{
  const id = req.body 
  await Dispositivo.destroy(id.id)

  res.send("se borro el dispositivo... ")
})
//mostrar todo
api.get('/mostrarDispositivos', async (req, res)=> {
  
  const result = await Dispositivo.findAll()

  res.send(result)
})

//obtiene a un invernadero, con el uuid del controlador
api.get('/findInvbyContr/:uuid', async (req, res, next)=>{
  
  const { uuid } = req.params
  const result  = await Controlador.findByUuid(uuid)
  const inv = await Invernadero.findOne(result.invernaderoId)
   
  res.send(inv)
  
})
//obtiene a un invernadero, con el uuid del controlador
api.get('/findAllContr/:uuid', async (req, res, next)=>{
  
  const { uuid } = req.params
  const result  = await Controlador.findByUuid(uuid)
  const inv  = await Controlador.findAllId(result.invernaderoId)
  
   
  res.send(inv)
  
})


//HORARIO
//elimina la hora en la tabla horario
api.post('/eliminarHora', async (req, res) =>{
  const params = req.body
  const rest = await Horario.findOne(params.id)
  const result = Horario.destroy(params.id)
  res.send(rest)
})

api.post('/obtenerBombasControlador', async (req, res)=>{
  const params = req.body
  const  result  = await Controlador.findById2(params.id)
  
  if(result){
    var vector = []
      if(Array.isArray(result)){
        result.forEach(m => {
          vector.push(m)
          })
      }
 
      let vector2 =[]
      
      for(let i=0; i < vector.length; i++){
        let result2
        result2 = await Pines.findBomba(vector[i].id)
        vector2[i]=result2
        }
          res.send(vector2)
  }else{
    let ve =[]
    res.send(ve)
    }
  
})

api.post('/mostrarHorario2', async (req, res) => {
  const params = req.body
  const result = await Controlador.findById2(params.id)

  if (result){
    var vector = []
    if(Array.isArray(result)){
      result.forEach(o=>{
        vector.push(o)
      })
    }
    let vector2 = []
    for(let i = 0; i<vector.length; i++){
      let result2 
      result2 = await Pines.findBomba(vector[i].id)
      
      if (result2){
        var vector3 = []
        if (Array.isArray(result2)){
          result2.forEach(m => {
            vector3.push(m)
          })
        }

        var vector4 = []
        for(let j = 0; j < vector3.length; j++){
          let result3
          
          result3 = await Horario.findAll(vector3[j].id)
          
          vector4[j]= result3
        }
      }
      vector2[i] = vector4
    }
    res.send(vector2)
  }
  else{
    let ve = []
    res.send(ve)
  }
})

api.get('/mostrarHorarioControlador/:uuid', async (req, res) => {
  const { uuid } = req.params
  const result  = await Controlador.findByUuid(uuid)
  const pin = await Pines.findBomba(result.id)
  
  let varios = []
  
  for (let i = 0; i < pin.length; i++) {
    console.log("-----------------------------------------")
    console.log(pin[i].id)
    var horario = await Horario.findAll(pin[i].id)

    let varios2 = []
    for (let j = 0; j < horario.length; j++) {
      varios.push(horario[j])
    }
  }

  res.send(varios)
 
})
 
api.post('/crearHora', async (req, res) =>{
  const params = req.body
  
  const result = await Horario.create(params.pineId, {
    horaInicio : params.horaInicio,
    duracion : params.duracion
  })
  
  res.send(result)
})

api.post('/guardarImagen', md_upload, async(req, res)=>{
  const params = req.body
  //const id = params.id

  //console.log(id)

  //console.log('-------------------archivo ini?-----------')
  //console.log(params)
  //console.log('-------------------archivo fin?-----------')
  const fileName = 'no subido'

  if(req.files){
    console.log("existe el fichero")
    const filePath = req.files.image.path
    const fileSplit = filePath.split('\/')
    const fileName = fileSplit[2]

    const extSplit = fileName.split('\.')
    const fileExt = extSplit[1]
 
    if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'png'){
      /*res.status(200).send({
        filePath: filePath,
        fileSplit: fileSplit,
        fileName: fileName
      })*/
      res.send({nombre: fileName})
    }
    else{

      fs.unlink(filePath)
      res.status(200).send({message: 'extencion no valida'})
    }
    
    // res.status(200).send({
    //   filePath: filePath,
    //   fileSplit: fileSplit,
    //   fileName: fileName
    // })
     
  }
  else{
    res.send('no se ha subido archivos')
  }
  //res.status(200).send({message: 'el usuario esiste'})

})

api.get('/mostrarImagen/:imageFile', async (req, res)=>{
  const imageFile = req.params.imageFile
  const pathFile = './uploads/product/'+ imageFile
  console.log(pathFile+"     "+imageFile)
 
 
  fs.exists(pathFile, function(exists){
    if(exists){
      res.sendFile(path.resolve(pathFile))
    }
    else{
      res.status(404).send({message: 'not found...'})
    }
  })
  //res.status(200).send({message: "obtener imagen"})

})

//CAMARA
//crear
api.post('/addCamara', async (req, res) =>{
  const params = req.body
  const result = await Camara.create(params.invernaderoId, {
    nombre:params.nombre,
    ip:params.ip
  })
res.send(result)
})

//eliminar
api.post('/eliminarCamara', async (req, res)=>{
  const id = req.body 
  await Camara.destroy(id.id)

  res.send("se borro el dispositivo... ")
}) 
//mostrar todo
api.post('/mostrarCamaras', async (req, res)=> {
  const params = req.body
  const result = await Camara.findAllId(params.invernaderoId)

  res.send(result)
})


//muestra usuarios que estan conectados
api.get('/usuariosConectados', async (req, res, next) => {
  
  
  const varUser = await Usuario.findAll();
  if(varUser.tipo!='admin')
    res.send("usted no es administrador")

  let env = []; 
      
  for (let i = 0; i < varUser.length; i++) {
    if(varUser[i].conectado=='true')
      env.push(varUser[i])
  }

  res.send(env)
  
 })

/*
api.post("/uploads/:image", bodyparser.raw({
  limit:'10mb',
   type: 'image/*'
  }), (req, res) => {
    let fd = fs.createWriteStream(req.localpath, {
      flags: 'w+', endcoding: 'binary'
    });
    fd.end(req.body)
    fd.on('close', () => {
      res.send({ status: 'ok',
       size:req.body.length
      })
    })
  })


  api.head('/uploads/:image', (req, res) => {
    fs.access(req.localpath,fs.constants.R_OK,
    (err) => {
      res.status(err ? 404 : 200).end();
    })
  })


  api.get('/uploads/:width(\\d+)x:height(\\d+)-:image',
    download_image)
    api.get('/uploads/:height(\\d+)-:image',
    download_image)
    api.get('/uploads/:width(\\d+)-:image',
    download_image)
    api.get('/uploads/:image', dowload_image)
    



 
// Productos producidos (semanal, mensual, anual)
api.get('/productosProducidos', async (req, res, next) => {

  const varPr = await Producto.findAll();
  if(varUser.tipo!='admin')
    res.send("usted no es administrador")

  let env = []; 
      
  for (let i = 0; i < varUser.length; i++) {
    if(varUser[i].conectado=='true')
      env.push(varUser[i])
  }

  res.send(env)
 })

*/
/// NOTIFICACIONES /////////////////////////////////////////////////////////////////////
api.post('/enviarNoti', async (req, res) =>{
  const notific = req.body
  console.log(req.body)
   if(notific == 'ok')
     res.send({title: 'fallo de  tal..'},
     {body: 'descripcion..'}
    ) 
    console.log(req.body)
    res.send({message: 'error al enviar...'})
})



//Se loguea y verifica si tiene un token, sino añade
api.post('/addTokenNotificacions', async (req, res, next) => {
  
  var params = req.body
  var Objeto = await Usuario.findOne(params.correo)
    
  if(Objeto){
    if(Objeto.password === params.password){
      const Objeto2 = await TokenNotificacion.createOrUpdate(Objeto.id,{
        token: params.token
      })
      res.send({message: "Logueado y token guardado o actualizado"})  
    }else{
      res.send({message: "error al introducir la contraseña"})  
    }
  }else{
    res.send({message: "el usuario no existe"})
  }
})

api.get('/postNotificacion/:uuid/:title/:body', async (req, res) => {
  const { uuid , title , body } = req.params
  const result  = await Controlador.findByUuid(uuid)
  const varUs = await Invernadero.findOne2(result.id)
  const usu = await Usuario.findUno(varUs.usuarioId)
  const token = await TokenNotificacion.findAll(usu.id)
  const noti = await Notificacion.create(usu.id,{
      titulo:title, 
      cuerpo:body
  })
  
  var SERVER_API_KEY='AAAA_mbOYVk:APA91bGgUEkx19pOnVuveK4PGZn3rnbx1rPydrjp7riA349i9qSI8zLNoObLlW8bl8vuZqMWI2VDy78Z3JB7HDzDeVbvtD6rR0VbNQLRcYgp34xkuRNi5Z4aeOWJM0gwwuEfBXqsvdZd';//put your api key here
  var fcmCli= new FCM(SERVER_API_KEY);

  if(title!="funcionamiento"){
    
    if (Array.isArray(token)) {
      token.forEach(m => {
        //console.log(m.token)
                var payloadOK = {
                  to: m.token,
                  priority: 'high',
                  content_available: true,
                  notification: { //Notificacion
                      title: title,                    //TITULO
                      body: body,                 //CUERPO
                      sound : "default", badge: "1"                       //EXTRAS
                  }
                };
              var callbackLog = function (sender, err, res) {
                console.log(sender,uuid)
              };
            
              function sendOK()
              {
                  fcmCli.send(payloadOK,function(err,res){
                      callbackLog('sendOK',err,res);
                  });
              }
              sendOK();
              

      })
    }
  }
  
  res.send({message: "Notificacion Enviada"})  
 

})

// Con ID del usuario Obtiene todas las Notificaciones
api.post('/getNotificaciones', async (req, res, next) => {
  var params = req.body
  const varInv = await Notificacion.findAll(params.id)
  
 res.send(varInv)
}) 
 
api.post('/getNotificacionesLast5', async (req, res, next) => {
  var params = req.body
  const varInv = await Notificacion.findLastFive(params.id)
   
 res.send(varInv)
})

api.post('/getNotificacionesError', async (req, res, next) => {
  var params = req.body
  const obj = await Notificacion.findError(params.id)
  var ojbAr=[]
  if (Array.isArray(obj)) {
    obj.forEach(m => {
      if(moment(moment(m.createdAt).format("YYYY-MM-DD")).isSame(params.fecha)){
        ojbAr.push(m)
      }
      //console.log(moment(moment(m.createdAt).format("YYYY-MM-DD")).isSame(params.fecha))
    })
  }
 res.send(ojbAr)
})

api.post('/getNotificacionesFuncionamiento', async (req, res, next) => {
  
  var params = req.body
  const obj = await Notificacion.findFuncionamiento(params.id)
  var ojbAr=[]
  if (Array.isArray(obj)) {
    obj.forEach(m => {
      //moment('2015-10-20').isBetween('2015-10-19', '2015-10-25');
      if(moment(moment(m.createdAt).format("YYYY-MM-DD")).isSame(params.fecha)){
        ojbAr.push(m)
      }
      //console.log(moment(moment(m.createdAt).format("YYYY-MM-DD")).isSame(params.fecha))
    })
  }
 res.send(ojbAr)
})

//let metrics = await HistorialSensor.findAllByTypeAgentUuid(type, uuid)
/*
Parametros
type=tipo de sensor Ej: sensor temperatura 1
uuid=uuid del controlador Ej: arduino
fecha=fecha Ej: 2019/08/22
*/ 
api.post('/getSensorByUuidTypeDate', async (req, res, next) => {
  var params = req.body
  var inicio=moment(params.fecha, 'YYYY-MM-DD').toDate()
  var fin=moment(inicio).add(1,'days').toDate()
  //fin=moment(fin).subtract(1,'days').toDate()
  const obj = await HistorialSensor.findAllByTypeAgentUuid(params.type, params.uuid,inicio,fin)
  console.log(inicio)
  console.log(fin)
  console.log(obj)
  res.send(obj) 
})

module.exports = api
