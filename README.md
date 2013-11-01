# unifi [![Build Status](https://travis-ci.org/cymen/unifi.png?branch=master)](https://travis-ci.org/cymen/unifi)

[![NPM](https://nodei.co/npm/unifi.png?downloads=true&stars=true)](https://npmjs.org/package/unifi)

`unifi` is an implementation of the Unifi API for node. The Unifi API is used to access Unifi networking equipment. The plan is to implement the equivalent of the unfi-api Python version. Currently, only the ability to login (and get the cookie for the session) and reboot are present.

## Example

Our program is going to tell the Unifi controller to reboot a specific access point identified by MAC address. Note the host, port, username and password are for connecting to the Unifi controller not the device.

    var login = require('./lib/login'),
        reboot = require('./lib/reboot');

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
    reboot returned: {"0":"{ \"data\" : [  null ] , \"meta\" : { \"rc\" : \"ok\"}}"}
