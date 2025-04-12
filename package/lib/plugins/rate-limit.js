import rateLimit from '@fastify/rate-limit'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('@fastify/rate-limit').RateLimitOptions} FastifyRateLimitOptions
 * @typedef {import('types/plugins/rate-limit.d.ts').RateLimitOptions} RateLimitOptions
 */

/**
 * Registers and configures the rate limit plugin
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {RateLimitOptions} [options] - Rate limit configuration options
 */
export async function registerRateLimit(server, options) {
  /** @type {FastifyRateLimitOptions} */
  const params = {
    max: 100,
    timeWindow: '1 minute',
    ...options,
  }

  await server.register(rateLimit, params)
}
