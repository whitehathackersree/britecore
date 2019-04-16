angular.
module('common').
controller('loginVBoxController', ['$rootScope', '$scope', '$routeParams', '$window', '$location', '$q', '$http', '$cookies', 'AuthService','$element', 'Spinner', 'Aurora', 'AuroraModal',
 function($rootScope, $scope, $routeParams, $window, $location, $q, $http, $cookies, AuthService, $element, Spinner, Aurora, AuroraModal){
  var self = this;
  $scope.login = function(){
    if(!$scope.username || !$scope.password){
      Aurora.error("Invalid Credentials!");
      return;
    }
    AuthService.login($scope.username, $scope.password)
    .then(function(response) {  // sucsess
      if($routeParams.next?($routeParams.next.includes("signup") || $routeParams.next.includes("login")?false:true):false){
        $window.location.href = $routeParams.next+'?'+dictToURI($routeParams);
      }else{
        $window.location.href = '/';
      }
    },
    function(response) { // failed
      Aurora.error(response.data);
    });
  }

  $scope.forgotPassword = function(){
    AuroraModal.type="password-reset-box";
    AuroraModal.data={
      otpSent: false,
    }
    AuroraModal.isActive=true;
  }

}])
.constant('loginVBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('loginVBox', ['$parse', '$http', '$compile', 'SETTINGS', 'loginVBoxConfig',
 function($parse, $http, $compile, SETTINGS, loginVBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      bid: '='
    },
    controller: 'loginVBoxController',
    templateUrl: '/static/js/app/common/login-v-box/login-v-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, loginVBoxCtrl){

    }
  }
}])
