'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('PlaylistCtrl', [
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
          $scope.$location = $location;
          $scope.id = $routeParams.id;
          
          $scope.title = "";

            $scope.$watch("LS.init", function() {
                if ($routeParams.type === 'lutte') {
                    var playlists = angular.copy($rootScope.LS.lutte.playlists);
                } else if ($routeParams.type === 'doc') {
                    var playlists = angular.copy($rootScope.LS.doc.playlists);
                }
                $scope.type = $routeParams.type;
                for (var i in playlists) {
                    if (playlists[i].id == $routeParams.id) {
                        if ($routeParams.type === 'lutte') {
                            $scope.videos = [];
                            for (var j in $rootScope.LS.lutte.videos) {
                                if ($rootScope.LS.lutte.videos[j].playlistId === $scope.id) {
                                    $scope.videos.push($rootScope.LS.lutte.videos[j]);
                                }
                            }
                        } else if ($routeParams.type === 'doc') {
                            $scope.videos = [];
                            for (var j in $rootScope.LS.doc.videos) {
                                if ($rootScope.LS.doc.videos[j].playlistId === $scope.id) {
                                    $scope.videos.push($rootScope.LS.doc.videos[j]);
                                }
                            }
                        }
                        $scope.title = playlists[i].title;
                    }
                }
            });
      }]);
