const axios = require('axios')
const wol = require('wol')

exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body)

    console.log(data)

    axios({
        method: 'post',
        url: 'http://requestbin.net/r/19wesms1',
        data: data.macAddress
    }).then(response => {
        console.log(response.config.data, function(err, res){
            console.log(res)
        })
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