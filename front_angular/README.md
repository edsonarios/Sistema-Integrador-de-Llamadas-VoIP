# Cambios Front-End Angular

Se han realizado muchos cambios en su mayoria la estructura y contenido respecto a modulos y enrutamientos.

## Archivos

Se ha modificado la estructura total de el proyecto teniendo solo 2 carpetas contenedoras:
```
Templates
```
_y tambien_
```
Pages
```
modularizando el proyecto lo mas que se pueda

## Template (carpeta)

Dentro estara el dashobard y/o template para los siguientes tipos de usuario:
* Operador - *Ya implementado* -
* Administrador - *Pendiente* -
* Usuario - *Pendiente* -

las mismas mediante sus modulos llaman a todos los componentes pertenecientes al tipo de usuario

## Pages (Carpeta)
Aqui estara distribuido igual segun los tipos de usuario:
* Operador - *Ya elaborado* -
* Administrador - *Pendiente* -
* Usuario - *Pendiente* -

el diseño es intuitivo, cada componente funciona de manera independiente a otro, estos componentes son llamados desde el template correspondiente para ser utilizado. a su vez se le asigna una ruta en el siguiente archivo [Operador-template.routing.ts](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/front_angular/src/app/components/templates/operador-template/operador-template.routing.ts).


### Operador 

para el operador se tienen las siguientes paginas

* contactos
* agregar_contactos 
* editar_contactos
* historial_llamadas
* grabaciones
* roles
* tracking
* cuentas

con  **Todos** sus componentes dirigiendo a Sass.

si encuentran algun error o alguna observacion me lo hacen saber 

_Atentamente: uno del front :v_
