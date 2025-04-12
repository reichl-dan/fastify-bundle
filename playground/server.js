import fastify from 'fastify'
import fastifyBundle from 'fastify-bundle'

/**
 * Starts a new Fastify server with the core plugin
 */
async function startServer() {
  const server = fastify()
  await server.register(fastifyBundle)
  await server.start()
  return server
}

// Start server if this file is run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  startServer()
    .then((server) => {
      const addresses = server.addresses()
      console.log('🌎 Server running on:', addresses)

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `🔍 Swagger UI available at: http://localhost:${addresses[0].port}/docs\n`,
        )
      }
    })
    .catch((err) => {
      console.error('Failed to start server:', err)
      process.exit(1)
    })
}
