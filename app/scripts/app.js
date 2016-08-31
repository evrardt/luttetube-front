'use strict';

/**
 * @ngdoc overview
 * @name luttetubeApp
 * @description
 * # luttetubeApp
 *
 * Main module of the application.
 */
angular
  .module('luttetubeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ngMap',
    'ui.bootstrap',
    'vcRecaptcha'
  ])
  .constant('CONFIG', {
    'HOST' : 'https://luttetube.fr',
    'GOOGLE_API_KEY' : 'AIzaSyDrNpz22gF7QK2WJwjIKNBcJF3BabehGZQ',
    'MOVIES' : [
      {
        'title' : 'Merci patron !',
        'label' : 'merci-patron',
        'category' : 'Travail',
        'duration' : '01:40:00',
        'thumbnail' : 'https://img.youtube.com/vi/U55G_PiSFh0/mqdefault.jpg',
        'embed' : '<iframe src="https://goo.gl/CXqVIR" height="450" width="720" webkitAllowFullScreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="no"></iframe>'
      },
      {
        'title' : 'Demain',
        'label' : 'demain',
        'category' : 'Reflexion sur la société',
        'thumbnail' : 'https://img.youtube.com/vi/UI8Frv2XlfM/mqdefault.jpg',
        'duration' : '02:00:00',
        'embed' : '<iframe src="https://goo.gl/uJA5KG" height="450" width="720" webkitAllowFullScreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="no"></iframe>'
      },
      {
        'title' : 'Winter on fire',
        'label' : 'winter-on-fire',
        'category' : 'Lutte',
        'duration' : '01:38:00',
        'thumbnail' : 'https://img.youtube.com/vi/DRMPEszM40E/mqdefault.jpg',
        'embed' : '<IFRAME SRC="https://allvid.ch/embed-d9zh50twdeta.html" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO allowfullscreen="true" WIDTH=750 HEIGHT=423></IFRAME>'
      },
      {
        'title' : 'Les raisons de la colère',
        'label' : 'les-raisons-de-la-colore',
        'category' : 'Lutte',
        'duration' : '50:04',
        'thumbnail' : 'https://movie-medias.vodeo.tv/uploads/images/program/thumbs/1000x550_video-les-raisons-de-la-colere_pf.jpg',
        'embed' : '<iframe frameborder="0" width="480" height="270" src="//www.dailymotion.com/embed/video/x1jpk3l" allowfullscreen></iframe><br /><a href="https://www.dailymotion.com/video/x1jpk3l_les-raisons-de-la-colere_webcam" target="_blank">Les raisons de la col&egrave;re</a> <i>par <a href="https://www.dailymotion.com/Lywest" target="_blank">Lywest</a></i>'
      }
      /*films
        l'ile aux fleurs
        diaz*/
    ],
    'APP_VERSION' : '0.0.1',
    'GOOGLE_ANALYTICS_ID' : ''
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/playlist/:type/:id', {
        templateUrl: 'views/playlist.html',
        controller: 'PlaylistCtrl',
        controllerAs: 'playlist'
      })
      .when('/movies/:label', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'movies'
      })
      .when('/player/:id', {
        templateUrl: 'views/player.html',
        controller: 'PlayerCtrl',
        controllerAs: 'player'
      })
      .when('/playlists', {
        templateUrl: 'views/ltPlaylists.html',
        controller: 'LTPlaylistsCtrl',
        controllerAs: 'ltPlaylists'
      })
      .when('/movies', {
        templateUrl: 'views/ltMovies.html',
        controller: 'LTMoviesCtrl',
        controllerAs: 'ltMovies'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl',
        controllerAs: 'help'
      })
      .when('/how', {
        templateUrl: 'views/how.html',
        controller: 'HowCtrl',
        controllerAs: 'how'
      })
      .when('/how', {
        templateUrl: 'views/how.html',
        controller: 'HowCtrl',
        controllerAs: 'how'
      })
      .when('/doc', {
        templateUrl: 'views/docPlaylists.html',
        controller: 'DocPlaylistsCtrl',
        controllerAs: 'docPlaylists'
      })
      .when('/add/:type/:id', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl',
        controllerAs: 'add'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/admin/submited-videos', {
        templateUrl: 'views/admin/submitedVideos.html',
        controller: 'SubmitedVideosCtrl',
        controllerAs: 'submitedVideos'
      })
      .when('/admin/set-admin', {
        templateUrl: 'views/admin/setAdmin.html',
        controller: 'SetAdminCtrl',
        controllerAs: 'setAdmin'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
