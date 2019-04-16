angular.
module('common').
controller('createBuzzerController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal','Buzzer',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, Buzzer){
  var self = this;
  self.user = AuthService.getUser();
  $scope.buzzerCoins=$scope.data.bidMinimumBuzzerCoins;
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   $scope.btn_active=true;
  $scope.buzzerCreate = function(){
    if(AuthService.isAuthenticated()){
      $scope.btn_active=false;
      Buzzer.create({
        user: self.user.id,
        bid: $scope.data.bidId,
        coins: $scope.buzzerCoins
      }).$promise.then(function(){
        $scope.btn_active=true;
        AuroraModal.isActive=false;
        Aurora.success("buzzer created successfully.");
      }, function(response){
        $scope.btn_active=true;
        Aurora.error(response["data"]);
      });
    }
    else{
      $window.location.href = '/login/?next='+ $scope.currentRoute();
      return;
    }
  }
}])
.constant('createBuzzerConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('createBuzzer', ['$parse', '$http', '$compile', 'SETTINGS', 'createBuzzerConfig',
 function($parse, $http, $compile, SETTINGS, createBuzzerConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'createBuzzerController',
    templateUrl: '/static/js/app/common/create-buzzer/create-buzzer.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, createBuzzerCtrl){

    }
  }
}])
