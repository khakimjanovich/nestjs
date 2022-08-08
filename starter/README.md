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

The aim is to:

* create production/development/test modes setup for database
*

Installed database dependencies for type orm and config module

```    
    npm install --save @nestjs/typeorm typeorm pg config sqlite3 cross-env
    npm install --save-dev @nestjs/config
```
