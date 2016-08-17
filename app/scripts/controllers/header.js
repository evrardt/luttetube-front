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

        var playlists = [];
        var type = [];
        var place = [];
        var placeFilter = "";
        var typeFilter = "";

        $rootScope.LS.doc = {
            placeFilter: "",
            typeFilter: "",
            display: "date"
        };
        $rootScope.LS.lutte = {
            placeFilter: "",
            typeFilter: "",
            display: "date"
        };

        $rootScope.LS.init = false;

        this.getTypes = function(item) {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/"+item+"/types"
            }).then(function successCallback(response) {
                for (var i in response.data) {
                    type.push(response.data[i].type);
                }
                that.getPlace(item);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getPlace = function(item) {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/"+item+"/places"
            }).then(function successCallback(response) {
                place = response.data;
                that.getPlaylists(item);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getPlaylists = function(item) {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/"+item+"/playlists"
            }).then(function successCallback(response) {
                playlists = response.data;
                if (item === "lutte") {
                    $rootScope.LS.lutte.playlists = playlists;
                    $rootScope.LS.lutte.type = type;
                    $rootScope.LS.lutte.place = place;

                    playlists = [];
                    type = [];
                    place = [];
                    placeFilter = "";
                    typeFilter = "";

                    that.getTypes("doc");
                } else {
                    $rootScope.LS.doc.playlists = playlists;
                    $rootScope.LS.doc.type = type;
                    $rootScope.LS.doc.place = place;
                    that.getVideos();
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getVideos = function() {
            $http({
                method: 'GET',
                url: CONFIG.HOST+"/api/lutte/videos"
            }).then(function successCallback(response) {
                $rootScope.LS.lutte.videos = response.data;
                $http({
                    method: 'GET',
                    url: CONFIG.HOST+"/api/doc/videos"
                }).then(function successCallback(response) {
                    $rootScope.LS.doc.videos = response.data;
                    that.getNumberLabel();
                }, function errorCallback(response) {
                console.log(response);
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        this.getNumberLabel = function() {
            for (var i in $rootScope.LS.lutte.playlists) {
                var cpt = 0;
                for (var j in $rootScope.LS.lutte.videos) {
                    if ($rootScope.LS.lutte.playlists[i].id === $rootScope.LS.lutte.videos[j].playlistId) {
                        cpt++;
                    }
                }
                $rootScope.LS.lutte.playlists[i].count = cpt;
            }
            for (i in $rootScope.LS.doc.playlists) {
                cpt = 0;
                for (j in $rootScope.LS.doc.videos) {
                    if ($rootScope.LS.doc.playlists[i].id === $rootScope.LS.doc.videos[j].playlistId) {
                        cpt++;
                    }
                }
                $rootScope.LS.doc.playlists[i].count = cpt;
            }
            that.sortPlaylistsByDate();
        };

        this.sortPlaylistsByDate = function() {
            $rootScope.LS.lutte.playlists.sort(function(a,b) {
                if (!b || !b.date || !b.date.getTime()) {
                    return 1;
                }
                if (!a || !a.date || !a.date.getTime()) {
                    return -1;
                }
                if (a.date.getTime() < b.date.getTime())
                    return 1;
                if (a.date.getTime() > b.date.getTime())
                    return -1;
                return 0;
            });
            $rootScope.LS.doc.playlists.sort(function(a,b) {
                if (!b || !b.date || !b.date.getTime()) {
                    return 1;
                }
                if (!a || !a.date || !a.date.getTime()) {
                    return -1;
                }
                if (a.date.getTime() < b.date.getTime())
                    return 1;
                if (a.date.getTime() > b.date.getTime())
                    return -1;
                return 0;
            });
            $rootScope.LS.init = true;
        }
        
        this.getTypes("lutte");
    }]);