# unifi [![Build Status](https://travis-ci.org/cymen/unifi.png?branch=master)](https://travis-ci.org/cymen/unifi)

[![NPM](https://nodei.co/npm/unifi.png?downloads=true&stars=true)](https://npmjs.org/package/unifi)

`unifi` is an implementation of the Unifi API for node. The Unifi API is used to access Unifi networking equipment. The plan is to implement the equivalent of the unfi-api Python version. Currently, only the ability to login (and get the cookie for the session) and reboot are present.

## Warning

The example below is using commands directly. The plan is to go to a more chained approach which should be less verbose and have less duplication. There may be some changes that break things although I would like to keep each command isolated as they are now so that those that want to use them directly can do so.

## Examples

### Listing access points

Our program is going to ask the Unifi controller for all of the devices it knows about. Note the host, port, username and password are for connecting to the Unifi controller not the device.

    var login = require('./lib/commands/login'),
        device = require('./lib/status/device');

    var host = '10.0.1.1',
        port = '8443',
        username = 'admin',
        password = 'aflite';

    login(host, port, username, password)
      .then(function(cookie) {
        return device(host, port, cookie);
      })
      .then(function(devices) {
        devices.forEach(function(ap) {
          console.log(ap.mac);
        });
      });

And running it (MAC addresses anonymized):

    $ node example.js
    00:27:22:xx:yy:zz
    00:27:22:xx:yy:zz
    00:27:22:xx:yy:zz
    dc:9f:db:xx:yy:zz
    dc:9f:db:xx:yy:zz
    dc:9f:db:xx:yy:zz
    dc:9f:db:xx:yy:zz

### Rebooting access points

Our program is going to tell the Unifi controller to reboot a specific access point identified by MAC address. Note the host, port, username and password are for connecting to the Unifi controller not the device.

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

And running it:

    $ node example.js
    reboot returned: {"0":[null]}
