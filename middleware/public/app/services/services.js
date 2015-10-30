/* jshint strict: false */
angular.module('nodeadmin.services', [])

.factory('Auth', ['$http', '$window',
  function($http, $window) {
    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/nodeadmin/api/auth/login',
        data: user
      }).then(function (resp) {
        return resp.data.token;
      });
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem('nodeadmin');
    };

    return {
      login: login,
      isAuth: isAuth,
    };

  }
])

.factory('System', function($http) {
  var getModules = function() {
    return $http({
      method: 'GET',
      url: '/nodeadmin/api/system/modules'
    }).then(function (resp) {
      return resp;
    });
  };

  return {
    getModules: getModules
  };
})

.factory('Stats', function($http) {
  return {
    serverStats: function() {
      return $http({
          method: 'GET',
          url: '/nodeadmin/api/home/os'
        })
        .then(function (resp) {
          return resp;
        })
        .catch(function(err) {
          return err;
        });
    }
  };

})

.factory('RecordsFactory', ['$http',
  function($http) {
    return {
      getRecords: function(db, table, page) {
        return $http.get('/nodeadmin/api/db/' + db + '/' + table + '/' + page)
          .then(function (resp) {
            return resp.data;
          })
          .catch(function(err) {
            return err;
          });
      },
      editRecord: function(db, table, page, data) {
        return $http.put('/nodeadmin/api/db/' + db + '/' + table + '/' + page, data)
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          return err;
        });
      }
    };
  }
])

.factory('DBInfoFactory', ['$http',
  function($http) {
    var getPerformanceTimers = function() {
      return $http({
        method: 'GET',
        url: '/nodeadmin/api/db/performance',
      }).then(function(resp) {
        // console.log(resp);
        return resp.data;
      });
    };
    var getInfo = function() {
      return $http({
        method: 'GET',
        url: '/nodeadmin/api/db/info',
      }).then(function(resp) {
        // console.log(resp);
        return resp.data;
      });
    };

    return {
      getPerformanceTimers: getPerformanceTimers,
      getInfo: getInfo
    };
}])

.factory('QueryFactory', ['$http', 
  function ($http) {
    var submit = function (query) {
      return $http.post('/nodeadmin/api/db/query', JSON.stringify({'data': query}))
        .then(function (resp) {
          return resp;
        })
        .catch(function(err) {
          return err;
        });
    };
    return {
      submit: submit
    };
  }
])
  
.factory('Tables', ['$http',
  function($http) {

    // Allow access to table name between DeleteTable & TableView controllers
    var dropTableName;

    var getTables = function(databaseName) {
      return $http({
        method: 'GET',
        url: '/nodeadmin/api/db/' + databaseName + '/tables'
      }).then(function(response) {
        return response.data;
      });
    };

    var saveTableName = function(tableName) {
      dropTableName = tableName;
    };

    var returnDropTableName = function() {
      return dropTableName;
    };

    var dropTable = function(databaseName, tableName) {
      return $http({
        method: 'DELETE',
        url: '/nodeadmin/api/db/' + databaseName + '/' + tableName + ''
      }).then(function(response) {
        return response.data;
      });
    };

    return {
      getTables: getTables,
      saveTableName: saveTableName,
      returnDropTableName: returnDropTableName,
      dropTable: dropTable,
    };
  }
])

.factory('DatabaseFactory', ['$http', 
  function ($http) {
    return {
      createDB:function(name) {
        return $http({
          method:'POST',
          url:'/nodeadmin/api/db/create/',
          data:name
        })
        .then(function (res) {
          return res;
        });
      },

      deleteDB: function (name) {
        return $http({
          method:'POST',
          url:'/nodeadmin/api/db/delete/',
          data:name
        })
        .then(function (res){
          return res;
        });
      }
    };

}]);
