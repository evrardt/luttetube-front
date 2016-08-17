'use strict';

angular.module('luttetubeApp')
    .directive('backButton', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);