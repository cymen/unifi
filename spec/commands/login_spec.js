describe('login', function() {
  var cookie = 'abc123',
      host = 'localhost',
      nock = require('nock'),
      port = 8000,
      server;

  it('returns session cookie', function(done) {
    nock('https://' + host + ':' + port)
      .post('/login')
      .reply(302, 'OK', {
        'set-cookie': cookie
      });

    var login = require('../../lib/commands/login.js');
    var promise = login(host, port, 'username', 'password');
    promise.done(function(result) {
      expect(result).toEqual(cookie);
      done();
    });
  });

  it('handles case where server returns unexpected value', function(done) {
    nock('https://' + host + ':' + port)
      .post('/login')
      .reply(500);

    var login = require('../../lib/commands/login.js');
    var promise = login(host, port, 'username', 'password');
    promise.done(function() {}, function(result) {
      expect(result).toContain('error');
      done();
    });
  });
});
