# Sistema Integrador de Llamadas VoIp (Front-End)

## Responsables :busts_in_silhouette:	
### Templates (_Encargado **Richard**_)

Orientado a la estructuracion de archivos y componentes, asi tambien el manejo de enrutamientos, eventos y creacion de formularios, manejo de modulos e importacion de paquetes.

### Estilos (_Encargado **Jorge**_)

Todo aspecto visual entre el usuario y el sistema, optando por la metodologia BEM utilizando Sass.
El cual nos permite tener todos los componentes, plantillas y vistas mas organizadas. Englobando todos los estilos en un solo directorio y modularizando su funcionamiento

### Servicios y Modelado (_Encargado **Henry**_)

Refiere a los objetos y clases que utilizaremos dentro del sistema, como los usuarios, salas, etc.
Utilizando Reactivex de su libreria rjxs, para crear los servicios, los mismos que se comunicaran con el Back-end mediante las Api's Rest Full

## Gestion del proyecto :open_file_folder:

El sistema esta subdivido en 2 carpetas dentro del directorio **app/components**:

### Templates

Dentro estara el dashobard correspondiente para cada tipo de usuario y el entorno en el cual navegara por el sistema

- Operador
   - Html del operador
   - Rutas del operador
   - Modulos del operador
   - Componente del operador
- Administrador
   - Html del administrador
   - Rutas del administrador
   - Modulos del administrador
   - Componente del administrador

las mismas mediante sus modulos llaman a todos los componentes pertenecientes al tipo de usuario

### Pages 

Dentro se encuentran los componentes y plantillas Html, donde se puede manipular la pagina mediante typescript y lenguaje de etiquetado.

- Inicio
   - Login
- Operador
   - agenda
   - historial_llamadas
   - grabaciones
   - dialpad
   - tracking
   - sala
   - panel
   - notificacion
- Administrador
   - Contactos
   - Agregar_contactos
   - Editar_contactos
   - historial_llamadas
   - grabaciones
   - Salas
   - tracking

**Todos** estos componentes y plantillas Html ya estan implementados, importados  y en funcionamiento.

### Sass :art:

Dentro de este directorio se encuentran todos los estilos que modifican y componen al sistema. Siguiento la metodologia BEM los cuales son:

- settings
   - colors.scss
   - dimensions.scss
   - fonts.scss
   - settings.scss
- tools
   - functions.scss
   - mixins.scss
   - tools.scss
- generic
   - generic.scss
- elements
   - elements.scss
- objects
   - objects.scss
- components
   - admin-dashboard.scss
   - Agenda.scss
   - components.scss
   - dashboard.scss
   - escritorio.scss
   - historial.scss
   - login.scss
   - navbar.scss
   - notificaciones.scss
   - panelEstados.scss
   - salas.scss
   - modaladdcontact.scss
- Utilities
   - utilities.scss
 
 **Todos** estos archivos ya estan implementados, importados y en funcionamiento.

### Models :clamp:

Dentro de este directorio se encuentran los modelos con sus respectivos atributos para poder manipularlos mejor en el sistema.

 - contacto.ts
 - crd.ts
 - extension.ts
 - iax.ts
 - sala.ts
 - sip.ts
 - user.ts
 - voicemail.ts
 
**Todos** estos archivos ya estan implementados, importados y en funcionamiento.
  

### Services :space_invader:

Dentro del directorio se encuentran los metodos que hacen de puente para la conexion con el back-end y comunicacion del front-end.

 - animations.ts
 - global.ts
 - sip.service.ts
 - user.service.ts

 **Todos** estos archivos ya estan implementados, importados y en funcionamiento.

## Resumen General Front-End :scroll:

| Modulo | Progreso |
| :---: | --- |
| Templates | _52.9% Terminado_ |
| Estilos | _44.4% Terminado_ |
| Servicios y Modelos | _23.4% Terminado_ |

(_Actualizado 23 de noviembre_)


## Tabla de Tareas del proyecto :pencil:
Para una mejor control sobre el avance del sistema se tiene el  manejo de los siguientes simbolos respecto a cada tarea :

| Simbolo | Significado |
| --- | --- |
| :ballot_box_with_check: | _Terminado_ |
| :clock3: | _En Pausa_ |
| :point_right: | _En Progreso_ |
| :black_square_button: | _Pendiente_ |

