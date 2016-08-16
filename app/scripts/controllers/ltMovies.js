'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('LTMoviesCtrl', [
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
        $http, 
        $location, 
        $routeParams, 
        $sce, 
        CONFIG
      ) {
            $scope.config = CONFIG;
            $rootScope.page = "movies";
      }]);
