'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('RegisterCtrl', ['$rootScope', '$scope', '$location', '$http', 'CONFIG', function ($rootScope, $scope, $location, $http, CONFIG) {

    var that = this;

    $scope.host = CONFIG.HOST;

    $scope.$watch('LS.user', function() {
      if ($scope.LS.user.email) {
        $location.path("/");
      }
    });

    this.register = function() {
      $http.post($scope.host + '/api/users', {
        name: $scope.name,
        email: $scope.email, 
        password: $scope.password
      })
      .then(function (response) {
        if (response.data.token) {
          that.getUser(response.data.token);
        }
      }, function (response) {
        if (response.data.message) {
          $scope.error = response.data.message;
        } else if (response.data.name) {
          $scope.error = response.data.name;
        }
      });
    };

    this.getUser = function(token) {
      $http({
        method: 'GET',
        url: $scope.host + '/api/users/me',
        headers: {
            'Authorization': 'Bearer ' + token
        }
      })
      .then(function (response) {
        $rootScope.LS.user = response.data;
        $location.path("/");
      }, function (response) {
        if (response.data.message) {
          $scope.error = response.data.message;
        } else if (response.data.name) {
          $scope.error = response.data.name;
        }
      });
    };
  }]);
