'use strict'

const orderService = require('../../services/OrderService');

module.exports = async function (fastify, _) {
  fastify.post('/create', async function (request, _) {
    const order = request.body;
    const result = await orderService.getOrder(order);
    return result
  })
}
