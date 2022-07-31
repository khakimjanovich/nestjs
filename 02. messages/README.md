<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Messages application

## Request handler

    POST /messages/5?validate=true HTTP/1.1
    HOST: localhost:5003
    Content-Tpye: application/json
    {"content":"hi there"}

Here you can access request properties with different decorators
* @Parameter() : in order to get request route parameter
* @Query() : to get request query, here validate=true
* @Headers() : to access the request headers
* @Body() : to get the body of the request

## Validation Pipe
* Use class-transformer to turn the body into an instance of the DTO class
* Use class-validator to validate the instance
* If there are validation errors, respond immediately, otherwise provide body to request handler

### How Type info is preserved?
* "experimentalDecorators": true,
* "emitDecoratorMetadata": true