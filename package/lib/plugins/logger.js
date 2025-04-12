import fp from 'fastify-plugin'
import { pino } from 'pino'
import * as config from '../config.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('types/plugins/logger.d.ts').LoggerPluginOptions} LoggerPluginOptions
 */

/**
 * Defines the logger plugin functionality
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {LoggerPluginOptions} [options] - Logger configuration options
 */
const defineLoggerPlugin = async (server, options) => {
  /** @type {pino.LoggerOptions} */
  const pinoConfig = {
    level: config.logLevel,
    transport: config.isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
    ...options,
  }

  // Override the default logger
  server.log = pino(pinoConfig)

  // Add request logging hook
  server.addHook('onRequest', (request, reply, done) => {
    request.log.info({
      method: request.method,
      url: request.url,
      id: request.id,
    })
    done()
  })
}

/**
 * Wraps the logger plugin into fastify
 */
const loggerPlugin = fp(defineLoggerPlugin, {
  name: '@fastify-bundle/logger',
})

/**
 * Registers the logger plugin
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {LoggerPluginOptions} [options] - Logger configuration options
 * @returns {Promise<void>}
 */
export async function registerLogger(server, options) {
  await server.register(loggerPlugin, options ?? {})
}
