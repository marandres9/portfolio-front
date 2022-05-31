# Mi Portfolio - Mariano Perez

### Argentina Programa - [#YoProgramo](http://www.yoprogramo.org.ar/)

### Capa Frontend

Desarrollada con [Angular](https://angular.io/) y hosteada en [Firebase](https://console.firebase.google.com/):

[my-portfolio-65acc.web.app](https://my-portfolio-65acc.web.app/)

Repositorio de la capa frontend: [github.com/marandres9/portfolio-back](https://github.com/marandres9/portfolio-back)

Estructura de la pagina web:

    -Navbar
    -Router
        \-portfolio-page
            \-sections (Secciones)
                \-content (Contenido)
                \-forms (Formularios de edición)
        \-login-page
    -Footer

Una vez autorizado, el usuario es devuelto a la pagina principal con el Router, donde puede alternar entre ver el contenido de la página como un usuario normal y acceder a grupos de formularios con los que se puede modificar el portfolio.

Componentes especificos o reutilizables como los botones de edición y las tarjetas para la sección de proyectos se guardan en la carpeta ***components/***. Por otro lado, en la capa ***models/*** se encuentran los modelos de los objetos recibidos desde el servidor, y en la carpeta ***service/*** se guardan los servicios que utiliza la aplicación, los cuales comprenden el servicio de autenticación que verifica si el usuario posee un JWT válido. Esto lo hace exponiendo un método público que acepta una función que realiza una petición al servidor como argumento, entonces el servicio verifica si el usuario está autorizado y llama a la función o avisa al usuario en caso de que el token no se encuentre o el mismo haya expirado.

Además, se utiliza un interceptor que se encarga de agregar el token a las peticiones que requieren de autorización antes de que sean enviadas al backend. Por último, un servicio http es el que hace las peticiones, enviando o recibiendo los datos.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.
