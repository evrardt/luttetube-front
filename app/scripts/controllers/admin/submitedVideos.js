'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:SubmitedvideosCtrl
 * @description
 * # SubmitedvideosCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('SubmitedVideosCtrl', function ($rootScope, $scope, $sce, $http, CONFIG) {
    $scope.errors = [];
    $scope.displayValidate = 'false';

    var that = this;

    $scope.$watch('LS.user', function() {
      $http({
        method: 'GET',
        url: CONFIG.HOST + '/api/submissions',
        headers: {
            'Authorization': 'Bearer ' + $rootScope.LS.token
        }
      })
      .then(function (response) {
        $scope.submissions = response.data;
        for (var i in $scope.submissions) {
          $scope.submissions[i].videoId = that.youtubeParser($scope.submissions[i].link);
          $scope.submissions[i].embed = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+that.youtubeParser($scope.submissions[i].link));
        }
      }, function (response) {
        $scope.errors.push("Une erreur est survenue.");
      });
    });

    this.valid = function(id, active) {
      $http({
        method: 'PUT',
        url: CONFIG.HOST + '/api/submissions/' + $scope.submissions[id]._id,
        headers: {
            'Authorization': 'Bearer ' + $rootScope.LS.token
        },
        data: {
          active: active
        }
      })
      .then(function (response) {
        $scope.submissions[id].active = active;
      }, function (response) {
        console.log(response);
      });
    }

    this.delete = function(id) {
      $http({
        method: 'DELETE',
        url: CONFIG.HOST + '/api/submissions/' + $scope.submissions[id]._id,
        headers: {
            'Authorization': 'Bearer ' + $rootScope.LS.token
        }
      })
      .then(function (response) {
        $scope.submissions.splice(id, 1);
      }, function (response) {
        $scope.errors.push("Une erreur est survenue.");
      });
    }

    this.youtubeParser = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    this.youtubeTransfert = function(id) {
      $http({
        method: 'POST',
        url: CONFIG.HOST + '/api/youtube/playlists',
        headers: {
            'Authorization': 'Bearer ' + $rootScope.LS.token
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
    }
  });
