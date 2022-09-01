(()=>{

    const Properties = require('./Properties');

    const axios = require('axios');
    const domain = Properties.domain;
    const timeout = Properties.timeout;
    const tokenIndex = Properties.headers.token.index;
    const tokenValue = Properties.headers.token.value;

    const PaV2Request = axios.create({
        baseURL: domain,
        timeout: timeout,
        headers: {
        get: { [tokenIndex]: tokenValue, },
        post: { [tokenIndex]: tokenValue, },
        put: { [tokenIndex]: tokenValue, }
        }
    })

    module.exports = PaV2Request;

})();