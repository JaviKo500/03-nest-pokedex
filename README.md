<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 # Execute in dev

 1. Clone repository
 2. Execute
 ```
 yarn install
 ```
 3. Have nest cli
 ```
 npm i -g @nestjs/cli
 ```
 4. Up database
 ```
 docker-compose uo -d
 ```
 5. reconstruction db with seed
 ```
 http://localhost:3000/api/v2/seed
 ```

 ## Stack
 * MongoDB
 * Nest