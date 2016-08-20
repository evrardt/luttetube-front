'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('NavCtrl', ['$rootScope', '$cookies', function ($rootScope, $cookies) {
      this.logout = function() {
          delete $rootScope.LS.user;
          if ($cookies.get('token')) {
            $cookies.remove('token');
          }
      };
  }]);
