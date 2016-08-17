'use strict';

/**
 * @ngdoc function
 * @name luttetubeApp.controller:DocplaylistsCtrl
 * @description
 * # DocplaylistsCtrl
 * Controller of the luttetubeApp
 */
angular.module('luttetubeApp')
  .controller('DocPlaylistsCtrl', [
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
        $location,
        $routeParams, 
        CONFIG
      ) {
            $scope.config = CONFIG;
            $scope.data = [];

            var that = this;

            $rootScope.page = "doc";

            $scope.$watch("LS.init", function() {
              $scope.typesDisplayed = angular.copy($rootScope.LS.doc.type);
            });

            this.selectType = function(item) {
              $rootScope.LS.doc.typeFilter = item;
            };

            this.allTypes = function() {
              $rootScope.LS.doc.typeFilter = "";
              $scope.typesDisplayed = angular.copy($rootScope.LS.doc.type);
            };

            this.allCities = function() {
              if ($rootScope.LS.doc.typeFilter === "") {
                $scope.typesDisplayed = angular.copy($rootScope.LS.doc.type);
              } else {
                that.selectType($rootScope.LS.doc.typeFilter);
              }
            };
     }]);