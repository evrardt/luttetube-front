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
          $rootScope.page = "home";

          $scope.googleMapsUrl = "https://maps.google.com/maps/api/js?key="+CONFIG.GOOGLE_API_KEY;

          $scope.marker = {
              "scaledSize": [24, 24],
              "url": "images/marker1.png"
          };

          $scope.channels = [];

          var that = this;

          $scope.$watch("LS.channels", function() {
            if ($rootScope.LS.channels) {
              $scope.channels = angular.copy($rootScope.LS.channels);
              that.getTypes(0);
            }
          });

          this.getTypes = function(channelIndex) {
            if (channelIndex+1 <= $rootScope.LS.channels.length) {
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/types/channel/"+$rootScope.LS.channels[channelIndex].name
              }).then(function successCallback(response) {
                  $scope.channels[channelIndex].type = response.data;
                  $scope.channels[channelIndex].display = 'date';
                  $scope.channels[channelIndex].thumbnails = [];
                  that.getTypes(channelIndex+1);
              }, function errorCallback(response) {
                  console.log(response);
              });
            } else {
              that.getPlace(0);
            }
          }

          this.getPlace = function(channelIndex) {
            if (channelIndex+1 <= $rootScope.LS.channels.length) {
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/places/channel/"+$rootScope.LS.channels[channelIndex].name
              }).then(function successCallback(response) {
                  $scope.channels[channelIndex].place = response.data;
                  that.getPlace(channelIndex+1);
              }, function errorCallback(response) {
                  console.log(response);
              });
            } else {
              that.getPlaylists(0);
            }
          };

          this.getPlaylists = function(channelIndex) {
            if (channelIndex+1 <= $rootScope.LS.channels.length) {
              $rootScope.LS.channels[channelIndex].placeFilter = "";
              $rootScope.LS.channels[channelIndex].typeFilter = "";
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[channelIndex].name+"/0/4"
              }).then(function successCallback(response) {
                  $scope.channels[channelIndex].playlists = response.data;
                  that.getPlaylists(channelIndex+1);
              }, function errorCallback(response) {
                  console.log(response);
              });
            } else {
              that.getPlaylistsCategory(0)
            }
          };

          this.getPlaylistsCategory = function(channelIndex) {
            if (channelIndex+1 <= $rootScope.LS.channels.length) {
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[channelIndex].name+"/category"
              }).then(function successCallback(response) {
                  $scope.channels[channelIndex].playlistCategories = response.data;
                  that.getPlaylistsCategory(channelIndex+1);
              }, function errorCallback(response) {
                  console.log(response);
              });
            } else {
              $rootScope.LS.init = true;
            }
          }

          this.goToPlace = function(channelName) {
            for (var i in $rootScope.LS.channels) {
              if ($rootScope.LS.channels[i].name === channelName) {
                $rootScope.LS.channels[i].typeFilter = "";
                for (var j in $scope.channels[i].place) {
                  if ($scope.channels[i].place[j].location.lat.toFixed(2) === id.latLng.toJSON().lat.toFixed(2) && $scope.channels[i].place[j].location.lng.toFixed(2) === id.latLng.toJSON().lng.toFixed(2)) {
                    $rootScope.LS.channels[i].placeFilter = $scope.channels[i].place[j].city;
                  }
                }
                $location.path('/playlists');
              }
            }
          };

          this.go = function(route) {
            for (var i in $rootScope.LS.channels) {
              $rootScope.LS.channels[i].typeFilter = ""; 
              $rootScope.LS.channels[i].placeFilter = ""; 
            }
            $location.path(route); 
          }; 
      }]);
