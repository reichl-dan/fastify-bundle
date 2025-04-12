/**
 * The environment the application is running in
 * @type {'production' | 'development'}
 */
export const nodeEnv =
  String(process.env.NODE_ENV).toLowerCase() === 'production'
    ? 'production'
    : 'development'

/**
 * The production mode of the application
 * @type {boolean}
 */
export const isProduction = nodeEnv === 'production'

/**
 * The development mode of the application
 * @type {boolean}
 */
export const isDevelopment = nodeEnv === 'development'

/**
 * The port the application is running on
 * @type {number}
 */
export const port =
  process.env.PORT && Number.parseInt(process.env.PORT) > 0
    ? Number.parseInt(process.env.PORT)
    : isProduction
      ? 8080
      : 3000

/**
 * The host the application is running on
 * @type {string}
 */
export const host = process.env.HOST ?? (isProduction ? '0.0.0.0' : 'localhost')

/**
 * The log level for the application
 * @type {'fatal' | 'error' | 'warn'| 'info' | 'debug' | 'trace' | 'silent'}
 */
export const logLevel =
  Reflect.get(
    {
      fatal: 'fatal',
      error: 'error',
      warn: 'warn',
      info: 'info',
      debug: 'debug',
      trace: 'trace',
      silent: 'silent',
    },
    String(process.env.LOG_LEVEL).toLowerCase(),
  ) ?? 'info'

/**
 * The secret key for the cookie
 * @type {string}
 */
export const cookieSecret = process.env.COOKIE_SECRET ?? 'development-secret'
