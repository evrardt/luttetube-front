'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('PlaylistsCtrl', [
      '$rootScope',
      '$scope',
      '$location',
      '$routeParams',
      '$http',
      'CONFIG',
      function (
        $rootScope, 
        $scope, 
        $location,
        $routeParams,
        $http,
        CONFIG
      ) {
            $scope.config = CONFIG;
            $scope.index = 0;

            var that = this;

            $rootScope.page = $routeParams.channel;

            $scope.marker = {
                "scaledSize": [24, 24],
                "url": "images/marker1.png"
            };

            $scope.selectedMarker = {
                "scaledSize": [24, 24],
                "url": "images/marker2.png"
            };

            $scope.offset = 20;

            //$scope.googleMapsUrl = "https://maps.google.com/maps/api/js?key="+CONFIG.GOOGLE_API_KEY;

            $scope.$watch("LS.channels", function() {
              if ($rootScope.LS.channels) {
                for (var i in $rootScope.LS.channels) {
                  if ($rootScope.LS.channels[i].name === $routeParams.channel) {
                    $scope.channelIndex = i;
                    $scope.channels = angular.copy($rootScope.LS.channels);
                    that.getTypes(i);
                  }
                }
              }
            });

            $scope.$watch("init", function() {

              $scope.markerPlace = angular.copy($rootScope.LS.channels[$scope.channelIndex].place);
              $scope.typesDisplayed = angular.copy($rootScope.LS.channels[$scope.channelIndex].type);
              
              if ($rootScope.LS.channels[$scope.channelIndex].typeFilter !== '') {
                this.selectType($rootScope.LS.channels[$scope.channelIndex].typeFilter);
              } else if ($rootScope.LS.channels[$scope.channelIndex].placeFilter !== '') {
                this.selectMarker($rootScope.LS.channels[$scope.channelIndex].placeFilter);
              }
              
              $scope.markerPlace = angular.copy($scope.channels[$scope.channelIndex].place);
              $scope.typesDisplayed = angular.copy($scope.channels[$scope.channelIndex].type);

              if ($rootScope.LS.channels[$scope.channelIndex].typeFilter !== '') {
                that.selectType($rootScope.LS.channels[$scope.channelIndex].typeFilter);
              } else if ($rootScope.LS.channels[$scope.channelIndex].placeFilter !== '') {
                that.selectMarker($rootScope.LS.channels[$scope.channelIndex].placeFilter);
              }

            });

            this.getTypes = function() {
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/types/channel/"+$rootScope.LS.channels[$scope.channelIndex].name
              }).then(function successCallback(response) {
                  $scope.channels[$scope.channelIndex].type = response.data;
                  $scope.channels[$scope.channelIndex].display = 'date';
                  $scope.channels[$scope.channelIndex].thumbnails = [];
                  that.getPlace($scope.channelIndex);
              }, function errorCallback(response) {
                  console.log(response);
              });
            }

            this.getPlace = function() {
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/places/channel/"+$rootScope.LS.channels[$scope.channelIndex].name
              }).then(function successCallback(response) {
                  $scope.channels[$scope.channelIndex].place = response.data;
                  that.getPlaylists($scope.channelIndex, 0, $scope.offset);
              }, function errorCallback(response) {
                  console.log(response);
              });
            };

            this.getPlaylists = function() {
              $rootScope.LS.channels[$scope.channelIndex].placeFilter = "";
              $rootScope.LS.channels[$scope.channelIndex].typeFilter = "";
              $http({
                  method: 'GET',
                  url: CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[$scope.channelIndex].name+"/"+$scope.index+"/"+$scope.offset
              }).then(function successCallback(response) {
                  $scope.channels[$scope.channelIndex].playlists = response.data;
                  $scope.init = true;

                  if ($rootScope.LS.channels[$scope.channelIndex].typeFilter !== '') {
                    that.selectType($rootScope.LS.channels[$scope.channelIndex].typeFilter);
                  } else if ($rootScope.LS.channels[$scope.channelIndex].placeFilter !== '') {
                    that.selectMarker($rootScope.LS.channels[$scope.channelIndex].placeFilter);
                  }

                  that.countPlaylist();
              }, function errorCallback(response) {
                  console.log(response);
              });
            };

            this.selectMarker = function(id) {
              $scope.index = 0;

              if (id.latLng) { 
                for (var i in $scope.markerPlace) { 
                  if ($scope.markerPlace[i].location && $scope.markerPlace[i].location.lat.toFixed(2) === id.latLng.toJSON().lat.toFixed(2) && $scope.markerPlace[i].location.lng.toFixed(2) === id.latLng.toJSON().lng.toFixed(2)) { 
                    $rootScope.LS.channels[$scope.channelIndex].placeFilter = $scope.markerPlace[i].city; 
                  } 
                }

                $http({
                    method: 'GET',
                    url: CONFIG.HOST+"/api/types/channel/"+$rootScope.LS.channels[$scope.channelIndex].name+"/"
                }).then(function successCallback(response) {
                    $scope.channels[$scope.channelIndex].type = response.data;
                    $scope.channels[$scope.channelIndex].display = 'date';
                    $scope.channels[$scope.channelIndex].thumbnails = [];
                    that.getPlace($scope.channelIndex);
                }, function errorCallback(response) {
                    console.log(response);
                });

                /*var playlists = angular.copy($rootScope.LS.channels[$scope.channelIndex].playlists);
                $scope.typesDisplayed = [];
                for (i in playlists) {
                  if (playlists[i].place === $rootScope.LS.channels[$scope.channelIndex].placeFilter && $scope.typesDisplayed.indexOf(playlists[i].type) === -1) {
                    $scope.typesDisplayed.push(playlists[i].type);
                  }
                }*/
              } else if (id.location) {
                $scope.markerPlace = angular.copy($rootScope.LS.channels[$scope.channelIndex].place);
                for (i in $scope.markerPlace) { 
                  if ($scope.markerPlace[i].location.lat.toFixed(2) === id.location.lat.toFixed(2) && $scope.markerPlace[i].location.lng.toFixed(2) === id.location.lng.toFixed(2)) { 
                    $rootScope.LS.channels[$scope.channelIndex].placeFilter = $scope.markerPlace[i].city; 
                  } 
                }
              }

            };

            this.selectType = function(item) {
              $scope.index = 0;
              $rootScope.LS.channels[$scope.channelIndex].typeFilter = item;
              
              /*var playlists = angular.copy($scope.channels[$scope.channelIndex].playlists);
              var temp = [];

              for (var i in playlists) {
                if (playlists[i].type === $rootScope.LS.channels[$scope.channelIndex].typeFilter && temp.indexOf(playlists[i].place) === -1) {
                  temp.push(playlists[i].place);
                }
              }
              $scope.markerPlace = [];
              for (i in $rootScope.LS.channels[$scope.channelIndex].place) {
                if (temp.indexOf($rootScope.LS.channels[$scope.channelIndex].place[i].city) !== -1) {
                  $scope.markerPlace.push($rootScope.LS.channels[$scope.channelIndex].place[i]);
                }
              }*/
              var url = encodeURI(CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[$scope.channelIndex].name+"/"+item+"/"+$scope.index+"/"+$scope.offset);
              $http({
                  method: 'GET',
                  url: url
              }).then(function successCallback(response) {
                  $scope.channels[$scope.channelIndex].playlists = response.data;
                  //$rootScope.LS.init = true;
                  
                  /*if ($rootScope.LS.channels[$scope.channelIndex].typeFilter !== '') {
                    that.selectType($rootScope.LS.channels[$scope.channelIndex].typeFilter);
                  } else if ($rootScope.LS.channels[$scope.channelIndex].placeFilter !== '') {
                    that.selectMarker($rootScope.LS.channels[$scope.channelIndex].placeFilter);
                  }*/

                  that.countPlaylist($scope.channelIndex);
              }, function errorCallback(response) {
                  console.log(response);
              });
            };

            this.allTypes = function() {
              that.getPlaylists($scope.channelIndex, $scope.index, $scope.offset);
              /*console.log("toto");
              $rootScope.LS.channels[$scope.channelIndex].typeFilter = "";
              
              if ($rootScope.LS.channels[channelIndex].placeFilter === "") {
                $scope.markerPlace = angular.copy($rootScope.LS.channels[$scope.channelIndex].place);
              } else {
                for (var i in $rootScope.LS.channels[$scope.channelIndex].place) {
                  if ($rootScope.LS.channels[channelIndex].placeFilter === $rootScope.LS.channels[$scope.channelIndex].place[i].city) {
                    this.selectMarker($rootScope.LS.channels[$scope.channelIndex].place[i]);
                  }
                }
              }*/
            };

            /*this.allCities = function() {
              $rootScope.LS.channels[channelIndex].placeFilter = "";
              if ($rootScope.LS.channels[channelIndex].typeFilter === "") {
                $scope.typesDisplayed = angular.copy($rootScope.LS.channels[channelIndex].type);
              } else {
                that.selectType($rootScope.LS.channels[channelIndex].typeFilter);
              }
            };*/

            this.countPlaylist = function() {
              if ($rootScope.LS.channels[$scope.channelIndex].typeFilter !== '') {
                var url = CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[$scope.channelIndex].name+"/type/"+$rootScope.LS.channels[$scope.channelIndex].typeFilter+"/count";
              } else {
                var url = CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[$scope.channelIndex].name+"/count";
              }
              $http({
                  method: 'GET',
                  url: url
              }).then(function successCallback(response) {
                  $scope.playlistsLength = response.data;
              }, function errorCallback(response) {
                  console.log(response);
              });
              $scope.init = true;
            }

            this.previous = function() {
              $scope.index -= 20;
              that.getPlaylists($scope.channelIndex, $scope.index, $scope.offset);
            }

            this.next = function() {
              $scope.index += 20;
              that.getPlaylists($scope.channelIndex, $scope.index, $scope.offset);
            }
     }]);