###### Templates 
- :ballot_box_with_check: Generar el nuevo proyecto con Angular 
- :ballot_box_with_check: Crear el template del operador
- :ballot_box_with_check: Crear el componente de Salas
- :ballot_box_with_check: Crear el componente para Agenda
- :ballot_box_with_check: Crear el componente para Notificaciones
- :ballot_box_with_check: Crear el componente Historial de llamadas
- :ballot_box_with_check: Crear el componente Grabaciones
- :ballot_box_with_check: Crear el enrutamiento entre componentes para el operador
- :ballot_box_with_check: Enlazar en tabs los componentes: notificaciones, salas y agenda a la columna Lateral
- :ballot_box_with_check: Crear el componente de llamada SIP (Notificaciones)
- :ballot_box_with_check: Crear modelos locales para los componentes (notificaciones,salas,agenda)
- :ballot_box_with_check: Agregar Nabvar para Historial de llamadas
- :ballot_box_with_check: Agregar Nabvar para grabaciones
- :ballot_box_with_check: Crear modelo de Grabaciones
- :ballot_box_with_check: Crear un componente de reproductor de audio
- :ballot_box_with_check: Agregar un gestor de opciones para salir del sistema
- :ballot_box_with_check: Crear el Template de Administrador
- :ballot_box_with_check: Crear el Componente de Contactos-Operadores
- :ballot_box_with_check: Crear el componente de Añadir Contactos
- :ballot_box_with_check: Crear el componente de Grabaciones
- :ballot_box_with_check: incorporar el modulo de reproductor de audio
- :ballot_box_with_check: Crear el componente de Tracking
- :ballot_box_with_check: Crear el componente de Historial de llamadas
- :ballot_box_with_check: Crear el enrutamiento entre componentes para el administrador
- :ballot_box_with_check: Crear modelos locales para el escritorio
- :ballot_box_with_check: Hacer interactuable el escritorio con las salas
- :ballot_box_with_check: Hacer interactuable el escritorio con las Notificaciones
- :clock3: Hacer interactuable el escritorio con el panel
- :point_right: añadir animacion faltant de transicion (entrada y salida) a las notificaciones
- :black_square_button: añadir animacion faltant de transicion (entrada y salida) a las Salas
- :black_square_button: añadir animacion de transicion (entrada y salida) al escritorio por evento
- :black_square_button: Añadir Scroll en los componentes para no pasarse del rango
- :black_square_button: añadir metodo a la barra de busqueda por agenda
- :black_square_button: crear componente donde ira el pipe de busqueda
- :black_square_button: adicionar metodos al template - operador para configuracion de microfono, audio y red(señal)
- :black_square_button: Añadir metodos al componente audio_player
- :black_square_button: Agregar metodos al componente para realizar descargas
- :black_square_button: Desplegar datos mediante servicio al template-operador
- :black_square_button: Desplegar datos mediante servicio al template-administrador
- :black_square_button: Adicionar las opciones restantes al Administrador
- :black_square_button: Adicionar componentes para dar de Alta un contacto
- :black_square_button: adicionar modal de verificacion para contactos
- :black_square_button: Adicionar componentes para dar de Alta una Sala
- :black_square_button: adicionar modal de verificacion para Salas
- :black_square_button: Optimizar metodos por componente
- :black_square_button: Realizacion de pruebas al operador
- :black_square_button: Realizacion de pruebas al administrador
- :black_square_button: Fusion del template del operador con la libreria para realizar llamadas
- :black_square_button: Ejecucion de Pruebas con la libreria
- :black_square_button: Pruebas generales
- :black_square_button: Mandar a produccion

###### Estilos 

- :ballot_box_with_check: Estructuracion y creacion de los archivos de Sass por BEM
- :ballot_box_with_check: Añadir estilos a el template-operador
- :ballot_box_with_check: Añadir estilos al componente de Agenda del operador
- :ballot_box_with_check: Añadir estilos al componente de panel de estados del operador
- :ballot_box_with_check: Añadir estilos al componente de notificaciones del operador
- :ballot_box_with_check: Añadir estilos al componente de salas del operador
- :ballot_box_with_check: Añadir estilos al componente de contactos del operador
- :ballot_box_with_check: Añadir estilos al dialpad
- :ballot_box_with_check: Añadir estilos al componente del escritorio para llamadas del operador 
- :ballot_box_with_check:  Estandarizar colores globales al sistema
- :point_right:            Añadir estilos al historial de llamadas del operador
- :point_right:            Añadir estilos a las grabaciones del operador
- :black_square_button:    Añadir estilos al tracking del operador
- :black_square_button:    Añadir estilos a los ajustes del operador
- :black_square_button:    Añadir estilos a el template-administrador
- :ballot_box_with_check:  Añadir estilos grid para el template del adminsitrador
- :black_square_button:    incorporar estilos a los formularios de añadir y editar contactos del administrador
- :black_square_button: Añadir estilos al componente de Contactos del administrador
- :black_square_button: Añadir estilos al componente de historial de llamadas del administrador
- :black_square_button: Añadir estilos al componente de tracking del administrador
- :black_square_button: Añadir estilos al componente de grabaciones del administrador
- :black_square_button: Añadir estilos.... (completar)
- :black_square_button: Añadir animaciones 


