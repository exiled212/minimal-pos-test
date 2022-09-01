'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const orderSevice = require('./services/OrderService')
const fastifyEnv = require('@fastify/env')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  const schema = {
    type: 'object',
    required: [ 
      'WORKER_TIME_MS', 
      'MS_REQUEST_DOMAIN', 
      'MS_REQUEST_TIMEOUT',
      'MS_REQUEST_AUTH_HEADER_INDEX',
      'MS_REQUEST_AUTH_HEADER_VALUE'
    ],
    properties: {
      WORKER_TIME_MS: {
        type: 'number',
        default: 5000
      },
      MS_REQUEST_DOMAIN: {
        type: 'string',
      },
      MS_REQUEST_TIMEOUT: {
        type: 'number',
        default: 30000
      },
      MS_REQUEST_AUTH_HEADER_INDEX: {
        type: 'string',
        default: 'X-Authorization'
      },
      MS_REQUEST_AUTH_HEADER_VALUE: {
        type: 'string',
      }
    }
  }

  fastify
    .register(fastifyEnv, {
      dotenv: true,
      schema: schema
    })
    .ready((err)=>{
      if (err) console.log(err);
    });
  
  setInterval(orderSevice.getOrders, process.env.WORKER_TIME_MS);

}
