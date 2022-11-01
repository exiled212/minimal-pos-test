(()=>{

    const moment = require('moment');
    const Properties = require('./Properties');
    const Logger = require('../config/Logger');

    const axios = require('axios');
    const domain = Properties.pa_v2.domain;
    const timeout = Properties.pa_v2.timeout;
    const tokenIndex = Properties.pa_v2.headers.token.index;
    const tokenValue = Properties.pa_v2.headers.token.value;

    let PaV2Request = axios.create({
        baseURL: domain,
        timeout: timeout,
    });

    PaV2Request.interceptors.request.use((request)=>{
        let currentConfig = {
            headers: {
                [tokenIndex]: tokenValue
            },
            metadata: {
                startDate: moment()
            }
        } 
        return {...request, ...currentConfig};
    });

    PaV2Request.interceptors.response.use((response)=>{
        const { status, data, config } = response;
        const { baseURL, method, url, metadata } = config;
        const { startDate } = metadata;
        const endDate = moment();
        Logger.info(`[Response] [Code: ${status}] [${method.toUpperCase()}] [milliseconds response time: ${endDate.diff(startDate)}] [Domain: ${baseURL} Endpoint: ${url}]`);
        Logger.debug(`[Response] Body: ${JSON.stringify(data)}`);
        return response;
    });

    module.exports = PaV2Request;

})();