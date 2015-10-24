angular.module('nodeadmin.services', [])

.factory('Auth', ['$http', '$window', function($http, $window) {
  var login = function(user) {
    return $http({
      method: 'POST',
      url: '/nodeadmin/api/auth/login',
      data: user
    }).then(function(resp) {
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

}])

.factory('System', function ($http) {
  var getModules = function() {
    return $http({
      method: 'GET',
      url: '/nodeadmin/api/system/modules'
    }).then(function(resp) {
      console.log('this is the module resp: ', resp)
      return resp;
    })
  }

  return {
    getModules: getModules
  }
})

.factory('Stats', function ($http) {
  return {
    serverStats:function() {
      return $http({
        method:'GET',
        url:'/nodeadmin/api/home/os'
      })
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return err
      });
    }
  };

});
  



