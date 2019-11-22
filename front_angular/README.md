# SISTEMA INTEGRADOR DE LLAMADAS VOIP (Front - End)

## Responsables
### Templates (_Encargado **Richard**_)

Orientado a la estructuracion de archivos y componentes, asi tambien el manejo de enrutamientos, eventos y creacion de formularios, manejo de modulos e importacion de paquetes.

### Estilos (_Encargado **Jorge**_)

Todo aspecto visual entre el usuario y el sistema, optando por la metodologia BEM utilizando Sass.
El cual nos permite tener todos los componentes, plantillas y vistas mas organizadas. Englobando todos los estilos en un solo directorio y modularizando su funcionamiento

### Servicios y Modelado (_Encargado **Henry**_)

Refiere a los objetos y clases que utilizaremos dentro del sistema, como los usuarios, salas, etc.
Utilizando Reactivex de su libreria rjxs, para crear los servicios, los mismos que se comunicaran con el Back-end mediante las Api's Rest Full

## Gestion del proyecto :open_file_folder:

El sistema esta subdivido en 2 carpetas:

###### Templates

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

###### Pages 

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

el diseño es intuitivo, cada componente funciona de manera independiente a otro, estos componentes son llamados desde el template correspondiente para ser utilizado. a su vez se le asigna una ruta en el siguiente archivo  de cada template
-[Operador-template.routing.ts](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/front_angular/src/app/components/templates/operador-template/operador-template.routing.ts).
-[administrador-template.routing.ts](https://github.com/edsonarios/Sistema-Integrador-de-Llamadas-VoIP/blob/master/front_angular/src/app/components/templates/administrador-template/administrador-template.routing.ts)

**Todos** estos componentes y plantillas Html ya estan implementados y en funcionamiento.

## Tabla de Tareas del proyecto 

- [x] Prueba de tarea concluida
- [ ] Prueba tarea pendiente 1
- [ ] prueb tarea pendiente 2

- :heavy_check_mark: prueba tarea 3
- :heavy_check_mark: preuba tarea 4

## Resumen General Front-End

- Templates _80% terminado_
- Estilos _70% terminado_
- Servicios _40% terminado_
