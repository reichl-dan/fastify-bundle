import fp from 'fastify-plugin'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 */

/**
 * Defines the monitoring plugin functionality
 * @param {FastifyInstance} server - The Fastify server instance
 */
const defineMonitoringPlugin = async (server) => {
  server.addHook('onRequest', (request, reply, done) => {
    Reflect.set(request, 'startTime', process.hrtime())
    done()
  })

  server.addHook('onResponse', (request, reply, done) => {
    const startTime = Reflect.get(request, 'startTime')
    const diff = process.hrtime(startTime)
    const duration = diff[0] * 1e3 + diff[1] * 1e-6 // Convert to milliseconds
    request.log.info({
      statusCode: reply.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      method: request.method,
      url: request.url,
    })
    done()
  })
}

/**
 * Wraps the monitoring plugin into fastify
 */
const monitoringPlugin = fp(defineMonitoringPlugin, {
  name: '@fastify-bundle/monitoring',
  dependencies: ['@fastify-bundle/logger'],
})

/**
 * Registers the monitoring plugin
 * @param {FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>}
 */
export async function registerMonitoring(server) {
  await server.register(monitoringPlugin)
}
