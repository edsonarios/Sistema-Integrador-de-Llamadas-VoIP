# SISTEMA INTEGRADOR DE LLAMADAS VOIP (Front - End)

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
 - iax.tx
 - sala.ts
 - sip.ts
 - user.ts
 - voicemail.ts
 
**Todos** estos archivos ya estan implementados, importados y en funcionamiento.
  

### Services :space_invader:

Dentro del directorio se encuentran los metodos que hacen de puente para la conexion con el back-end y comunicacion del front-end.

 - animations.tx
 - global.ts
 - sip.service.ts
 - user.service.ts

 **Todos** estos archivos ya estan implementados, importados y en funcionamiento.

## Tabla de Tareas del proyecto :pencil:

###### Templates 

###### Estilos 


###### Servicios y Modelos

Se tiene los siguientes simbolos como:

>- :ballot_box_with_check: Terminado
>- :clock3: En pausa
>- :point_right: En progreso
>- :black_square_button: Pendiente
 
_prueba_

- :ballot_box_with_check: Tarea 1
- :ballot_box_with_check: Tarea 2
- :clock3: Tarea 3
- :ballot_box_with_check: Tarea 4
- :point_right: Tarea 5
- :black_square_button: Tarea 6
- :black_square_button:	Tarea 7


## Resumen General Front-End

- Templates _80% terminado_
- Estilos _70% terminado_
- Servicios _40% terminado_
