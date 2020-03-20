const axios = require('axios');
const wol = require('wol');

exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body);

    axios({
        method: 'post',
        data: data.macAddress
    }).then(response => {
        console.log(response.config.data);
        wol.send(response.config.data);
        callback(null, {
            statusCode: 200,
            body: 'Success'
        });
    }).catch(err =>{
        console.log(err);
        callback(new Error('Failed'));
    });
}