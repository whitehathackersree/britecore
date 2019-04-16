angular.
module('main')
.controller('appMainController', ['$rootScope', '$routeParams','$scope', '$location', '$timeout', '$q',
'$element', 'Spinner', 'Aurora', 'Socket', 'AuthService', 'MetaService', 'Organization',
 function($rootScope, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, socket,
  AuthService, MetaService, Organization){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title: "Live | bidbuzz India - Onlline Bidding Marketplace",
  });
  Spinner.isCentered = true;
  Spinner.active();
  self.authUser = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     $scope.authUser=user;
   });
   $scope.tabs=[
     {"title": "posts", "url": "/", "number": "1.2K"},
     {"title": "documents", "url": "/", "number": "25"},
     {"title": "apps", "url": "/", "number": "165K"},
     {"title": "following", "url": "/", "number": "89"},
     {"title": "followers", "url": "/", "number": "2.5M"},
   ];
   $scope.activeTab = $scope.tabs.filter(function(dc){return dc.title.toLowerCase() == $routeParams.submenu.toLowerCase()})[0];
   Organization.get({organizationId: 1}, function(org) {
     $rootScope.metaservice.set({
       title:org.username+" | app India",
       description: "View bidding profile of "+org.username+" on bidbuzz. bidbuzz is a global hub for bidders. For dreamers of expensive products.",
       keywords: "",
       image: org.og_image,
     });
     $scope.org = org;
     Spinner.inactive();
     $scope.show=true;
   });
}])
.constant('appMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('appMain', ['$parse', '$http', '$compile', 'SETTINGS', 'appMainConfig',
 function($parse, $http, $compile, SETTINGS, appMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'appMainController',
    templateUrl: '/static/js/app/main/app-main/app-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, appMainCtrl){

    }
  }
}])
