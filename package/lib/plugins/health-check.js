import fp from 'fastify-plugin'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('types/plugins/health-check.d.ts').HealthCheckOptions} HealthCheckOptions
 */

/**
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {HealthCheckOptions} [options={}] - Health check configuration options
 */
async function defineHealthCheckPlugin(server, options = {}) {
  server.get('/health', async () => {
    return options ?? { status: 'ok' }
  })
}

export const registerHealthCheck = fp(defineHealthCheckPlugin, {
  name: '@fastify-bundle/health-check',
})
