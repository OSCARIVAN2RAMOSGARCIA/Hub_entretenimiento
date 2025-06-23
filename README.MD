# Komodo TV 🎬  
*Aplicacion de angular funcional,sobre contenido de streaming con consumo a base de datos SQL SERVER , con una API desarrollada en .NET.*

# Mockup de figma 
https://www.figma.com/design/FZ01wSZviG2jvTYJfvo3db/Untitled?node-id=3-3&p=f&t=94U8sSarTeaif8Yj-0

## Descripción  
Aplicacion de streaming con una gran variedad de peliculas y series para disfrutar con tu familia. 

## 🎯 Objetivo

Describe el propósito del proyecto.  
Por ejemplo:

- Implementar lazyloading.  
- T-SQL  
- Login ya con base de datos 
- Implementacion de base de datos 
- Consumo de la base de datos
- Seguridad de login

## Capturas de Funcionamiento  
![Captura de pantalla 1](/Resourses/login.png)  
![Captura de pantalla 2](/Resourses/home.png) 
![Captura de pantalla 3](/Resourses/home2.png) 

## Capturas de test codeCoverage  
![Captura de pantalla 4](/Resourses/codeCoverage.png) 
![Captura de pantalla 5](/Resourses/test.png) 

## Capturas de test de API en postman 

![Captura de pantalla 4](/Resourses/GET.png) 
![Captura de pantalla 5](/Resourses/PostRegistro.png) 
![Captura de pantalla 5](/Resourses/loginPost.png) 

## Diagrama Entidad relacion  
![Captura de pantalla 5](/Resourses/EntidaRelacionDiagram.png) 

## Instalación y Uso  
Sigue estos pasos para ejecutar Komodo TV en tu máquina:

1. Clona el repositorio:  
   ```HTTPS
   git clone https://github.com/OSCARIVAN2RAMOSGARCIA/Hub_entretenimiento.git

# Ejecutar proyecto de angular

2. Accede a Frontend/hub_entretenimiento 
3. Instala las dependencias con un npm install
3. Y escribir el comando ng serve -o para ejecutarlo

## Docker 
![Captura de pantalla 3](/Resourses/docker.png) 
Aqui se puede ver el container de la base de datos y el container de la aplicacion y sus respectivos dockerfile

## Ejecutar API en .NET 8 

4. Accede a Backend/ContenidoApi 
5. Instala las dependencias con un dotnet restore
6. Y escribir el comando dotnet run para ejecutarlo

## Ejecutar base de datos en SQL server 

7. Accede a Database/KomodoDB.sql
8. Cargala en tu Gestor de Base de datos 

## Dependencias o bibliotecas que hayan usado con nombre y versión
* Para la API utilice Microsoft.EntityFrameworkCore version 8
* Frontend provideHttpClient en angular version 
## Descripción de como lo hiciste
Utilice la guia impartida por nuestro challenger y tambien tome algunas funciones del curso de C# .net como el uso de la libreria entity framework asi como la creacion de modelos y DTOs para tener un manejo adecuado de los datos que se manejaran en la API asi como la creacion de controladores estableciendo cada endpoint su configuracion correspondiente, ademas agregue el cors ya que no permitia consumir la api por que necesitaba tenerlo activo y configurado por seguridad.

Implementacion de JWT para crear tokens esto permite tener un token temporal para la sesion y tuve que crear una super secret key para que pudiera cifraser las password

Una vez teniendo la API siimplemente sustitui el json que tenia de Mockup por la ruta de la API ya que ya tenia la libreria http asi como su configuracion 
## Documentación de la API - Swagger
![Captura de pantalla 5](/Resourses/swagger.png) 
![Captura de pantalla 5](/Resourses/post.png) 

## EndPoints
- POST: */api/auth/registro*: Para el registro del usuario 
- POST: */api/auth/login*: Para el Login 
- GET: *api/contenido*:Para consumir el contenido

## APARTADO DE POSIBLES MEJORAS FUTURAS
* Me falta arreglar el endpoint de favoritos para agregar y consumir los favoritos para tambien almacenarlos en localstorage 
* Me falta agregaR un boton para cerrar sesion

## Desarrollo  
## Problemas conocidos
- 🛠 Logre implementar el login seguro con la DB asi como tambien logre consumir el contenido de entretenimiento , solo me falto hacer funcionar los endpoints de favoritos, enviar favoritos y traer favoritos 

## Retrospectiva
  
   1. ¿Qué hice bien?  
   - La base de datos la realice de manera simple normalizada, estableci relaciones utilizando foreing key y primary key, agregue sus modelos y dtos ademas de crear un controlardor y servicio para cada una de las secciones, la creacion de token la implementacion de cors y asi como tambien la documentacion swagger 

   - Se implemento un login seguro encriptando la password y guardandola de una manera dificil de decifrar en la base de datos 

   2. ¿Qué no salió bien?
   - Falto hacer funcionar los endpoints de favoritos, enviar favoritos y traer favoritos 

   3. ¿Qué puedo hacer diferente?
   - La parte del CORS especifique exactamente y me gustaria hacerlo mas dinamico en caso que cambie de puerto mi aplicacion de Angular  