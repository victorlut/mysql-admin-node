angular.module('nodeadmin.db.query', ['ui.codemirror'])

.controller('QueryController', ['$scope', 'QueryFactory', 'AlertCenter', function ($scope, QueryFactory, AlertCenter) {
  $scope.loading = false;
  

  // adds $scope.alerts obj with success and error array [{status: str, msg: str}]
  // adds $scope.closeAlert function 
  AlertCenter.addAll($scope); 
  console.log($scope.alerts)
  $scope.alerts.table = []; // for use with a separate alert

  $scope.cmPrefs = {
    mode: 'text/x-mssql',
    lineWrapping: true,
    theme: "monokai",
    indentWithTabs: false,
    smartIndent: true,
    matchBrackets : true,
    autofocus: true,
    extraKeys: {"Ctrl-Space": "autocomplete"},
    hintOptions: {
      tables: {
        users: {name: null, score: null, birthDate: null},
        countries: {name: null, population: null, size: null}
      }
    }
  };

  $scope.submitQuery = function () {
    $scope.loading = true;
    data = { query: $scope.query };
    QueryFactory.submit(data)
    .then(function (resp) {

      // console.log(resp);
      
      result = (resp.status === 200) ? 'success' : 'error';
      $scope.alerts[result].push(
        {
          msg:resp.statusText,
          status:resp.status,
          error: resp.data.code,
          query: JSON.parse(resp.config.data).data.query
        }
      );

      if (resp.status === 200) {
        $scope.alerts.table[0] = 1;
        delete resp.data[0]['INFO'];
        $scope.queryResponseHeaders = Object.keys(resp.data[0]);
        $scope.queryResponseData = resp.data;
      }
      $scope.loading = false;
    });
  };

}]);