## Shorten URL Microservice

Author: [Deepak Pagaro](https://www.linkedin.com/in/deepak-p-2a9076b/)

Shorten URL Backend project is developed for the DeepOrigin Senior Software Engineer interview.


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
 
