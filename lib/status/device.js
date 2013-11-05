module.exports = function(hostname, port, cookie, mac) {
  var https = require('https'),
      Promise = require('promise'),
      querystring = require('querystring'),
      _ = require('underscore')._;

  var options = {
    hostname: hostname,
    port: port,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
  };

  var data = querystring.stringify({
    json: JSON.stringify({})
  });

  var promise = new Promise(function(resolve, reject) {
    var req = https.request(_.extend({}, options, {
      path: '/api/stat/device',
      method: 'POST',
      headers: {
        'Cookie': cookie,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    }), function(res) {
      if (res.statusCode === 200) {
        var str = '';
        res.on('data', function(chunk) {
          str += chunk;
        });
        res.on('end', function() {
          var object = JSON.parse(str);
          resolve(object.data);
        });
      }
      else {
        reject('error - server ' + res.statusCode);
      }
    });

    req.write(data);
    req.end();
  });

  return promise;
};
