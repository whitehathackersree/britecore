angular.
module('main')
.controller('orgMainController', ['$sce','$rootScope', '$routeParams', '$timeout', '$scope', '$window',
'$location', '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'AuroraModal', 'Socket', 'AuthService', 'MetaService', 'Organization',
 function($sce, $rootScope,  $routeParams, $timeout, $scope, $window, $location, $timeout,$q, $element, Spinner, Aurora,AuroraModal,
    socket, AuthService, MetaService, Organization){
  var self = this;
  $scope.org = $scope.user;
  Spinner.isCentered = true;
  Spinner.active();
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:$scope.user.full_name + " (@"+$scope.user.username+")"+" | app",
    metaDescription:"",
    image: "/",
  });
  Spinner.inactive();
  $scope.show=true;
  self.authUser = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     $scope.authUser=user;
   });
   $scope.getTabs = function(){
     return [
       {"title": "info", "url": "/"+$routeParams.username+"/"+"info"},
       {"title": "posts",  "url": "/"+$routeParams.username+"/"+"posts", "number": "1.2K"},
       {"title": "documents",  "url": "/"+$routeParams.username+"/"+"documents", "number": "25"},
       {"title": "apps",  "url": "/"+$routeParams.username+"/"+"apps", "number": "165K"},
       {"title": "following",  "url": "/"+$routeParams.username+"/"+"following", "number": "89"},
       {"title": "followers",  "url": "/"+$routeParams.username+"/"+"followers", "number": "2.5M"},
     ];
   }
   $scope.tabs=$scope.getTabs();
   $scope.activeTab = $scope.tabs.filter(function(dc){return dc.title.toLowerCase() == $routeParams.submenu.toLowerCase()})[0];
}])
.constant('orgMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('orgMain', ['$parse', '$http', '$compile', 'SETTINGS', 'orgMainConfig',
 function($parse, $http, $compile, SETTINGS,  orgMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      user: '='
    },
    controller: 'orgMainController',
    templateUrl: '/static/js/app/main/org-main/org-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, orgMainCtrl){

    }
  }
}])
