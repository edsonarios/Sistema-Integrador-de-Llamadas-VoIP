'use strict'

const debug = require('debug')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const socketio = require('socket.io')
const chalk = require('chalk')

const { pipe } = require('./utils')

const port = process.env.PORT || 8085
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server)
//Variable para diferenciar el nombre de los sockets enviados
const emit1 = "Llamadas"

//Llamando librerias AMI para conectarno con asterisk
const AmiClient = require('asterisk-ami-client');
let client = new AmiClient();
const { parsePayload } = require('./utils')

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})
 
function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[mod-socket]')} server listening on port ${port}`)
  
})



 
client.connect('realTime', '1234', {host: 'localhost', port: 5055})
 .then(amiConnection => {
    
    client.on('event', event =>{ 
    
      var dat = new Date();
        
        /*if(event.Event != 'PeerStatus' && event.Event != 'VarSet' && event.Event != 'TestEvent' && event.Event != 'RTCPReceived' && event.Event != 'RTCPSent'){
            console.log("1")
            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(event)
        }*/

        /*if(event.Event == 'Newchannel' || event.Event == 'Newexten' ||event.Event == 'NewConnectedLine' || event.Event == 'BridgeEnter' || event.Event == 'Hangup' || event.Event == 'AgentCalled' || event.Event == 'AgentConnect' || event.Event == 'AgentComplete'){
          console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(event)
        }*/

        if(event.Event == 'Newchannel' || event.Event == 'Newexten' ||event.Event == 'NewConnectedLine' || event.Event == 'BridgeEnter' || event.Event == 'Hangup' || event.Event == 'AgentCalled' || event.Event == 'AgentConnect' || event.Event == 'AgentComplete'){


          if(event.Event == 'Newchannel' && event.CallerIDNum != '<unknown>'){
            var evento = {"Evento":`${event.Event}`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.Exten}`,"Contexto":`${event.Context}`}
            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'Newexten' && (event.Application == 'Playback' || event.Application == 'Dial' || event.Application == 'Queue' || event.Application == 'ChanSpy' || event.Application == 'Background' || event.Application == 'GotoIfTime' || event.Application == 'confbridge')){
            var evento = {"Evento":`${event.Event}`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.Exten}`,"Contexto":`${event.Context}`,"Aplicacion":`${event.Application}`}

            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'NewConnectedLine' && (event.CallerIDNum != '<unknown>')){
            var evento = {"Evento":`${event.Event}`,"Numero":`${event.ConnectedLineNum}`,"Extension":`${event.CallerIDNum}`,"Contexto":`${event.Context}`}

            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'BridgeEnter' && event.Exten != '' && event.CallerIDNum != '<unknown>'){
            var evento = {"Evento":`${event.Event}`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.Exten}`,"Contexto":`${event.Context}`}
            
            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'AgentCalled'){
            var evento = {"Evento":`NewConnectedLine`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.MemberName}`,"Contexto":`${event.Context}`}

            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'AgentConnect'){
            var evento = {"Evento":`BridgeEnter`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.MemberName}`,"Contexto":`${event.Context}`}

            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'AgentComplete'){
            var evento = {"Evento":`Hangup`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.MemberName}`,"Contexto":`${event.Context}`}

            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }

          if(event.Event == 'Hangup' && event.Exten != '' && event.CallerIDNum != event.Exten && event.CallerIDNum != '<unknown>' ){
            var evento = {"Evento":`${event.Event}`,"Numero":`${event.CallerIDNum}`,"Extension":`${event.Exten}`,"Contexto":`${event.Context}`}

            console.log(dat.getHours(),":",dat.getMinutes(),":",dat.getSeconds())
            console.log(evento)
            io.emit(`${emit1}`,evento)
          }
          //console.log(event)
      }

      console.log(event)
    })
    //client.on('data', chunk => console.log(chunk))
    //client.on('response', response => console.log(response))
    //client.on('disconnect', () => console.log('disconnect'))
    //client.on('reconnection', () => console.log('reconnection'))
    //client.on('Dial', error => console.log(error))
    
    /*var aux=""
    //Realizar llamada
    var action1= {
      Action: 'Originate',
      Channel: 'SIP/2001',
      Context: 'default',
      Exten: '3',
      Priority: '1'
    }
    //Reload
    var action2= {
      Action: 'Reload',
    }
    //Añadir nuevo dial plan, pero solo es temporal y no persistente
    var action3= {
      Action: 'DialplanExtensionAdd',
      Context: 'NuevoDialLargoParaEncontrar',
      Extension: '6001',
      Priority: '1',
      Application: 'Dial(SIP/${EXTEN})'
    }
    
    setTimeout(() => {
      client.action(action1);
      console.log("algo2")
  }, 5000);*/


    




    
     // Socket.io / WebSockets
    io.on('connect', socket => {
      
      //recibe el mensaje de la pagina web
      socket.on('action', payload => {
        //publica mediante mqtt el objeto json
        client.action(payload);
        console.log("\x1b[33m",payload)
      })
        //pipe(agent, socket)
    })
 
 })
 .catch(error => console.log(error));
