angular.
module('control').
controller('createBidController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal','Bid',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, Bid){
  var self = this;
  self.user = AuthService.getUser();
  $scope.item=$scope.data.item;
  $scope.buzzerCoins=50;
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   $scope.start_amount=0;
   $scope.duration=10;
   $scope.is_active=true;
   $scope.allow_buzzers=true;
   $scope.btn_active=true;
   $scope.minimum_buzzer_coins=50;
   var curr_dt = new Date();
   curr_dt.setSeconds(0);
   curr_dt.setMilliseconds(0);
   $scope.start_date_time = curr_dt;
  $scope.bidCreate = function(){
    $scope.btn_active=false;
    if(AuthService.isAuthenticated()){
      Bid.create({
        item: $scope.item.id,
        start_amount: $scope.start_amount,
        disallow_amount: $scope.disallow_amount,
        start_date_time: $scope.start_date_time,
        duration: $scope.duration,
        is_active: $scope.is_active,
        allow_buzzers: $scope.allow_buzzers,
        minimum_buzzer_coins: $scope.minimum_buzzer_coins,
      }).$promise.then(function(){
        $scope.btn_active=true;
        AuroraModal.isActive=false;
        Aurora.success("Bid created successfully.");
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
.constant('createBidConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('createBid', ['$parse', '$http', '$compile', 'SETTINGS', 'createBidConfig',
 function($parse, $http, $compile, SETTINGS, createBidConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'createBidController',
    templateUrl: '/static/js/app/control/create-bid/create-bid.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, createBidCtrl){
      scope.$watch('data', function(value) {
          scope.item = value.item;
      });
    }
  }
}])
