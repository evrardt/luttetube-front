'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('NavCtrl', ['$rootScope', function ($rootScope) {
      this.logout = function() {
          delete $rootScope.LS.user;
      };
  }]);
