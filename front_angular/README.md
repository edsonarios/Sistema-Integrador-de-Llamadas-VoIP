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
- (Listo) Crear el template del operador
- (Listo) Crear el componente de Salas
- (Listo) Crear el componente para Agenda
- (Listo) Crear el componente para Notificaciones
- (Listo) Crear el componente Historial de llamadas
- (Listo) Crear el componente Grabaciones
- (Listo) Crear el enrutamiento entre componentes
- (Listo) Enlazar en tablas los componentes (notificaciones,salas,agenda) a la columna Lateral
- (Listo) Crear el template de llamada SIP (Notificaciones)
- (Listo) Crear modelos locales para los componentes (notificaciones,salas,agenda)
- (Listo) Agregar Nabvar para Historial de llamadas
- (Listo) Agregar Nabvar para grabaciones
- (Listo) Crear modelo de Grabaciones
- (Listo) Crear un template de reproductor de audio
- (Listo) Agregar un gestor de opciones para salir del sistema
- (Listo) Añadir el Template de Administrador
- (Listo) Crear Dashboard para el Administrador (solo 2 columnas)
- (Listo) Crear el Componente de Contactos-Operadores
- (Listo) Crear el componente de Añadir Contactos
- (Listo) Crear el componente de Grabaciones
- (Listo) incorporar el modulo de reproductor de audio
- (Listo) Crear el componente de Tracking
- (Listo) Crear el componente de Historial de llamadas
- (Listo) Crear modelos locales para el escritorio
- (Listo) Hacer interactuable el escritorio con las salas
- (Listo) Hacer interactuable el escritorio con las Notificaciones
- (Listo) Hacer interactuable el escritorio con el panel
- (En curso) Incorporar funcionalidades al reproductor de audio con sonido
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
- (Listo) Añadir estilos al componente de Agenda
- (Listo) Añadir estilos al componente de panel de estados
- (Listo) Añadir estilos al componente de notificaciones
- (Listo) Añadir estilos al componente de salas
- (Listo) Añadir estilos al componente de contactos
- (Listo) Añadir estilos al componente del escritorio para llamadas 
- (En curso) Estandarizar colores
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
- (Listo) Crear los modelos de usuarios
- (Listo) Crear los modelos de Salas
- (Listo) crear los modelos de Sip
- (Listo) Añadir servicio de Login
- (Listo) Añadir servicio para Agregar usuario
- (En curso) Añadir servicio para editar usuario
- Añadir servicio para dar de alta un usuario
- Añadir servicio para crear una sala
- Añadir servicio para editar una sala
- Añadir servicio para dar de alta una sala
- Añadir servicio para obtener el historial de llamadas
- Añadir servicio para obtener las grabaciones
```

## Resumen General Front-End

- Templates _80% terminado_
- Estilos _70% terminado_
- Servicios _40% terminado_
