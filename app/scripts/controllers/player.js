'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('PlayerCtrl', [
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
          $scope.url = $sce.trustAsResourceUrl("https://www.youtube-nocookie.com/embed/"+$location.path().replace('/player/', '')+"?rel=0");
      }]);
