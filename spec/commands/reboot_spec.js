describe('reboot', function() {
  var cookie = 'abc123',
      host = 'localhost',
      mac = '00:27:22:fc:b0:73',
      nock = require('nock'),
      port = 8000,
      server;

  it('sends a reboot request', function(done) {
    nock('https://' + host + ':' + port)
      .post('/api/cmd/devmgr')
      .reply(200, 'OK');

    var reboot = require('../../lib/commands/reboot.js');
    reboot(host, port, cookie, mac)
      .done(function(result) {
        expect(result).toEqual('OK');
        done();
      });
  });

  it('handles case where server returns unexpected value', function(done) {
    nock('https://' + host + ':' + port)
      .post('/api/cmd/devmgr')
      .reply(500);

    var reboot = require('../../lib/commands/reboot.js');
    reboot(host, port, cookie, mac)
      .done(function() {}, function(result) {
        expect(result).toContain('error');
        done();
      });
  });
});
