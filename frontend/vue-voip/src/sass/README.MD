# SASS
## Arquitectura ITCSS para el desarrollo de los estilos CSS

Orden de las carpetas

* **1. Settings**. Declararemos las variables
* **2. Tools**. Los mixins y funciones.
* **3. Generic**. El código genérico del proyecto, el reset de CSS, el Normalize o tus propios estilos, son los que incluiremos en esta carpeta.
* **4. Element**. Para  los estilos que afectan a los elementos del HTML. No incluiremos el estilo para las clases.
* **5. Object**. Aquí sí, incorporaríamos las clases y colocaríamos todo lo relacionado con el layout.
* **6. Components** : Todo lo que afecte a los diferentes bloques de nuestro documento, navegador, botones, recuadros de utilidades, cabecera, buscador,botones sociales, etc., debería de ir en esta carpeta. Dependiendo de las necesidades que tenga el proyecto, la carpeta Components tendrá más o menos ajustes, como es lógico.
* **7 Utilities**. Para finalizar, en esta carpeta colocaríamos utilidades que sobrescriban estilos significativos (incompatibilidades con navegadores)