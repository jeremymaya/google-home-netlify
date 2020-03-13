const axios = require('axios');
const net = require('net');
const udp = require('dgram');
/**
 * [createMagicPacket]
 * @param  {[type]} mac [description]
 * @return {[type]}     [description]
 * @wiki https://en.wikipedia.org/wiki/Wake-on-LAN
 * @docs http://support.amd.com/TechDocs/20213.pdf
 */
function createMagicPacket(mac){
  const MAC_REPEAT    = 16;
  const MAC_LENGTH    = 0x06;
  const PACKET_HEADER = 0x06;
  const parts  = mac.match(/[0-9a-fA-F]{2}/g);
  if(!parts || parts.length != MAC_LENGTH)
    throw new Error(`malformed MAC address "${mac}"`);
  var buffer = Buffer.alloc(PACKET_HEADER);
  var bufMac = Buffer.from(parts.map(p => parseInt(p, 16)));
  buffer.fill(0xff);
  for(var i = 0; i < MAC_REPEAT; i++){
    buffer = Buffer.concat([ buffer, bufMac ]);
  }
  return buffer;
};
/**
 * [wake on lan]
 * @param  {[type]}   mac      [description]
 * @param  {[type]}   options  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function wake(mac, options, callback){
  options = options || {};
  if(typeof options == 'function'){
    callback = options;
  }
  const { address, port } = Object.assign({
    address : '192.168.1.255',
    port    : 7
  }, options);
  // create magic packet
  var magicPacket = createMagicPacket(mac);
  var socket = udp.createSocket(
    net.isIPv6(address) ? 'udp6' : 'udp4'
  ).on('error', function(err){
    socket.close();
    callback && callback(err);
  }).once('listening', function(){
    socket.setBroadcast(true);
  });
  return new Promise((resolve, reject) => {
    socket.send(
      magicPacket, 0, magicPacket.length,
      port, address, function(err, res){
        let result = res == magicPacket.length;
        if(err) reject(err);
        else resolve(result);
        callback && callback(err, result);
        socket.close();
    });
  });
};

exports.handler = function(event, context, callback) {
    const data = JSON.parse(event.body);

    axios({
        method: 'post',
        url: 'http://requestbin.net/r/1ax4yog1',
        data: data.macAddress
    }).then(response => {
        console.log(response.config.data)
        wake(response.config.data)
        callback(null, {
            statusCode: 200,
            body: 'Success'
        });
    }).catch(err =>{
        console.log(err)
        callback(new Error('Failed'))
    });
}