'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('LoginCtrl', ['$rootScope','$scope','$http', 'CONFIG', '$cookies', function ($rootScope, $scope, $http, CONFIG, $cookies) {
    
    var that = this;
    
    $scope.host = CONFIG.HOST;

    this.login = function() {
      $http.post($scope.host + '/auth/local', {
        email: $scope.email, 
        password: $scope.password
      })
      .then(function (response) {
        if (response.data.token) {
          $cookies.put('token',response.data.token);
          that.getUser();
        }
      }, function (response) {
        if (response.data.message) {
          $scope.error = response.data.message;
        } else if (response.data.name) {
          $scope.error = response.data.name;
        }
      });
    };

    this.getUser = function() {
      $http({
        method: 'GET',
        url: $scope.host + '/api/users/me',
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        }
      })
      .then(function (response) {
        $rootScope.LS.user = response.data;
      }, function (response) {
        if (response.data.message) {
          $scope.error = response.data.message;
        } else if (response.data.name) {
          $scope.error = response.data.name;
        }
      });
    };

    if ($cookies.get('token')) {
      //console.log('toto');
      this.getUser();
    }

  }]);
