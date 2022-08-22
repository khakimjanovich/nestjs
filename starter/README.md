<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description a nestjs starter

I should create a boilerplate for admin panel api. It will contain an

* auth api
* users api
* roles api
* permissions api

In the project there will be these dependencies

* TypeScript
* Expressjs
* TypeOrm
* Swagger
* Passport JWT
* CASL

### Day one

1. The aim is to create production/development/test modes' setup for database

Installed database dependencies for type orm and config module to handle to 
configuration for different modes

```    
    npm install --save @nestjs/typeorm typeorm pg config sqlite3 cross-env class-validator class-transformer
    npm install --save-dev @nestjs/config
```

### Day two

1. The aim is to create authentication/authorization

```    
    npm install --save @nestjs/passport @nestjs/jwt- passport passport-local passport-jwt
    npm install --save-dev @types/passport-jwt @types/passport-local
```
### Day three

1. The aim is to create documentation

```
    npm install --save @nestjs/swagger
```