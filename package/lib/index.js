import fp from 'fastify-plugin'
import * as config from './config.js'
import { registerErrorHandler } from './plugins/error-handler.js'
import { registerHealthCheck } from './plugins/health-check.js'
import { registerHelmet } from './plugins/helmet.js'
import { registerLogger } from './plugins/logger.js'
import { registerMonitoring } from './plugins/monitoring.js'
import { registerSensible } from './plugins/sensible.js'
import { registerStartServer } from './plugins/start-server.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('types/index.d.ts').FastifyBundleOptions} FastifyBundleOptions
 */

/**
 * Registers all plugins with the given options
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {FastifyBundleOptions} [options={}] - The plugin options
 */
async function defineFastifyBundle(server, options = {}) {
  // Register production plugins
  await registerLogger(server, options.logger)
  await registerErrorHandler(server)
  await registerMonitoring(server)
  await registerSensible(server)
  await registerHelmet(server, options.helmet)

  // Register CORS
  if (options.cors) {
    const { registerCors } = await import('./plugins/cors.js')
    await registerCors(server, options.cors)
  }

  // Register cookie
  if (options.cookie) {
    const { registerCookie } = await import('./plugins/cookie.js')
    await registerCookie(server, options.cookie)
  }

  // Register rate limit
  if (options.rateLimit) {
    const { registerRateLimit } = await import('./plugins/rate-limit.js')
    await registerRateLimit(server, options.rateLimit)
  }

  // Register development plugins
  if (config.isDevelopment) {
    const { registerSwagger } = await import('./plugins/swagger.js')
    await registerSwagger(server, options.swagger)
  }

  // Register server start decorator
  await registerStartServer(server)

  // Register health check route
  await registerHealthCheck(server, options.healthCheck)
}

export default fp(defineFastifyBundle, {
  name: 'fastify-bundle',
  fastify: '>=4.0.0',
  dependencies: [],
})
