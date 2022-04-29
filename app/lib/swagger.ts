import { SwaggerOptions } from 'fastify-swagger';

const swaggerOptions: SwaggerOptions = {
  routePrefix: '/doc',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'MY TASK',
      description:
        'Building a blazing fast REST API with Node.js, Postgresql, Fastify and Swagger',
      version: '1.0.0'
    },
    host: '0.0.0.0',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
};
export default swaggerOptions;
