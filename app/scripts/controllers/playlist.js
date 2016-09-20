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

            $scope.index = 0;
            $scope.offset = 20;

            this.getVideo = function(index, offset) {
                var url = CONFIG.HOST+"/api/videos/playlist/"+$scope.id+"/"+$scope.index+"/"+$scope.offset;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    $scope.videos = response.data;
                }, function errorCallback(response) {
                    console.log(response);
                });
            }

            this.getVideo();
            
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/playlists/"+$scope.id
            }).then(function successCallback(response) {
                $scope.title = response.data.title;
            }, function errorCallback(response) {
                console.log(response);
            });

            this.previous = function() {
              $scope.index -= 20;
              this.getVideo();
            }

            this.next = function() {
              $scope.index += 20;
              this.getVideo();
            }
      }]);
