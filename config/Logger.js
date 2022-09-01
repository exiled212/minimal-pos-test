(()=>{
    const {createLogger, transports, format} = require('winston');
    dateFormat = () => {
        return new Date(Date.now()).toUTCString()
    }

    const Logger = createLogger({
        transports: [
          new transports.Console(),
          new transports.File({
            filename: `./data.log`
          })
        ],
        format: format.printf((info)=>{
            let message = `${dateFormat()} [${info.level.toUpperCase()}]  ${info.message}`;
            message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
            message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
            return message;
        })
    });


    module.exports = Logger;
})();