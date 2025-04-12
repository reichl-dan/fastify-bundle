import helmet from '@fastify/helmet'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('@fastify/helmet').FastifyHelmetOptions} FastifyHelmetOptions
 * @typedef {import('types/plugins/helmet.d.ts').HelmetOptions} HelmetOptions
 */

/**
 * Registers and configures the helmet plugin for security headers
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {HelmetOptions} [options] - Helmet configuration options
 */
export async function registerHelmet(server, options) {
  const params = {
    global: true,
    ...options,
  }

  await server.register(helmet, params)
}
