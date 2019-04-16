angular.
module('control').
controller('editWinnerDeliveryController', ['$scope', '$window', '$location','$element', 'SETTINGS', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'WinnerData',
 function($scope, $window, $location, $element, SETTINGS, Spinner, Aurora, AuthService,AuroraModal, WinnerData){
  var self = this;
  self.user = AuthService.getUser();
  $scope.referBid="";
  $scope.btn_active=true;
  $scope.order_platforms=SETTINGS.ORDER_PLATFORMS;
  $scope.delivery_statuses=SETTINGS.DELIVERY_STATUS;
  $scope.$watch('data', function(value) {
    $scope.wd = {};
    WinnerData.get({winnerDataId:value.id}, function(wd){
      $scope.wd = wd;
    });
  });
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   $scope.wdUpdate = function(){
     $scope.btn_active=false;
     data={
       winnerDataId:$scope.wd.id,
       order_platform: $scope.wd.order_platform,
       order_no: $scope.wd.order_no,
       address: $scope.wd.address,
       delivery_status: $scope.wd.delivery_status,
     };
     WinnerData.patch(data,function(wd){
       $scope.btn_active=true;
       Aurora.success("WinnerData: "+wd.id+" Updated successfully");
       AuroraModal.isActive=false;
       //$window.location.reload();
     }, function(response){
       $scope.btn_active=true;
       Aurora.error(response["data"]);
     });
   }

}])
.constant('editWinnerDeliveryConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('editWinnerDelivery', ['$parse', '$http', '$compile', 'SETTINGS', 'editWinnerDeliveryConfig',
 function($parse, $http, $compile, SETTINGS, editWinnerDeliveryConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'editWinnerDeliveryController',
    templateUrl: '/static/js/app/control/edit-winner-delivery/edit-winner-delivery.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, editWinnerDeliveryCtrl){

    }
  }
}])
