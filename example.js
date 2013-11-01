var login = require('./lib/commands/login'),
    reboot = require('./lib/commands/reboot');

var host = '10.0.1.1',
    port = '8443',
    username = 'administrator',
    password = 'password';

login(host, port, username, password)
  .then(function(cookie) {
    return reboot(host, port, cookie, '00:27:22:fc:b1:db');
  })
  .then(function() {
    console.log('reboot returned: ' + JSON.stringify(arguments));
  });
