# Cambios Front-End Noviembre 2019

Se han realizado varios avances y muchos cambios en su mayoria la estructura y contenido respecto a modulos y enrutamientos.
Asi tambien se asignaron los siguientes roles:
- TEMPLATES  -_Richard_-
- ESTILOS  -_Jorge_-
- SERVICIOS  -_Henry_-


## Gestion del proyecto

Se han creado 2 carpetas en las cuales, se gestionaran los archivos del sistema , los cuales son:

```
Templates
```
_y tambien_

```
Pages
```

modularizando el proyecto lo mas que se pueda

## Templates (carpeta)

Dentro estara el dashobard y/o template para los siguientes tipos de usuario:

- :heavy_check_mark: Operador
- :heavy_check_mark: Administrador 

las mismas mediante sus modulos llaman a todos los componentes pertenecientes al tipo de usuario

## Pages (Carpeta)

Aqui estara distribuido igual segun los tipos de usuario:

- :heavy_check_mark: Operador 
- :heavy_check_mark: Administrador 
- :heavy_check_mark: Login 

el diseño es intuitivo, cada componente funciona de manera independiente a otro, estos componentes son llamados desde el template correspondiente para ser utilizado. a su vez se le asigna una ruta en el siguiente archivo  de cada template
-[Operador-template.routing.ts](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/front_angular/src/app/components/templates/operador-template/operador-template.routing.ts).
-[administrador-template.routing.ts](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/front_angular/src/app/components/templates/administrador-template/administrador-template.routing.ts)

## Tipos de Usuario 
### Operador

para el operador se tienen los siguientes componentes

- :heavy_check_mark: agenda
- :heavy_check_mark: historial_llamadas
- :heavy_check_mark: grabaciones
- :heavy_check_mark: dialpad
- :heavy_check_mark: tracking
- :heavy_check_mark: sala
- :heavy_check_mark: Panel
- :heavy_check_mark: notificacion

### Administrador

para el Administrador se tienen los siguientes componentes

- :heavy_check_mark: Contactos
- :heavy_check_mark: Agregar_contactos
- :heavy_check_mark: Editar_contactos
- :heavy_check_mark: historial_llamadas
- :heavy_check_mark: grabaciones
- :heavy_check_mark: Salas
- :heavy_check_mark: tracking

con **Todos** sus componentes dirigidos a la carpeta con los estilos Sass.



## Tareas del proyecto (Noviembre 2019)


```
**TEMPLATES**
- :ballot_box_with_check: Crear el template del operador
- :ballot_box_with_check: Crear el componente de Salas
- :ballot_box_with_check: Crear el componente para Agenda
- :ballot_box_with_check: Crear el componente para Notificaciones
- :ballot_box_with_check: Crear el componente Historial de llamadas
- :ballot_box_with_check: Crear el componente Grabaciones
- :ballot_box_with_check: Crear el enrutamiento entre componentes
- :ballot_box_with_check: Enlazar en tablas los componentes (notificaciones,salas,agenda) a la columna Lateral
- :ballot_box_with_check: Crear el template de llamada SIP (Notificaciones)
- :ballot_box_with_check: Crear modelos locales para los componentes (notificaciones,salas,agenda)
- :ballot_box_with_check: Agregar Nabvar para Historial de llamadas
- :ballot_box_with_check: Agregar Nabvar para grabaciones
- :ballot_box_with_check: Crear modelo de Grabaciones
- :ballot_box_with_check: Crear un template de reproductor de audio
- :ballot_box_with_check: Agregar un gestor de opciones para salir del sistema
- :ballot_box_with_check: Añadir el Template de Administrador
- :ballot_box_with_check: Crear Dashboard para el Administrador (solo 2 columnas)
- :ballot_box_with_check: Crear el Componente de Contactos-Operadores
- :ballot_box_with_check: Crear el componente de Añadir Contactos
- :ballot_box_with_check: Crear el componente de Grabaciones
- :ballot_box_with_check: incorporar el modulo de reproductor de audio
- :ballot_box_with_check: Crear el componente de Tracking
- :ballot_box_with_check: Crear el componente de Historial de llamadas
- :ballot_box_with_check: Crear modelos locales para el escritorio
- :ballot_box_with_check: Hacer interactuable el escritorio con las salas
- :ballot_box_with_check: Hacer interactuable el escritorio con las Notificaciones
- :ballot_box_with_check: Hacer interactuable el escritorio con el panel
- :arrow_right: Incorporar funcionalidades al reproductor de audio con sonido
- Probar descargas
- Importar las animaciones faltantes de transicion
- Desplegar datos mediante servicio al template-operador
- Desplegar datos mediante servicio al template-administrador
- Optimizar metodos por componente
- Realizacion de pruebas
- Mandar a produccion
```

```
**ESTILOS**

	_OPERADOR_
- :ballot_box_with_check: Añadir estilos al componente de Agenda
- :ballot_box_with_check: Añadir estilos al componente de panel de estados
- :ballot_box_with_check: Añadir estilos al componente de notificaciones
- :ballot_box_with_check: Añadir estilos al componente de salas
- :ballot_box_with_check: Añadir estilos al componente de contactos
- :ballot_box_with_check: Añadir estilos al componente del escritorio para llamadas 
- :arrow_right: Estandarizar colores
	_ADMINISTRADOR_
- añadir estilos a el dashboard-administrador
- Añadir estilos grid para el template del adminsitrador
- incorporar estilos a los formularios de añadir y editar contactos
- añadir estilos al componente de Contactos
- añadir estilos al componente de historial de llamadas
- añadir estilos al componente de tracking
- añadir estilos al componente de grabaciones
- añadir animaciones

```

```
**SERVICIOS**
- :ballot_box_with_check: Crear los modelos de usuarios
- :ballot_box_with_check: Crear los modelos de Salas
- :ballot_box_with_check: crear los modelos de Sip
- :ballot_box_with_check: Añadir servicio de Login
- :ballot_box_with_check: Añadir servicio para Agregar usuario
- :arrow_right: Añadir servicio para editar usuario
- Añadir servicio para dar de alta un usuario
- Añadir servicio para crear una sala
- Añadir servicio para editar una sala
- Añadir servicio para dar de alta una sala
- Añadir servicio para obtener el historial de llamadas
- Añadir servicio para obtener las grabaciones
```

## Resumen General Front-End

-Templates _80% terminado_
-Estilos _70% terminado_
-Servicios _40% terminado_
