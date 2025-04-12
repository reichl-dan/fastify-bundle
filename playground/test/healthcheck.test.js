import tap from 'tap'
import fastify from 'fastify'
import fastifyBundle from 'fastify-bundle'

tap.test('Custom healthcheck endpoint', async (t) => {
  const server = fastify()
  const customHealthResponse = { status: 'ok', custom: 'My unique health message' }

  // Register the plugin with a custom healthcheck response
  await server.register(fastifyBundle, {
    healthCheck: customHealthResponse,
  })

  // Ensure server closes after the test
  t.teardown(() => server.close())

  // Inject a request to the healthcheck endpoint
  const response = await server.inject({
    method: 'GET',
    url: '/health',
  })

  // Assert the response
  t.equal(response.statusCode, 200, 'should return status code 200')
  t.same(
    response.json(),
    customHealthResponse,
    'should return the custom healthcheck response',
  )
})
