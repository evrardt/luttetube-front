'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('MainCtrl', [
      '$rootScope', 
      '$scope', 
      '$http', 
      '$location', 
      '$routeParams', 
      '$sce', 
      'CONFIG',
      'NgMap',
      function (
        $rootScope, 
        $scope, 
        $http, 
        $location, 
        $routeParams, 
        $sce, 
        CONFIG,
        NgMap
      ) {
          $scope.config = CONFIG;
          $scope.data = [];
          $rootScope.page = "home";

          $scope.googleMapsUrl = "https://maps.google.com/maps/api/js?key="+CONFIG.YOUTUBE_API_KEY;

          $scope.marker = {
              "scaledSize": [24, 24],
              "url": "images/marker1.png"
          };

          $scope.lutteThumbnails = [];
          $scope.docThumbnails = [];

          $scope.$watch("LS.init", function() {
            if ($rootScope.LS.init) {
              for (var i in $rootScope.LS.lutte.type) {
                for (var j in $rootScope.LS.lutte.playlists) {
                  if ($rootScope.LS.lutte.playlists[j].type === $rootScope.LS.lutte.type[i] && $scope.lutteThumbnails.indexOf($rootScope.LS.lutte.playlists[j].thumbnail) === -1) {
                    $scope.lutteThumbnails.push($rootScope.LS.lutte.playlists[j].thumbnail);
                    break;
                  } 
                }
              }
              for (i in $rootScope.LS.doc.type) {
                for (j in $rootScope.LS.doc.playlists) {
                  if ($rootScope.LS.doc.playlists[j].type === $rootScope.LS.doc.type[i] && $scope.docThumbnails.indexOf($rootScope.LS.doc.playlists[j].thumbnail) === -1) {
                    $scope.docThumbnails.push($rootScope.LS.doc.playlists[j].thumbnail);
                    break;
                  } 
                }
              }
            }
          });

          this.goToPlace = function(id) {
            $rootScope.LS.lutte.typeFilter = "";
            for (var i in $rootScope.LS.lutte.place) {
              if ($rootScope.LS.lutte.place[i].location.lat.toFixed(2) === id.latLng.toJSON().lat.toFixed(2) && $rootScope.LS.lutte.place[i].location.lng.toFixed(2) === id.latLng.toJSON().lng.toFixed(2)) {
                $rootScope.LS.lutte.placeFilter = $rootScope.LS.lutte.place[i].city;
              }
            }
            $location.path('/playlists');
          };
      }]);
