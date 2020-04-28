const fs = require('fs')

//let dat1=fs.readFileSync('/etc/asterisk/extensions.conf', 'utf8')
let dat1=fs.readFileSync('datos.txt', 'utf8')

//console.log(dat1)
console.log("--------------------------------------")
var sala="radio 12312321321"
var cambio="radio"
var sw=0,sw2=-1
var aux=""
var pos=-1
var pos2=-1
var final=""
for (let i = 0; i < dat1.length; i++) {
  
  if (dat1.charCodeAt(i)==91) {
    sw=1
    pos=i
  }
  if(sw==1){
    aux+=dat1[i]
  }
  if (dat1.charCodeAt(i)==93) {
    sw=0
    
    if(aux.substring(1,aux.length-1)==sala){
      sw2=1
      pos2=i
      break
    }
    aux=""
  }
}
if(sw2==1){
  final+=dat1.substring(0,pos+1)
  final+=params.nombreSala
  final+=dat1.substring(pos2,dat1.length)
  if(final.charCodeAt(final.length-1)==10){
    final=final.substring(0,final.length-1)
  }

  dat1+="\n[ivr]\nswitch = Realtime/@"

  fs.writeFile('datos.txt', final, (err) => {
    if (err) console.log(err);
    console.log("\x1b[32m","Successfully ObtPines Written to File.");
  });
}