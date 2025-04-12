import cookie from '@fastify/cookie'
import * as config from '../config.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('@fastify/cookie').FastifyCookieOptions} FastifyCookieOptions
 * @typedef {import('types/plugins/cookie.d.ts').CookieOptions} CookieOptions
 */

/**
 * Registers and configures the cookie plugin
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {CookieOptions} [options] - Cookie configuration options
 */
export async function registerCookie(server, options) {
  /** @type {FastifyCookieOptions} */
  const params = {
    secret: config.cookieSecret,
    hook: 'onRequest',
    parseOptions: {
      secure: config.isProduction,
      httpOnly: true,
      sameSite: 'lax',
      ...options?.parseOptions,
    },
    ...options,
  }

  await server.register(cookie, params)
}
