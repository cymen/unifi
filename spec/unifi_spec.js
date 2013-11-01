describe('unifi', function() {
  xit('reboot', function() {
    var unifi = require('../lib/unifi');

    unifi({
      host: '10.0.1.1',
      port: '8443',
      username: 'username',
      password: 'password'
    })
      .reboot('00:27:22:fc:b0:73');
  });
});
