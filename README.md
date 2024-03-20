## Shorten URL Microservice


A REST API service that takes a full valid URL and returns a miniURL id like aRnwQ. This miniURL id can be used by a frontend to redirect it to the actual website.

e.g. URL at the frontend side could look like ```http://localhost:3000/aRnwQ``` which may translate to  

```https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiV0rP8o_-EAxViF1kFHZr_DUUQFnoECBUQAQ&url=https%3A%2F%2Fdev.to%2Fthawkin3%2Fwhat-i-look-for-when-hiring-senior-software-engineers-4a6j&usg=AOvVaw16L2BhLUVxPWZfA8g8pehL&opi=89978449``` when accessed.

The endpoints in this API enable creation of convenient short URLs and also has support for profile/account management.
This project is developed using Node.js, TypeScript.js, Express.js, MongoDB, Docker and Jest for unit testing. 

This is a REST API service.


This project uses node version 20.11.1 This project comes with a Swagger API Doc route. 
## Instructions
To install docker refer https://docs.docker.com/engine/install/


To access swagger doc first start the docker service as follows:



```docker compose up --build```


This will create and start the mongoDB resource along with the Shorten URL backend service.


Please ensure the ports used by this project are not already in use or adjust things accordingly.

 Hit ```localhost:3333/api/v1/health``` to run the health check. 

 The API docs are created in swagger.yml using OpenAPI spec 3.0.3.
 Once the server is up and running you can hit 
 
 ```localhost:3333/api-docs```
 
 to view the API docs. You can also try out the API by clicking execute on the Swagger Doc while serving in your local device!

 
 Please note that you may have issues viewing swagger doc serving on the doc route if using Safari due to its security defaults. I recommend using Google Chrome browser to view the swagger docs serving on the doc router. 
 
 Alternatively, you can copy contents of the swagger.yml and paste it in the online editor https://editor.swagger.io to view the API docs but it won't successfully let you execute or test if server is running in your local. You may have to make those API calls in postman or other clients. 
 
