angular.
module('main')
.controller('homeMainController', ['$rootScope', '$scope', '$location', '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Socket', 'AuthService', 'MetaService',
 function($rootScope, $scope, $location, $timeout,$q, $element, Spinner, Aurora, socket, AuthService, MetaService){
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
  $scope.emptyCr = {
    image: "/static/svg/box.svg",
    heading: "No Products available to bid on!",
    description: "New products will be added every Saturday at 12:00 AM."
  }
}])
.constant('homeMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('homeMain', ['$parse', '$http', '$compile', 'SETTINGS', 'homeMainConfig',
 function($parse, $http, $compile, SETTINGS, homeMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'homeMainController',
    templateUrl: '/static/js/app/main/home-main/home-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, homeMainCtrl){

    }
  }
}])
