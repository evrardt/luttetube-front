'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('LTPlaylistsCtrl', [
      '$rootScope', 
      '$scope',
      '$location',
      '$routeParams', 
      'CONFIG', 
      function (
        $rootScope, 
        $scope, 
        $location,
        $routeParams,
        CONFIG
      ) {
            $scope.config = CONFIG;
            $scope.data = [];

            var that = this;

            $rootScope.page = "playlists";

            $scope.marker = {
                "scaledSize": [24, 24],
                "url": "images/marker1.png"
            };

            $scope.selectedMarker = {
                "scaledSize": [24, 24],
                "url": "images/marker2.png"
            };

            //$scope.googleMapsUrl = "https://maps.google.com/maps/api/js?key="+CONFIG.YOUTUBE_API_KEY;

            $scope.$watch("LS.init", function() {
              $scope.markerPlace = angular.copy($rootScope.LS.lutte.place);
              $scope.typesDisplayed = angular.copy($rootScope.LS.lutte.type);

              if ($rootScope.LS.lutte.typeFilter !== '') {
                that.selectType($rootScope.LS.lutte.typeFilter);
              } else if ($rootScope.LS.lutte.placeFilter !== '') {
                that.selectMarker($rootScope.LS.lutte.placeFilter);
              }
            });

            this.selectMarker = function(id) {
              if (id.latLng) { 
                for (var i in $scope.markerPlace) { 
                  if ($scope.markerPlace[i].location && $scope.markerPlace[i].location.lat.toFixed(2) === id.latLng.toJSON().lat.toFixed(2) && $scope.markerPlace[i].location.lng.toFixed(2) === id.latLng.toJSON().lng.toFixed(2)) { 
                    $rootScope.LS.lutte.placeFilter = $scope.markerPlace[i].city; 
                  } 
                }
                var playlists = angular.copy($rootScope.LS.lutte.playlists);
                $scope.typesDisplayed = [];
                for (i in playlists) {
                  if (playlists[i].place === $rootScope.LS.lutte.placeFilter && $scope.typesDisplayed.indexOf(playlists[i].type) === -1) {
                    $scope.typesDisplayed.push(playlists[i].type);
                  }
                }
              } else if (id.location) {
                $scope.markerPlace = angular.copy($rootScope.LS.lutte.place);
                for (i in $scope.markerPlace) { 
                  if ($scope.markerPlace[i].location.lat.toFixed(2) === id.location.lat.toFixed(2) && $scope.markerPlace[i].location.lng.toFixed(2) === id.location.lng.toFixed(2)) { 
                    $rootScope.LS.lutte.placeFilter = $scope.markerPlace[i].city; 
                  } 
                }
              }
            };

            this.selectType = function(item) {
              $rootScope.LS.lutte.typeFilter = item;
              
              var playlists = angular.copy($rootScope.LS.lutte.playlists);
              var temp = [];
              for (var i in playlists) {
                if (playlists[i].type === $rootScope.LS.lutte.typeFilter && temp.indexOf(playlists[i].place) === -1) {
                  temp.push(playlists[i].place);
                }
              }
              $scope.markerPlace = [];
              for (i in $rootScope.LS.lutte.place) {
                if (temp.indexOf($rootScope.LS.lutte.place[i].city) !== -1) {
                  $scope.markerPlace.push($rootScope.LS.lutte.place[i]);
                }
              }
            };

            this.allTypes = function() {
              $rootScope.LS.lutte.typeFilter = "";
              $scope.typesDisplayed = angular.copy($rootScope.LS.lutte.type);
              if ($rootScope.LS.lutte.placeFilter === "") {
                $scope.markerPlace = angular.copy($rootScope.LS.lutte.place);
              } else {
                for (var i in $rootScope.LS.lutte.place) {
                  if ($rootScope.LS.lutte.placeFilter === $rootScope.LS.lutte.place[i].city) {
                    this.selectMarker($rootScope.LS.lutte.place[i]);
                  }
                }
              }
            };

            this.allCities = function() {
              $rootScope.LS.lutte.placeFilter = "";
              if ($rootScope.LS.lutte.typeFilter === "") {
                $scope.typesDisplayed = angular.copy($rootScope.LS.lutte.type);
              } else {
                that.selectType($rootScope.LS.lutte.typeFilter);
              }
            };

            if ($rootScope.LS.init) {
              if ($rootScope.LS.lutte.typeFilter !== '') {
                this.selectType($rootScope.LS.lutte.typeFilter);
              } else if ($rootScope.LS.lutte.placeFilter !== '') {
                this.selectMarker($rootScope.LS.lutte.placeFilter);
              }
            }
     }]);
