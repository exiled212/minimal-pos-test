(()=>{
    module.exports =  {
        pa_v2:{
            domain: process.env.MS_REQUEST_PAV2_DOMAIN,
            timeout: process.env.MS_REQUEST_TIMEOUT,
            headers: {
                token:{
                    index: process.env.MS_REQUEST_PAV2_AUTH_HEADER_INDEX,
                    value: process.env.MS_REQUEST_PAV2_AUTH_HEADER_VALUE
                }
            },
        },
        integration_core: {
            domain: process.env.MS_REQUEST_IC_DOMAIN,
            timeout: process.env.MS_REQUEST_TIMEOUT,
            headers: {},
        }
    }
})();