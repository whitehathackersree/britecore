angular.
module('main')
.controller('logRegMainController', ['$rootScope', '$scope', '$window',  '$routeParams', '$location','$element', 'AuthService', 'MetaService',
 function($rootScope, $scope, $window, $routeParams, $location, $element, AuthService, MetaService){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Log In or Sign Up | bidbuzz",
    description: "",
    keywords: "",
    image: "",
  });
  if(AuthService.isAuthenticated()){
    $window.location.href="/";
  }
  $scope.type = $location.path().includes("signup")?"signup":"login";
  $scope.next = $routeParams.next?($routeParams.next.includes("signup") || $routeParams.next.includes("login")?false:true):false;
  $scope.notif={};

  if($scope.next){
    $scope.notif={
      type: "info",
      message: "Please "+$scope.type+" to see this page.",
    }
  }

  if($routeParams.activated=='true'){
    $scope.notif={
      type: "success",
      message: "Account Activation Successful!",
    }
  }

  $scope.$on('log-reg:notif', function(event,notif) {
     $scope.notif=notif;
     if(notif['change']){
       $scope.type = notif['change'];
     }
   });
}])
.constant('logRegMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('logRegMain', ['$parse', '$http', '$compile', 'SETTINGS', 'logRegMainConfig',
 function($parse, $http, $compile, SETTINGS, logRegMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'logRegMainController',
    templateUrl: '/static/js/app/main/log-reg-main/log-reg-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, logRegMainCtrl){

    }
  }
}])
