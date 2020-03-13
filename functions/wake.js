const axios = require('axios');
const wol = require('wakeup');

exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body);

    axios({
        method: 'post',
        url: 'http://requestbin.net/r/1ax4yog1',
        data: data.macAddress
    }).then(response => {
        console.log(response.config.data)
        wol.sendWOL(response.config.data);
        callback(null, {
            statusCode: 200,
            body: 'Success'
        });
    }).catch(err =>{
        console.log(err)
        callback(new Error('Failed'))
    });
}