angular.
module('common').
controller('passwordResetBoxController', ['$rootScope', '$scope', '$routeParams', '$window', '$location', '$q', '$http', '$cookies', 'AuthService','$element', 'Spinner', 'Aurora', 'AuroraModal',
 function($rootScope, $scope, $routeParams, $window, $location, $q, $http, $cookies, AuthService, $element, Spinner, Aurora, AuroraModal){
  var self = this;
  if(angular.isUndefined($scope.data.otpSent)){
    $scope.data.otpSent=false;
  }
  $scope.sendOTP = function(e){
    e.preventDefault();
    AuthService.sendOTP($scope.phone_number)
    .then(function(response) {  // sucsess
      Aurora.success("OTP has been sent");
      $scope.data.otpSent=true;
    },
    function(response) {
      Aurora.error(response.data)
    });

  };

  $scope.resetPassword = function(e){
    e.preventDefault();
    AuthService.passwordReset($scope.phone_number, $scope.otp, $scope.password)
    .then(function(response) {  // sucsess
      Aurora.success("Password changed successfully.");
      AuroraModal.isActive=false;
    },
    function(response) {
      Aurora.error(response.data)
    });

  };

  $scope.$watch('confirm_password', function(n, o){
    if($scope.password!=n){
      $scope.password_error=true;
    }
    else{
      $scope.password_error=false;
    }
  });



}])
.constant('passwordResetBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('passwordResetBox', ['$parse', '$http', '$compile', 'SETTINGS', 'passwordResetBoxConfig',
 function($parse, $http, $compile, SETTINGS, passwordResetBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'passwordResetBoxController',
    templateUrl: '/static/js/app/common/password-reset-box/password-reset-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, passwordResetBoxCtrl){

    }
  }
}])
