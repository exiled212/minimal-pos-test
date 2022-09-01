
(async ()=>{
    const Logger = require('../config/Logger');
    const PaV2Request = require('../config/PaV2Request');

    async function getOrders(){
        try{
            const result = await PaV2Request.get(`/orders`);
            const {status, data} = result;
            if(status === 200){
                data.map(getOrder)
            }
        } catch(err){
            Logger.log({
                level: 'error',
                message: `Failed to get orders: ${err.message}`
            });
        }
    }

    async function getOrder(order){
        try {
            const id = order.order_detail.order_id;
            if(id % 2){
                await takeOrder(id)
            } else {
                await rejectOrder(id)
            }
        } catch (err) {}
        finally {
            return {
                code: 200,
                message: 'success'
            };
        }
        
    }
    
    async function takeOrder(orderId){
        try {
            const result = await PaV2Request.put(`/orders/${orderId}/take`);
            const {code} = buildResponse(result); 
            if(code === 200 && orderId % 3){
                await pickupOrder(orderId);
            }
        } catch(err){
            Logger.log({
                level: 'error',
                message: `[orderId: ${orderId}] Failed to take orders: ${err.message}`
            });
        }
    }

    async function rejectOrder(orderId){
        const body = {
            "reason": `test order: ${orderId}`,
            "cancel_type": "ORDER_MISSING_INFORMATION",
            "items_ids":[],
            "items_sku": []
        }
        try {
            await PaV2Request.put(`/orders/${orderId}/reject`, body);
        } catch(err){
            Logger.log({
                level: 'error',
                message: `[orderId: ${orderId}] Failed to take orders: ${err.message}`
            });
        }
    }

    async function pickupOrder(orderId){
        try {
            await PaV2Request.post(`/orders/${orderId}/ready-for-pickup`)
        } catch( err ){
            Logger.log({
                level: 'error',
                message: `[orderId: ${orderId}] Failed to take orders: ${err.message}`
            });
        }
    }

    function buildResponse(response){
        const {
            status,
            data
        } = response;
        return {
            code: status,
            content: data
        }
    }

    module.exports = {
        getOrder,
        getOrders
    }

})();