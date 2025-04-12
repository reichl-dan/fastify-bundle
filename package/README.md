# Fastify Bundle Plugin

A comprehensive Fastify plugin that combines essential plugins and utilities commonly required for API development. This plugin provides a robust foundation for building scalable web services with a single registration. All included plugins can be easily customized through a global configuration object.

## Features

- **Plugin Collection**: Combines essential Fastify plugins into a single, easy-to-use package
- **Type Safety**: Includes TypeScript declarations for enhanced developer experience and code reliability
- **Production Ready**: Includes essential security, monitoring, and performance features
- **Flexible Configuration**: All bundled plugins can be configured through a single configuration object
- **API Documentation**: Automatic Swagger/OpenAPI documentation in development mode

## Included Plugins

### Official Fastify Plugins
- `@fastify/cors`: Configurable CORS support (included only when cors config is provided)
- `@fastify/helmet`: Security headers for protection against common web vulnerabilities
- `@fastify/cookie`: Cookie parsing and serialization (included only when cookie config is provided)
- `@fastify/rate-limit`: Request rate limiting for API protection (included only when rateLimit config is provided)
- `@fastify/sensible`: Adds useful utilities and HTTP helpers
- `@fastify/swagger` & `@fastify/swagger-ui`: API documentation (development mode only)

### Custom Plugins
- **Logger Plugin**: Enhanced logging with request tracking and pretty printing in development
- **Monitoring Plugin**: Request duration tracking and performance monitoring
- **Error Handler**: Standardized error responses with validation support
- **Server Start Plugin**: Graceful server startup/shutdown with environment-based configuration
- **Health Check**: Built-in health check endpoint for monitoring

## Installation

```bash
npm install fastify-bundle
# or
pnpm add fastify-bundle
# or
yarn add fastify-bundle
```

## Usage

### Basic Usage

The simplest way to use the plugin:

```typescript
import fastify from 'fastify'
import fastifyBundle from 'fastify-bundle'

async function main() {
  const server = fastify()
  await server.register(fastifyBundle)
  await server.start()
  return server
}

main()
```

### Configuring Plugins

All bundled plugins can be configured through an options object when registering the core plugin. Optional plugins like cors, cookie, and rate-limit are only included when their respective configurations are provided. Type declarations are provided, so auto-complete and typechecking can be used when configuring the plugins.

```typescript
import fastify from 'fastify'
import fastifyBundle from 'fastify-bundle'

async function main() {
  const server = fastify()
  await server.register({
    // Include and configure CORS
    cors: {
      origin: ['https://your-domain.com'],
      credentials: true,
    },
    // Include and configure cookie parsing
    cookie: {
      secret: "my-secret",
      parseOptions: {},
    },
    // Include and configure rate limiting
    rateLimit: {
      max: 100,
      timeWindow: '1 minute',
    },
    // Configure custom health check response
    healthCheck: {
      status: 'ok',
      version: '1.0.0',
    },
  })
  await server.start({
    host: '0.0.0.0',
    port: 8080,
  })
  return server
}

main()
```

The server will use default configurations for required plugins if no options are provided. Optional plugins are only included when their configuration is specified in the options object.
