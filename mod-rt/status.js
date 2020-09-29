"use strict";

async function Newchannel(event) {
  //Por 1 llamada existen 2 status, este if contempla el 1er status para generar Newchannel,
  if (event.ConnectedLineNum == "<unknown>") {
    // Newchannel
    return {
      evento: `Newchannel`,
      numero: `${event.CallerIDNum}`,
      extension: `${event.Exten}`,
      contexto: `${event.Context}`,
    };
  }
}
async function Newexten(event) {
  //Por 1 llamada existen 2 status, este if contempla el 1er status para generar Newexten
  if (event.ConnectedLineNum == "<unknown>") {
    // Newexten
    return {
      evento: `Newexten`,
      numero: `${event.CallerIDNum}`,
      extension: `${event.Exten}`,
      contexto: `${event.Context}`,
      aplicacion: `${event.Application}`,
    };
  }
}
async function NewConnectedLine(event) {
  //Por 1 llamada existen 2 status, este if contempla el 1er status para generar NewConnectedLine
  if (event.ConnectedLineNum == "<unknown>") {
    // NewConnectedLine
    return {
      evento: `NewConnectedLine`,
      numero: `${event.CallerIDNum}`,
      extension: `${event.DNID}`,
      contexto: `${event.Context}`,
    };
  }
}
async function BridgeEnter(event) {
  //Por 1 llamada existen 2 status, este if contempla el 1er status para generar BridgeEnter
  if (event.ConnectedLineNum == "<unknown>") {
    //en este parametro si la llamada solo esta sonando es Ring, pero si ya se contesta la llamada es Up, por lo que se genera el BridgeEnter, excluye al Playback, xq este no tiene BridgeEnter
    if (event.ChannelStateDesc == "Up" && event.Application != "Playback") {
      // BridgeEnter
      return {
        evento: `BridgeEnter`,
        numero: `${event.CallerIDNum}`,
        extension: `${event.Exten}`,
        contexto: `${event.Context}`,
      };
    }
  }
}

module.exports = {
  Newchannel,
  Newexten,
  BridgeEnter,
  NewConnectedLine,
};
