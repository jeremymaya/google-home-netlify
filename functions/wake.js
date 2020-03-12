const wol = require('wol');

exports.handler = function(event, context, callback) {
    if (event.httpMethod !== "POST") {
        callback(new Error("Invalid HTTP request"));
        return;
    }

    const data = JSON.parse(event.body);

    if (!data.macAddress) {
        callback(new Error("MAC address missing"));
        return;
    }

    wol.wake(data.macAddress);

    callback(null, {
        statusCode: 200,
        body: "Success"
    });
}