var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var HomeController = Promise.promisifyAll(require('./HomeController'));
var tokenCheck = require('../auth/tokenCheck.js');

router.use(tokenCheck);

router.route('/os')
  .get(function (req, res) {
    'use strict';
    Promise.all([
      HomeController.getHostnameAsync(),
      HomeController.getUptimeAsync(),
      HomeController.getTypeAsync(),
      HomeController.getLoadAvgAsync(),
      HomeController.getTotalMemoryAsync()
    ])
    .then(function (stats){
      var sys = {};

      sys['hostname'] = stats[0];
      sys['uptime'] = stats[1];
      sys['type'] = stats[2];
      sys['load'] = stats[3];
      sys['memory'] = stats[4];
      res.end(JSON.stringify(sys));
    })
    .catch(function (err){
      console.error('couldn\'t query system stats', err);
      res.end();
    });

  });

module.exports = router;
