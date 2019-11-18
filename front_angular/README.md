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

- Operador - _Ya implementado_ -
- Administrador - _Pendiente_ -
- Usuario - _Pendiente_ -

las mismas mediante sus modulos llaman a todos los componentes pertenecientes al tipo de usuario

## Pages (Carpeta)

Aqui estara distribuido igual segun los tipos de usuario:

- Operador - _Ya elaborado_ -
- Administrador - _Pendiente_ -
- Usuario - _Pendiente_ -

el diseño es intuitivo, cada componente funciona de manera independiente a otro, estos componentes son llamados desde el template correspondiente para ser utilizado. a su vez se le asigna una ruta en el siguiente archivo [Operador-template.routing.ts](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/front_angular/src/app/components/templates/operador-template/operador-template.routing.ts).

### Operador

para el operador se tienen las siguientes paginas

- contactos
- agregar_contactos
- editar_contactos
- historial_llamadas
- grabaciones
- roles
- tracking
- cuentas

con **Todos** sus componentes dirigiendo a Sass.

si encuentran algun error o alguna observacion me lo hacen saber

_Atentamente: uno del front :v_




- TEMPLATES ====> Richard
- ESTILOS ======> Jorge
- SERVICIOS ====> Henry

=====TEMPLATES=====

- ( Listo ) Quitar el router de Contactos
- ( Listo ) Crear el componente de Salas
- ( Listo ) Crear el componente para Agenda
- ( Listo ) Crear el componente para Notificaciones
- ( Listo ) Enlazar en tablas los componentes (notificaciones,salas,agenda) a la columna Lateral
- ( Listo ) Crear el template de llamada SIP (Notificaciones)
- ( Listo ) Crear el template de Salas 
- ( Listo ) Crear el template para agendas
- ( Listo ) Crear modelos locales para los componentes (notificaciones,salas,agenda)
- ( Listo ) Agregar Nabvar para Historial de llamadas
- ( Listo ) Crear modelo de Grabaciones
- ( Listo ) Crear un template de reproductor de audio
- ( Listo ) Agregar un gestor de opciones para salir del sistema

- Añadir el Template de Administrador
- Crear Dashboard para el Administrador (solo 2 columnas)
- Crear el Componente de Contactos-Operadores
- Crear el componente de Añadir Contactos
- Crear el componente de Grabaciones
- incorporar el modulo de reproductor de audio
- Crear el componente de Tracking
- Crear el componente de Historial de llamadas

- Probar descargas

=====ESTILOS=====
- ( Listo ) ESTILOS OPERADOR
- ( Listo ) Añadir estilos al template de Agenda
- ( Listo ) Añadir estilos al template de panel de estados
- ( Listo ) Añadir estilos al template de notificaciones
- ( Listo ) Añadir estilos al template de salas
- ( Listo ) Añadir estilos al template de contactos
- ( Listo ) Añadir estilos al componente del escritorio para llamadas 
- ( En Curso ) Estandarizar colores


- añadir estilos a el dashboard-administrador
- Añadir estilos grid para el template del adminsitrador
- incorporar estilos a los formularios de añadir y editar contactos
- añadir estilos a la lista de contactos
- añadir estilos a el historial de llamadas
- añadir estilos a el tracking
- añadir estilos a las grabaciones


=====SERVICIOS=====
- Agarrar todos los datos del usuario al Ingresar Y mostrarlos
- Obtener todas las Salas
- Obtener todos los contactos
- Obtener el historial de llamadas
- Obtener los datos de las grabaciones

- Modificar un contacto
- Eliminar un contacto
- Añadir una sala
- Dar de alta un contacto
- Dar de alta una radio
- Obtener el historial de llamadas de un operador
- Obtener el registro de grabaciones de un operador