module.exports = function(hostname, port, username, password) {
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
    login: 'Login',
    username: username,
    password: password
  });

  var promise = new Promise(function(resolve, reject) {
    var req = https.request(_.extend({}, options, {
      path: '/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    }), function(res) {
      if (res.statusCode === 302) {
        resolve(res.headers['set-cookie']);
      }
      else {
        reject('error - server ' + res.statusCode);
      }
    });

    req.on('error', function(e) {
      reject(e.message);
    });

    req.write(data);
    req.end();
  });

  return promise;
};
