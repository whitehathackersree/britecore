angular.
module('common').
controller('registerVBoxController', ['$rootScope', '$scope', '$routeParams', '$window', '$location', '$http', '$cookies', 'AuthService','$element', 'Spinner', 'Aurora',
 function($rootScope, $scope, $routeParams, $window, $location, $http, $cookies, AuthService, $element, Spinner, Aurora){
  var self = this;
  $scope.disable_otp_btn=false;
  var otp_resend_time = 1*30;
  var send_otp_btn = $element[0].querySelector("#send_otp_btn");
  var tmp = otp_resend_time;
  self.startSendOTPTimer = function(){
    $scope.disable_otp_btn=true;
    var interval = setInterval(function(){
      var c=tmp--,m=(c/60)>>0,s=(c-m*60)+'';
      send_otp_btn.value=m+':'+(s.length>1?'':'0')+s;

      if(tmp<0){
        tmp = otp_resend_time;
        clearInterval(interval);
        $scope.disable_otp_btn=false;
        send_otp_btn.value="Resend OTP";
        $scope.$apply();
      }
    },1000);
  }


  $scope.sendOTP = function(){
    $scope.disable_otp_btn=true;
    AuthService.sendOTP($scope.phone_number)
    .then(function(response) {  // sucsess
      $rootScope.$broadcast('log-reg:notif', {
        type: "success",
        message: "OTP has been sent.",
      });
      self.startSendOTPTimer();
    },
    function(response) { // failed
      $scope.disable_otp_btn=false;
      Aurora.error(response.data)
    });

  };

  $scope.referral = $routeParams.referral;

  $scope.register = function(){
    $scope.is_loading=true;
    AuthService.register($scope.phone_number, $scope.otp, $scope.email, $scope.password, $scope.referral)
    .then(function(response) {  // sucsess
      $rootScope.$broadcast('log-reg:notif', {
        type: "success",
        message: "Successfully registered. Now, you may go ahead and Log in.",
        change: "login",
      });
      $location.path('/login/', false);
    },
    function(response) { // failed
      Aurora.error(response.data)
      $scope.is_loading=false;
    });
  }

}])
.constant('registerVBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('registerVBox', ['$parse', '$http', '$compile', 'SETTINGS', 'registerVBoxConfig',
 function($parse, $http, $compile, SETTINGS, registerVBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      bid: '='
    },
    controller: 'registerVBoxController',
    templateUrl: '/static/js/app/common/register-v-box/register-v-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, registerVBoxCtrl){

    }
  }
}])
