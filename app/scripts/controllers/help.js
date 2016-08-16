'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('HelpCtrl', [
      '$rootScope', 
      '$scope', 
      '$http', 
      '$location', 
      '$routeParams', 
      '$sce', 
      'CONFIG',
      function (
        $rootScope, 
        $scope, 
        $location, 
        $routeParams, 
        CONFIG
      ) {
            $scope.config = CONFIG;
            $rootScope.page = "help";
  }]);
