const axios = require('axios')
const wol = require('wol')

exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body)

    axios({
        method: 'post',
        url: 'http://requestbin.net/r/19wesms1',
        data: data.macAddress
    }).then(response => {
        wol.wake(response.config.data)
        callback(null, {
            statusCode: 200,
            body: 'Success'
        })
    }).catch(err =>{
        console.log(err)
        callback(new Error('Failed'))
    })
}