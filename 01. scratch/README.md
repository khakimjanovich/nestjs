# Scratch

## Dependencies

* @nestjs/common - Contains the vast majority of functions, classes, etc., that we need from NestJS
* @nestjs/platform-express - Lets Nest use Express JS for handling HTTP requests
* reflect-metadata - Helps make decorators work. Tons more on this in just a minute!
* typescript - We write Nest apps with TypeScript
* @nestjs/core - 

## Set up TS compiler settings
In this case create tsconfig.json file.





## Tooling

* PIPE - Validate data contained in the request 
* GUARD - Make sure the user is authenticated or authorized
* CONTROLLER - Route the request to a particular function / Handles incoming requests
* SERVICE - Run some business logic / Handles data access and business logic
* REPOSITORY - Access a database / Handles data stored in DB
* MODULES - Groups together code
* FILTERS - Handles errors that occur during request handling
* INTERCEPTORS - Adds extra logic to incoming requests or outgoing responses
