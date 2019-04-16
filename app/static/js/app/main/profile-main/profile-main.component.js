angular.
module('main')
.controller('profileMainController', ['$rootScope', '$scope', '$timeout', '$location', '$routeParams', '$element', 'MetaService', 'Spinner', 'AuthService', 'User',
 function($rootScope, $scope, $timeout, $location, $routeParams, $element, MetaService, Spinner, AuthService, User){
  var self = this;
  $rootScope.metaservice = MetaService;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;
  User.queryPage({username: $routeParams.username}, function(page) {
    users = page.results;
    User.get({userId: users[0].id}, function(user){
      $rootScope.metaservice.set({
        title:user.username+" | bidbuzz India",
        description: "View bidding profile of "+user.username+" on bidbuzz. bidbuzz is a global hub for bidders. For dreamers of expensive products.",
        keywords: "",
        image: user.og_image,
      });
      $scope.user = user;
      Spinner.inactive();
      $scope.show=true;
    });
  });

  $scope.emptyCr = {
    image: "/static/svg/empty_box.svg",
    description: "This user has not won any products yet!",
  }

}])
.constant('profileMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileMain', ['$parse', '$http', '$compile', 'SETTINGS', 'profileMainConfig',
 function($parse, $http, $compile, SETTINGS, profileMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'profileMainController',
    templateUrl: '/static/js/app/main/profile-main/profile-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileMainCtrl){

    }
  }
}])
