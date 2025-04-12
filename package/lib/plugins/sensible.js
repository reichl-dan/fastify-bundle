import sensible from '@fastify/sensible'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 */

/**
 * Registers the sensible plugin which adds many useful utilities
 * @param {FastifyInstance} server - The Fastify server instance
 */
export async function registerSensible(server) {
  await server.register(sensible)
}
