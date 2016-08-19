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
    $scope.captcha = '';

    $scope.$watch('LS.user', function() {
      if ($scope.LS.user) {
        $location.path("/");
      }
    });

    this.register = function() {
      $scope.errors = [];
      delete $scope.success;

      if (!$scope.name || $scope.name === '') {
        $scope.errors.push("Vous n'avez pas indiqué de nom d'usage.");
      }
      if (!$scope.email || $scope.email === '') {
        $scope.errors.push("Vous n'avez pas indiqué d'adresse email.");
      }
      if (!$scope.password || $scope.password === '') {
        $scope.errors.push("Vous n'avez pas indiqué de mot de passe.");
      }
      if (!$scope.captcha || $scope.captcha === '') {
        $scope.errors.push("Vous n'avez pas validé le captcha.");
      }

      if ($scope.errors.length === 0) {
        $http.post($scope.host + '/api/users', {
          name: $scope.name,
          email: $scope.email, 
          password: $scope.password
        })
        .then(function (response) {
          if (response.data.token) {
            $rootScopeLS.user.token = response.data.token;
            that.getUser();
            $scope.success = "Inscription terminé, redirection en cours.";
          }
        }, function (response) {
          if (response.status === 422) {
            $scope.errors.push("L'adresse email indiqué est déjà utilisée.");
          }
        });
      }
    };

    this.getUser = function() {
      $http({
        method: 'GET',
        url: $scope.host + '/api/users/me',
        headers: {
            'Authorization': 'Bearer ' + $rootScopeLS.user.token
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