###### Servicios y Modelos

- :ballot_box_with_check: Crear el modelo Contacto
- :ballot_box_with_check: Crear el modelo crd
- :ballot_box_with_check: Crear el modelo extension
- :ballot_box_with_check: Crear el modelo sala
- :ballot_box_with_check: Crear el modelo sip
- :ballot_box_with_check: Crear el modelo user
- :ballot_box_with_check: Crear el modelo voicemail
- :ballot_box_with_check: Añadir servicio con la ip del servidor
- :ballot_box_with_check: Añadir servicio para iniciar sesion (login)
- :ballot_box_with_check: Servicio por rol (administrador y operador)
- :ballot_box_with_check: Añadir servicio para Agregar contacto como administrador
- :black_square_button: Seguridad en el manejo de rutas por URL
- :black_square_button: Añadir configuraciones adicionales, cuando se selecciona SIP o IAX
- :black_square_button: Añadir servicio al administrador para crear una sala
- :black_square_button: Añadir servicio al administrador para editar contacto
- :black_square_button: Añadir servicio al administrador para eliminar contacto
- :black_square_button: Añadir servicio al administrador para dar de alta un usuario
- :black_square_button: Añadir servicio al administrador para listar las salas existentes
- :black_square_button: Añadir servicio al administrador para crear una sala
- :black_square_button: Añadir servicio al administrador para editar una sala
- :black_square_button: Añadir servicio al administrador para dar de alta una sala
- :black_square_button: Añadir servicio al administrador para agregar participantes a una sala
- :black_square_button: Añadir servicio al administrador para expulsar a un participante de una sala 
- :black_square_button: Añadir servicio al administrador para obtener el historial de llamadas
- :black_square_button: Añadir servicio al administrador para filtrar por fecha el historial de llamadas
- :black_square_button: Añadir servicio al administrador para obtener el historial de llamadas Salientes
- :black_square_button: Añadir servicio al administrador para obtener el historial de llamadas Entrantes
- :black_square_button: Añadir servicio al administrador para obtener el historial de llamadas Perdidas
- :black_square_button: Añadir servicio al administrador para obtener las grabaciones
- :black_square_button: Añadir servicio al administrador para filtrar las grabaciones por fecha
- :black_square_button: Añadir servicio al administrador para obtener el tracking
- :black_square_button: Añadir configuracion del operador para Microfono
- :black_square_button: Añadir configuracion del operador para Audio
- :black_square_button: Añadir configuracion del operador para Red(señal)
- :black_square_button: Añadir servicio al operador servicio para obtener las salas disponibles
- :black_square_button: Añadir servicio al operador servicio para obtener los contactos
- :black_square_button: Añadir servicio al operador servicio para obtener un evento de llamada
- :black_square_button: Añadir servicio al operador para obtener el historial de llamadas
- :black_square_button: Añadir servicio al operador para filtrar por fecha el historial de llamadas
- :black_square_button: Añadir servicio al operador para obtener el historial de llamadas Salientes
- :black_square_button: Añadir servicio al operador para obtener el historial de llamadas Entrantes
- :black_square_button: Añadir servicio al operador para obtener el historial de llamadas Perdidas
- :black_square_button: Añadir servicio al operador para obtener las grabaciones
- :black_square_button: Añadir servicio al operador para filtrar las grabaciones por fecha
- :black_square_button: Añadir servicio al operador para reproducir llamada
- :black_square_button: Añadir servicio al operador para descargar audio de llamada
- :black_square_button: Añadir servicio al operador para obtener el tracking


 
---
© Copyright 2019 _Team Patelecom Developers_
