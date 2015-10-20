
var path = require('path');

module.exports = function nodeadmin(app, express) {

  var databaseRouter = express.Router();
  require('./database/databaseRoutes.js')(databaseRouter);
  app.use('/nodeadmin/db', databaseRouter);

  var settingsRouter = express.Router();
  require('./settings/settingsRoutes.js')(settingsRouter);
  app.use('/nodeadmin/settings',settingsRouter);

  var systemRouter = express.Router();
  require('./system/systemRoutes.js')(systemRouter);
  app.use('/nodeadmin/system',systemRouter);

  var homeRouter = express.Router();
  require('./home/homeRoutes.js')(homeRouter);
  app.use('/nodeadmin/home',homeRouter);

  var authRouter = express.Router();
  require('./auth/authRoutes.js')(authRouter);
  app.use('/nodeadmin/auth',authRouter);

  app.use('/nodeadmin/', function(req,res,next){
    res.send('eyyy in admin');
  });

  return function nodeadmin(req,res,next) {
    var parts = path.parse(req.url);
    if(parts.name !== 'nodeadmin') {
      next();
    }
  }
  

};
