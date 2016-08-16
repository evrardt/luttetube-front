'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('MoviesCtrl', [
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
            for (var i = 0; i < CONFIG.MOVIES.length; i++) {
                if (CONFIG.MOVIES[i].label == $routeParams.label) {
                    $scope.embed = $sce.trustAsHtml(CONFIG.MOVIES[i].embed);
                }
            }
            $scope.go = function ( path ) {
                $location.path( $rootScope.page );
            };
      }]);
