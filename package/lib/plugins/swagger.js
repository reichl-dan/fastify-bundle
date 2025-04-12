import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import fp from 'fastify-plugin'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('@fastify/swagger').FastifyDynamicSwaggerOptions} FastifyDynamicSwaggerOptions
 * @typedef {import('@fastify/swagger-ui').FastifySwaggerUiOptions} FastifySwaggerUiOptions
 * @typedef {import('types/plugins/swagger.d.ts').SwaggerOptions} SwaggerOptions
 */

/**
 * Defines the Swagger plugin configuration
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {SwaggerOptions} options - Swagger configuration options
 */
async function defineSwaggerPlugin(server, options) {
  /** @type {FastifyDynamicSwaggerOptions} */
  const swaggerOptions = {
    swagger: {
      info: {
        title: options.title ?? 'API Documentation',
        description: options.description ?? 'API documentation powered by Swagger',
        version: options.version ?? '1.0.0',
      },
    },
  }

  /** @type {FastifySwaggerUiOptions} */
  const swaggerUiOptions = {
    routePrefix: options.routePrefix ?? '/docs',
  }

  await server.register(swagger, swaggerOptions)
  await server.register(swaggerUi, swaggerUiOptions)
}

/**
 * Wraps the Swagger plugin into fastify
 */
const swaggerPlugin = fp(defineSwaggerPlugin, {
  name: '@fastify-bundle/swagger',
  dependencies: ['@fastify-bundle/logger'],
})

/**
 * Registers the Swagger plugin
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {SwaggerOptions} [options] - Swagger configuration options
 */
export async function registerSwagger(server, options) {
  await server.register(swaggerPlugin, options ?? {})
}
