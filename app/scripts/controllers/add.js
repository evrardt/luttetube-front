'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('AddCtrl', ['$scope', '$rootScope', '$routeParams', '$http', 'CONFIG', function ($scope, $rootScope, $routeParams, $http, CONFIG) {
    $scope.typeArray = [];
    $scope.videos = [];
    $scope.videos.push('');
    $scope.newPlaylist = false;
    $scope.playlistTitle = '';
    $scope.newCategory = false;
    $scope.categoryTitle = '';
    $scope.categoryType = '';
    $scope.success = '';
    $scope.errors = [];

    var that = this;

    $scope.$watch("LS.init", function() {  
      $scope.id = $routeParams.id;
      $scope.type = $routeParams.type;
      if ($scope.type === "lutte") {
        for (var i in $rootScope.LS.lutte.playlists) {
          if ($scope.id === $rootScope.LS.lutte.playlists[i].id) {
            $scope.playlistSelected = $rootScope.LS.lutte.playlists[i].id;
            $scope.typeSelected = $rootScope.LS.lutte.playlists[i].type;
          }
        }
        $scope.playlistArray = $rootScope.LS.lutte.playlists;
      } else if ($scope.type === "doc") {
        for (i in $rootScope.LS.doc.playlists) {
          if ($scope.id === $rootScope.LS.doc.playlists[i].id) {
            $scope.playlistSelected = $rootScope.LS.doc.playlists[i].id;
            $scope.typeSelected = $rootScope.LS.doc.playlists[i].type;
          }
        }
        $scope.playlistArray = $rootScope.LS.doc.playlists;
      }
    });

    $scope.$watch('typeSelected', function() {
      var test = false;
      $scope.playlistArray = [];
      for (var i in $rootScope.LS.doc.playlists) {
        if ($scope.typeSelected === $rootScope.LS.doc.playlists[i].type) {
          $scope.playlistArray.push($rootScope.LS.doc.playlists[i]);
        }
      }
      if (!test) {
        for (i in $rootScope.LS.lutte.playlists) {
          if ($scope.typeSelected === $rootScope.LS.lutte.playlists[i].type) {
            $scope.playlistArray.push($rootScope.LS.lutte.playlists[i]);
          }
        }
      }
    });

    this.addLine = function() {
      $scope.videos.push('');
    };

    this.removeLine = function(id) {
      $scope.videos.splice(id, 1);
    };

    this.addPlaylist = function() {
      $scope.newPlaylist = true; 
    };

    this.addPlaylistInNewCategory = function() {
      $scope.newPlaylist = true; 
      $scope.newCategory = true; 
    };

    this.display = function(str){
      if (str == 'all') {
        $scope.newPlaylist = false;
        $scope.newCategory = false;
      } else if (str == 'category') {
        $scope.newPlaylist = false;
      }
    };

    this.submit = function() {
      $scope.success = '';
      $scope.errors = [];

      for (var i in $scope.videos) {
        if ($scope.videos[i] === '' && i > 0) {
          $scope.videos.splice(i, 1);
        }
      }
  
      var category = '';
      var playlist = '';
      var links = $scope.videos;
      var type = '';

      if ($scope.newPlaylist) {
        if ($scope.newCategory) {
          if (!$scope.categoryTitle || $scope.playlistTitle === '') {
            $scope.errors.push("Vous n'avez pas indiqué de titre de catégorie.");
          } else {
            category = $scope.categoryTitle;
          }
          if (!$scope.playlistTitle || $scope.playlistTitle === '') {
            $scope.errors.push("Vous n'avez pas indiqué de titre de playlist.");
          } else {
            playlist = $scope.playlistTitle;
          }
          if (!$scope.categoryType || $scope.categoryType === '') {
            $scope.errors.push("Vous n'avez pas indiqué de section.");
          } else {
            if ($scope.categoryType === "lutte") {
              type = "Lutte";
            } else if ($scope.categoryType === "doc") {
              type = "Documentaires";
            }
          }
        } else {
          if (!$scope.typeSelected || $scope.typeSelected === '') {
            $scope.errors.push("Vous n'avez pas sélectionné de catégorie.");
          } else {
            category = $scope.typeSelected;
            if ($rootScope.LS.lutte.type.indexOf(category) !== -1) {
              type = "Lutte";
            } else if ($rootScope.LS.doc.type.indexOf(category) !== -1) {
              type = "Documentaires";
            }
          }
          if (!$scope.playlistTitle || $scope.playlistTitle === '') {
            $scope.errors.push("Vous n'avez pas indiqué de titre de playlist.");
          } else {
            playlist = $scope.playlistTitle;
          }
        }
      } else {
        if (!$scope.playlistSelected || $scope.playlistSelected === '') {
          $scope.errors.push("Vous n'avez pas sélectionné de playlist.");
        } else {
          playlist = $scope.playlistSelected;
          var test = false;
          for (var i in $rootScope.LS.doc.playlists) {
            if ($rootScope.LS.doc.playlists[i].id == playlist) {
              playlist = $rootScope.LS.doc.playlists[i].title;
              category = $rootScope.LS.doc.playlists[i].type;
              type = "Documentaires";
              test = true;
            }
          }
          if (!test) {
            for (var i in $rootScope.LS.lutte.playlists) {
              if ($rootScope.LS.lutte.playlists[i].id == playlist) {
                playlist = $rootScope.LS.lutte.playlists[i].title;
                category = $rootScope.LS.lutte.playlists[i].type;
                type = "Lutte";
              }
            }
          }
        }
      }

      if ($scope.videos.length == 1 && $scope.videos[0] === '') {
        $scope.errors.push("Vous avez oublié d'indiquer un lien de vidéo.");
      }

      if (!$scope.captcha) {
          $scope.errors.push("Vous n'avez pas validé le captcha.");
      } 

      if ($scope.errors.length == 0) {
        for (var i in links) {
          that.updateDb(type, category, playlist, links[i]);
        }
      }
    };

    this.updateDb = function(type, category, playlist, link) {
      $http({
        method: 'POST',
        url: CONFIG.HOST + '/api/submissions',
        data: {
          category: category,
          playlist: playlist,
          playlistId: $scope.playlistSelected,
          link: link,
          type: type,
          newCategory: $scope.newCategory,
          newPlaylist: $scope.newPlaylist,
          active: false
        }
      })
      .then(function (response) {
        $scope.success = "Votre demande a bien été soumise à approbation.";
        $scope.videos = [];
        $scope.videos.push('');
      }, function (response) {
        $scope.errors.push("Une erreur est survenue, vous pouvez en faire par à <a href='mailto:admin@luttetube.fr'>l'administrateur</a>.");
      });
    }
  }]);
