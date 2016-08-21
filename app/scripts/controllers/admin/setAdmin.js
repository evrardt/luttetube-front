'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:SetadminCtrl
 * @description
 * # SetadminCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('SetAdminCtrl', function ($rootScope, $scope, $cookies, $http, CONFIG) {
    
    $http({
      method: 'GET',
      url: CONFIG.HOST + '/api/users/',
      headers: {
          'Authorization': 'Bearer ' + $cookies.get('token')
      }
    })
    .then(function (response) {
      $scope.users = response.data;
    }, function (response) {
      console.log(response);
    });

    this.setRole = function(id, role) {
      $http({
        method: 'PUT',
        url: CONFIG.HOST + '/api/users/'+id+'/role',
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        },
        data: {
          role: role
        }
      })
      .then(function (response) {
        console.log(response);
      }, function (response) {
        console.log(response);
      });
    }

  });
