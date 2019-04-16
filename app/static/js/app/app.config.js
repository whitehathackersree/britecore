app = angular.
  module('bidBayApp',[
  "ngCookies",
  "ngRoute",
  'core',
  'filter',
  'common',
  'navs',
  'directive',
  'main',
  'company',
  'auroraAlert',
]);

app.factory('httpRequestInterceptor', ['$cookies', function($cookies) {
  return {
    request: function (config) {
      config.headers['X-CSRFToken'] = getCookie('csrftoken');
      if ($cookies.get('userToken')) {
          //
          config.headers['Authorization'] = 'JWT ' + $cookies.get('userToken');
      }
      return config;
    }
  };
}]);

app.factory('responseObserver', ['$window', '$q', function($window, $q) {
    return {
        'responseError': function(errorResponse) {
            switch (errorResponse.status) {
            case 403:
                $window.location = './403.html';
                break;
            case 500:
                $window.location = './500.html';
                break;
            }
            return $q.reject(errorResponse);
        }
    };
}]);

app.
  config(['$locationProvider', '$routeProvider', '$httpProvider', '$resourceProvider',
    function config($locationProvider, $routeProvider, $httpProvider, $resourceProvider) {
      $resourceProvider.defaults.stripTrailingSlashes = false;
      //$httpProvider.interceptors.push('responseObserver');
      $httpProvider.interceptors.push('httpRequestInterceptor');
      //$locationProvider.hashPrefix('!');
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      //$locationProvider.html5Mode(true);
      var site_prefix = '';
      $routeProvider.
        when(site_prefix+'/', {
          template: '<home-main></home-main>'
        }).
        when(site_prefix+'/document/:documentId', {
          template: '<document-main></document-main>'
        }).
        when(site_prefix+'/document/:documentId/:slug', {
          template: '<document-main></document-main>'
        }).
        when(site_prefix+'/app/:slug', {
          template: '<app-main></app-main>'
        }).
        when(site_prefix+'/:username/:submenu', {
          template: '<org-main user=user></org-main>',
          resolve: {
             user: ['$route', 'Organization', function($route, Organization) {
                 return Organization.get({ organizationId: $route.current.params.username }).$promise
             }]
           },
           controller: function($scope, user){
             $scope.user = user;
           }
        }).
        when(site_prefix+'/signup/', {
          template: '<log-reg-main></log-reg-main>'
        }).
        when(site_prefix+'/login/', {
          template: '<log-reg-main></log-reg-main>'
        }).
        when(site_prefix+'/ac/:username/:submenu/', {
          template: '<org-sub-main></org-sub-main>'
        }).
        when(site_prefix+'/ac/:username/', {
          template: '<profile-main></profile-main>'
        }).
        when(site_prefix+'/ac/:username/:submenu/', {
          template: '<profile-sub-main></profile-sub-main>',
          requireAuthByUsernameElse404: true
        }).
        when(site_prefix+'/auction/:auctionId/', {
          template: '<auction-main auction=auction></auction-main>',
          resolve: {
             auction: ['$route', 'Bid', function($route, Bid) {
                 return Bid.get({ bidId: $route.current.params.auctionId }).$promise
             }]
           },
           controller: function($scope, auction){
             $scope.auction = auction;
           }
        }).
        when(site_prefix+'/help/', {
          template: '<help-main></help-main>'
        }).
        when(site_prefix+'/help/:tab/', {
          template: '<help-main></help-main>'
        }).
        when(site_prefix+'/company/support/', {
          template: '<contact-main></contact-main>'
        }).
        when(site_prefix+'/company/support/', {
          template: '<contact-main></contact-main>'
        }).
        when(site_prefix+'/company/:submenu/', {
          template: '<company-sub></company-sub>'
        }).
        when(site_prefix+'/404', {
          template: '<error-page type=404></error-page>'
        }).
        when(site_prefix+'/500', {
          template: '<error-page type=500></error-page>'
        }).
        otherwise(site_prefix+'/');
    }
  ]);

  app.run(['$route', '$rootScope', '$location', 'AuthService', 'AuroraModal',
  function ($route, $rootScope, $location, AuthService, AuroraModal) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };

    $rootScope.$on('$routeChangeStart', function (event, newUrl) {
      AuroraModal.isActive=false;
      AuthService.getAuthenticatedUser();
      if (newUrl.requireAuthByUsernameElse404 && !(newUrl.params.username==AuthService.getUser().username)) {
          $location.path('/');
        }
    });

    $rootScope.$on('$routeChangeError', function(event, current, previous, error) {
       if(error.status === 404) {
          $location.path('/404');
       }
   });

    $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
      window.scrollTo(0, 0);
    });
    $rootScope.$broadcast('event:initial-auth');
}]);

app.service('MetaService', function() {
  var title = defaultTitle='bidbuzz India | Upto 99.99% off | Bid Online';
  var metaDescription =defaultDescription= 'Upto 99.99% off. Bid and win your dream product at as low as ₹0.01 via Amazon and Flipkart. Most favored bidding platform. 24/7 support.';
  var metaKeywords = defaultKeywords='';
  var image = defaultImage="https://bidbuzz.in/static/images/og/main_og_image300kb.png";
  return {
     set: function(data) {
         metaKeywords = data.keywords?data.keywords:defaultKeywords;
         metaDescription = data.description?data.description:defaultDescription;
         title = data.title?data.title:defaultTitle;
         image = data.image?data.image:defaultImage;
     },
     metaTitle: function(){ return title; },
     metaDescription: function() { return metaDescription; },
     metaKeywords: function() { return metaKeywords; },
     metaImage: function() { return image; }
  }
});

app.controller(['$rootScope', '$scope', 'AuthService', 'MetaService', function($rootScope, $scope, AuthService, MetaService){

}]);
