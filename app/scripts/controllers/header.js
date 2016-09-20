'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('HeaderCtrl', ['$rootScope', '$localStorage', '$http', 'CONFIG', function($rootScope, $localStorage, $http, CONFIG) {
        
        var that = this;
        $rootScope.LS = $localStorage;

        /*var playlists = [];
        var type = [];
        var place = [];
        var placeFilter = "";
        var typeFilter = "";*/

        $rootScope.LS.init = false;

        this.getChannels = function() {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/channels"
            }).then(function successCallback(response) {
                $rootScope.LS.channels = response.data;
                for (var i in $rootScope.LS.channels) {
                    $rootScope.LS.channels[i].placeFilter = "";
                    $rootScope.LS.channels[i].typeFilter = "";
                    $rootScope.LS.channels[i].display = "date";
                }
                //that.getTypes(0);
                //$rootScope.LS.init = true;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        /*this.getTypes = function(channelIndex) {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/types/channel/"+$rootScope.LS.channels[channelIndex].name
            }).then(function successCallback(response) {
                type = response.data;
                that.getPlace(channelIndex);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getPlace = function(channelIndex) {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/places/channel/"+$rootScope.LS.channels[channelIndex].name
            }).then(function successCallback(response) {
                place = response.data;
                that.getPlaylists(channelIndex);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getPlaylists = function(channelIndex) {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/playlists/channel/"+$rootScope.LS.channels[channelIndex].name
            }).then(function successCallback(response) {
                playlists = response.data;

                $rootScope.LS.channels[channelIndex].playlists = playlists;
                $rootScope.LS.channels[channelIndex].type = type;
                $rootScope.LS.channels[channelIndex].place = place;

                if (channelIndex+1 < $rootScope.LS.channels.length) {
                    playlists = [];
                    type = [];
                    place = [];
                    placeFilter = "";
                    typeFilter = "";

                    that.getTypes(channelIndex+1);
                } else {
                    that.getVideos(0);
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getVideos = function(channelIndex) {
            if (channelIndex+1 < $rootScope.LS.channels.length) {
                $http({
                    method: 'GET',
                    url: CONFIG.HOST+"/api/videos/channel/"+$rootScope.LS.channels[channelIndex].name
                }).then(function successCallback(response) {
                    $rootScope.LS.channels[channelIndex].videos = response.data;
                    that.getVideos(channelIndex+1)
                }, function errorCallback(response) {
                    console.log(response);
                });
            } else {
                that.getNumberLabel();
            }

            
        };

        this.getNumberLabel = function() {
            for (var i in $rootScope.LS.channels) {
                for (var j in $rootScope.LS.channels[i].playlists) {
                    var cpt = 0;
                    for (var h in $rootScope.LS.channels[i].videos) {
                        if ($rootScope.LS.channels[i].playlists[j].id === $rootScope.LS.channels[i].videos[h].playlistId) {
                            cpt++;
                        }
                    }
                    $rootScope.LS.channels[i].playlists[j].count = cpt;
                }
            }
            $rootScope.LS.init = true;
        };*/
        
        this.getChannels();
    }]);