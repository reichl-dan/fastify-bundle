import fp from 'fastify-plugin'
import * as config from '../config.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('fastify').FastifyError} FastifyError
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 * @typedef {import('fastify').FastifyReply} FastifyReply
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {number} statusCode
 * @property {string} error
 * @property {string} message
 * @property {string} [stack]
 * @property {Array<{message: string, field?: string}>} [validation]
 */

/**
 * Defines the error handler plugin functionality
 * @param {FastifyInstance} server - The Fastify server instance
 */
const defineErrorHandlerPlugin = async (server) => {
  server.setErrorHandler(
    /**
     * @param {FastifyError} error
     * @param {FastifyRequest} request
     * @param {FastifyReply} reply
     */
    (error, request, reply) => {
      // Log the error
      request.log.error({
        err: error,
        url: request.url,
        method: request.method,
        statusCode: error.statusCode,
      })

      // Apply default error response
      /** @type {ErrorResponse} */
      const response = {
        statusCode: reply.statusCode,
        error: error.name || 'Error',
        message: error.message || 'An error occurred',
      }

      // Handle validation errors
      if (error.validation) {
        response.statusCode = 400
        response.validation = error.validation.map(({ message, params }) => ({
          message: message || 'Validation error',
          field: params?.field?.toString(),
        }))
      }

      // Add stack trace in development
      if (config.isDevelopment && error.stack) {
        response.stack = error.stack
      }

      // Send the response
      reply.status(response.statusCode).send(response)
    },
  )
}

/**
 * Wraps the error handler plugin into fastify
 */
const errorHandlerPlugin = fp(defineErrorHandlerPlugin, {
  name: '@fastify-bundle/error-handler',
  dependencies: ['@fastify-bundle/logger'],
})

/**
 * Registers the error handler plugin
 * @param {import('fastify').FastifyInstance} server - The Fastify server instance
 * @returns {Promise<void>}
 */
export async function registerErrorHandler(server) {
  await server.register(errorHandlerPlugin)
}
