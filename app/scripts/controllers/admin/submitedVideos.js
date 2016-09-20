'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:SubmitedvideosCtrl
 * @description
 * # SubmitedvideosCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('SubmitedVideosCtrl', function ($rootScope, $scope, $cookies, $sce, $http, CONFIG) {
    $scope.errors = [];
    $scope.statusDisplayed = 0;

    var that = this;

    $scope.$watch('LS.user', function() {
      $http({
        method: 'GET',
        url: CONFIG.HOST + '/api/submissions',
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        }
      })
      .then(function (response) {
        $scope.submissions = response.data;
      }, function (response) {
        $scope.errors.push("Une erreur est survenue.");
      });
    });

    this.updateStatus = function(id, status) {
      if (status === 1 && that.youtubeParser($scope.submissions[id].link)) {
        status = 3;
      }
      
      $scope.submissions[id].status = status;
      $scope.submissions[id].validatedBy = $scope.LS.user._id;
      $http({
        method: 'PUT',
        url: CONFIG.HOST + '/api/submissions/' + $scope.submissions[id]._id,
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        },
        data: $scope.submissions[id]
      })
      .then(function (response) {
        
        if ($scope.submissions[id].type == 'Lutte') {
          var type = 'lutte';
        } else {
          var type = 'doc';
        }
        
        if (status == 0) { // si la vidéo retourne en attente d'aprobation
        // il faut regarder si il s'agît de l'unique vidéo de la playlist, si c'est le cas la supprimer en même temps que la vidéo
        } else if (status == 1) { // si la vidéo est ajoutée aux vidéos validées
            if ($scope.submissions[id].newPlaylist) { // et qu'il faut ajouter la vidéo dans une nouvelle playlist
              // on regarde si la playlist n'a été créé depuis, si elle n'est pas crée on la crée et on ajoute la vidéo dans la playlist
              createPlaylistIfNotExist(playlist, type, function() {
                that.addToVideoDb(id, type);
              });
            } else { // sinon on l'ajoute dans la playlist existante
              that.addToVideoDb(id, type);
            }
        } else if (status == 2) { // si la vidéo est ajoutée aux vidéos refusées
        }
      }, function (response) {
        console.log(response);
      });
    }

    this.createPlaylistIfNotExist = function(playlist, type, callback) {
      $http({
        method: 'POST',
        url: CONFIG.HOST + '/api/'+type+'/playlists/',
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        },
        data: {
          title: playlist
        }
      })
      .then(function (response) {
        console.log(response);
        callback();
      }, function (response) {
        console.log(response);
      });
    }

    this.addToVideoDb = function(id, type) {
      $http({
        method: 'POST',
        url: CONFIG.HOST + '/api/'+type+'/videos/',
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        },
        data: {
          publishedAt: new Date(),
          title: $scope.submissions[id].title,
          playlistId: $scope.submissions[id].playlistId,
          link: $scope.submissions[id].link,
          hosting: "embed",
          duration: $scope.submissions[id].duration,
          thumbnail: $scope.submissions[id].thumbnail
        }
      })
      .then(function (response) {
        $scope.submissions[id].status = status;

      }, function (response) {
        console.log(response);
      });
    }

    this.youtubeParser = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    /*this.youtubeTransfert = function(id) {
      console.log(id);
      $http({
        method: 'POST',
        url: CONFIG.HOST + '/api/youtube/playlists',
        headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
        },
        data: {
          submission: $scope.submissions[id]
        }
      })
      .then(function (response) {
        console.log(response);
      }, function (response) {
        console.log(response);
      });
    }*/
  });
