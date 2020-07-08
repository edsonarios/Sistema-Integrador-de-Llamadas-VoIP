"use strict";

const debug = require("debug");
const http = require("http");
const express = require("express");
const asyncify = require("express-asyncify");
const socketio = require("socket.io");
const chalk = require("chalk");

const { pipe } = require("./utils");

const port = process.env.PORT || 8085;
const app = asyncify(express());
const server = http.createServer(app);
const io = socketio(server);
//Variable para diferenciar el nombre de los sockets enviados
const emit1 = "Llamadas";
const emit2 = "asterisk";
var astEst = 0;

//Llamando librerias AMI para conectarno con asterisk
const AmiClient = require("asterisk-ami-client");
let client = new AmiClient({
  reconnect: true,
  keepAlive: true,
});
const { parsePayload } = require("./utils");

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`);

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message });
  }

  res.status(500).send({ error: err.message });
});

function handleFatalError(err) {
  console.error(`${chalk.red("[fatal error]")} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

server.listen(port, () => {
  console.log(
    `${chalk.green("[mod-socket]")} server listening on port ${port}`
  );
});

client
  .connect("realTime", "1234", {
    host: "167.86.119.191",
    port: 5055,
  })
  .then((amiConnection) => {
    if (client.isConnected) {
      astEst = 0;
      var evento = {
        Evento: true,
        Descripcion: `asterisk conectado`,
      };
      console.log(evento);
      io.emit(`${emit2}`, evento);
    }
    client.on("event", (event) => {
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

      if (
        event.Event == "Newchannel" ||
        event.Event == "Newexten" ||
        event.Event == "NewConnectedLine" ||
        event.Event == "BridgeEnter" ||
        event.Event == "Hangup" ||
        event.Event == "AgentCalled" ||
        event.Event == "AgentConnect" ||
        event.Event == "AgentComplete"
      ) {
        if (
          event.Event == "Newchannel" &&
          event.CallerIDNum != "<unknown>" &&
          event.Exten != "s"
        ) {
          var evento = {
            Evento: `${event.Event}`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.Exten}`,
            Contexto: `${event.Context}`,
          };
          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (
          event.Event == "Newexten" &&
          (event.Application == "Playback" ||
            event.Application == "Dial" ||
            event.Application == "Queue" ||
            event.Application == "ChanSpy" ||
            event.Application == "Background" ||
            event.Application == "GotoIfTime" ||
            event.Application == "confbridge")
        ) {
          var evento = {
            Evento: `${event.Event}`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.Exten}`,
            Contexto: `${event.Context}`,
            Aplicacion: `${event.Application}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (
          event.Event == "NewConnectedLine" &&
          event.CallerIDNum != "<unknown>"
        ) {
          var evento = {
            Evento: `${event.Event}`,
            Numero: `${event.ConnectedLineNum}`,
            Extension: `${event.CallerIDNum}`,
            Contexto: `${event.Context}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (
          event.Event == "BridgeEnter" &&
          event.Exten != "" &&
          event.CallerIDNum != "<unknown>"
        ) {
          var evento = {
            Evento: `${event.Event}`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.Exten}`,
            Contexto: `${event.Context}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (event.Event == "AgentCalled") {
          var evento = {
            Evento: `NewConnectedLine`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.MemberName}`,
            Contexto: `${event.Context}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (event.Event == "AgentConnect") {
          var evento = {
            Evento: `BridgeEnter`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.MemberName}`,
            Contexto: `${event.Context}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (event.Event == "AgentComplete") {
          var evento = {
            Evento: `Hangup`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.MemberName}`,
            Contexto: `${event.Context}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }

        if (
          event.Event == "Hangup" &&
          event.Exten != "" &&
          event.CallerIDNum != event.Exten &&
          event.CallerIDNum != "<unknown>"
        ) {
          var evento = {
            Evento: `${event.Event}`,
            Numero: `${event.CallerIDNum}`,
            Extension: `${event.Exten}`,
            Contexto: `${event.Context}`,
          };

          console.log(
            dat.getHours(),
            ":",
            dat.getMinutes(),
            ":",
            dat.getSeconds()
          );
          console.log(evento);
          io.emit(`${emit1}`, evento);
        }
        //console para ver todos los eventos y verificar si no se escapa alguno
        //console.log(event)
      }
      //Indica si asterisk se detuvo, aveces falla asterisk en mostrar este evento
      if (event.Event == "Shutdown") {
        astEst = 1;
        console.log(
          dat.getHours(),
          ":",
          dat.getMinutes(),
          ":",
          dat.getSeconds()
        );
        var evento = {
          Evento: false,
          Descripcion: `asterisk desconectado`,
        };
        console.log(evento);
        io.emit(`${emit2}`, evento);
        //Descomentar para modo produccion
        //checkConnectionAsterisk();
      }
      //Indica si ami se logueo correctamente a asterisk, no siempre se muestra este evento por parte de asterisk
      if (
        event.Event == "SuccessfulAuth" &&
        event.AccountID == "realTime" &&
        event.Service == "AMI"
      ) {
        astEst = 0;
        console.log(
          dat.getHours(),
          ":",
          dat.getMinutes(),
          ":",
          dat.getSeconds()
        );
        var evento = {
          Evento: true,
          Descripcion: `asterisk conectado`,
        };
        console.log(evento);
        io.emit(`${emit2}`, evento);
      }
      //funcion que comprobara cada 60 segundos si hay conectividad con asterisk, solo si hubo un evento de desconeccion automaticamente, si llega por peticion del front, igual entraria en este bucle, desactivado mientras no este en modo produccion
      function checkConnectionAsterisk() {
        if (astEst == 1) {
          setTimeout(() => {
            if (client.isConnected) {
              var evento = {
                Evento: true,
                Descripcion: `asterisk conectado`,
              };
              astEst = 0;
              console.log(evento);
              io.emit(`${emit2}`, evento);
            } else {
              var evento = {
                Evento: false,
                Descripcion: `asterisk desconectado`,
              };
              console.log(evento);
              io.emit(`${emit2}`, evento);
              checkConnectionAsterisk();
            }
            console.log("algo2");
          }, 60000);
        }
      }
      //console para ver todo los eventos del sistema asterisk
      //console.log(event);
    });
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
    io.on("connect", (socket) => {
      //recibe el mensaje de la pagina web
      socket.on("asterisk", (payload) => {
        //inicia accion que viene en el payload
        //encender, apagar, reiniciar
        if (payload.accion == "encender") {
          console.log("encender");
        }
        if (payload.accion == "apagar") {
          console.log("apagar");
        }
        if (payload.accion == "reiniciar") {
          console.log("reiniciar");
        }
        console.log("\x1b[33m", payload);
      });

      //socket que por peticion del front, envia el estado de ami hacia asterisk, si esta conectado o no, y si no estuviera conectado, entonces entra en un bucle de 60 segundos, preguntando constantemente si esta conectado, hasta que vuelva a conectarse
      socket.on("asteriskEstado", (payload) => {
        if (!client.isConnected) {
          //Descomentar para modo produccion
          astEst = 1;
          //checkConnectionAsterisk();
        }
        var evento = {
          Evento: client.isConnected,
          Descripcion: `asterisk estado`,
        };
        io.emit(`${emit2}`, evento);
        console.log("\x1b[33m", evento);
      });

      //pipe(agent, socket)
    });
  })
  .catch((error) => console.log(error));
