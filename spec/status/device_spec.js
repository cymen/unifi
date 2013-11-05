describe('device', function() {
  var cookie = 'abc123',
      host = 'localhost',
      nock = require('nock'),
      port = 8000;

  it('sends a device status request', function(done) {
    nock('https://' + host + ':' + port)
      .post('/api/stat/device')
      .reply(200, JSON.stringify({
        "data" : [
          { "mac": "00:00", "name": "ap1" },
          { "mac": "00:01", "name": "ap2" }
        ],
        "meta" : { "rc" : "ok"}
      }));

    var device = require('../../lib/status/device');
    device(host, port, cookie)
      .done(function(data) {
        expect(data.length).toEqual(2);
        expect(data[0].name).toBe("ap1");
        done();
      });
  });

  it('handles case where server returns unexpected value', function(done) {
    nock('https://' + host + ':' + port)
      .post('/api/stat/device')
      .reply(500);

    var device = require('../../lib/status/device');
    device(host, port, cookie)
      .done(function() {}, function(result) {
        expect(result).toContain('error');
        done();
      });
  });
});
