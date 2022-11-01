(()=>{

    const moment = require('moment');
    const Properties = require('./Properties');
    const Logger = require('./Logger');

    const axios = require('axios');
    const domain = Properties.integration_core.domain;
    const timeout = Properties.integration_core.timeout;

    let PaV2Request = axios.create({
        baseURL: domain,
        timeout: timeout,
    });

    PaV2Request.interceptors.request.use((request)=>{
        let currentConfig = {
            headers: {},
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
        const timeMs = endDate.diff(startDate);
        metadata.timeMs = timeMs;
        Logger.info(`[Response] [Code: ${status}] [${method.toUpperCase()}] [milliseconds response time: ${timeMs}] [Domain: ${baseURL} Endpoint: ${url}]`);
        Logger.debug(`[Response] Body: ${JSON.stringify(data)}`);
        return response;
    });

    module.exports = PaV2Request;

})();