/* jshint strict: false, unused: false */
var express = require('express');
var router = express.Router();
var tokenCheck = require('../auth/tokenCheck.js');
var DbController = require('./databaseController.js');

router.use(tokenCheck);

router.route('/')
  .get(function(req, res) {
    'use strict';
    res.send('eyyyy in db');
  });

  
router.route('/:database/fk/:refTable/:refColumn')
  .get(DbController.getForeignValues);  

router.route('/:database/:table')
  .delete(DbController.dropTable)
  .post(DbController.createTable);

router.route('/:database/tables')
  .get(DbController.getTables);

router.route('/:database/:table/:page')
  .get(DbController.getRecords)
  .put(DbController.updateRecord)
  .post(DbController.addRecord);  


router.route('/performance')
  .get(DbController.getPerformanceStats);

router.route('/info')
  .get(DbController.getInfoStats);

router.route('/query')
  .post(DbController.queryClientDB);

router.route('/db')
  .get(DbController.getDatabases);

router.route('/connect')
  .get(DbController.connect);

router.route('/create')
  .post(DbController.createDatabase);

router.route('/delete')
  .post(DbController.deleteDatabase)


module.exports = router;
