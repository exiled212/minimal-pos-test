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
      'WORKER_CREATE_ORDER_INTERVAL',
      'MS_REQUEST_TIMEOUT',
      'MS_REQUEST_PAV2_DOMAIN', 
      'MS_REQUEST_PAV2_AUTH_HEADER_INDEX',
      'MS_REQUEST_PAV2_AUTH_HEADER_VALUE',
      'MS_REQUEST_IC_DOMAIN'
    ],
    properties: {
      WORKER_TIME_MS: {
        type: 'number',
        default: 5000
      },
      WORKER_CREATE_ORDER_INTERVAL: {
        type: 'number',
        default: 1
      },
      MS_REQUEST_PAV2_DOMAIN: {
        type: 'string',
      },
      MS_REQUEST_TIMEOUT: {
        type: 'number',
        default: 30000
      },
      MS_REQUEST_PAV2_AUTH_HEADER_INDEX: {
        type: 'string',
        default: 'X-Authorization'
      },
      MS_REQUEST_PAV2_AUTH_HEADER_VALUE: {
        type: 'string',
      },
      MS_REQUEST_IC_DOMAIN: {
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

  orderSevice.createOrderInterval()

}
