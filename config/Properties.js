(()=>{
    module.exports =  {
        domain: process.env.MS_REQUEST_DOMAIN,
        timeout: process.env.MS_REQUEST_TIMEOUT,
        headers: {
            token:{
                index: process.env.MS_REQUEST_AUTH_HEADER_INDEX,
                value: process.env.MS_REQUEST_AUTH_HEADER_VALUE
            }
        },
    }
})();