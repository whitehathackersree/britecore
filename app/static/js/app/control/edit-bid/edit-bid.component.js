angular.
module('control').
controller('editBidController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'Bid',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, Bid){
  var self = this;
  self.user = AuthService.getUser();
  $scope.referBid="";
  $scope.btn_active=true;
  
    Bid.get({bidId:$scope.data.id}, function(bid){
      bid.start_date_time = new Date(bid.start_date_time);
      $scope.bid = bid;
    });
  $scope.$watch('data', function(value) {
    Bid.get({bidId:value.id}, function(bid){
      bid.start_date_time = new Date(bid.start_date_time);
      $scope.bid = bid;
    });
  });
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   $scope.bidUpdate = function(){
     $scope.btn_active=false;
     tmpArr = [];
     data={
       bidId:$scope.bid.slug,
       start_amount: $scope.bid.start_amount,
       disallow_amount: $scope.bid.disallow_amount,
       start_date_time: $scope.bid.start_date_time,
       duration: $scope.bid.duration,
       is_active: $scope.bid.is_active,
       allow_buzzers: $scope.bid.allow_buzzers,
       minimum_buzzer_coins: $scope.bid.minimum_buzzer_coins,
       d_coins: $scope.bid.d_coins,
     };
     Bid.update(data,function(bid){
       $scope.btn_active=true;
       Aurora.success("Bid: "+bid.id+" Updated successfully");
       AuroraModal.isActive=false;
       $window.location.reload();
     }, function(response){
       $scope.btn_active=true;
       Aurora.error(response["data"]);
     });
   }

   $scope.bidDelete=function(){
     $scope.btn_active=false;
     if(confirm("Sure to delete BId: "+$scope.bid.id+"?")){
       Bid.delete({bidId:$scope.bid.slug},function(){
         $scope.btn_active=true;
         Aurora.success("Bid deleted successfully");
         AuroraModal.isActive=false;
         $window.location.reload();
       }, function(response){
         $scope.btn_active=true;
         Aurora.error(response["data"]);
       });
     }
     else{
       $scope.btn_active=true;
     }
   }

}])
.constant('editBidConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('editBid', ['$parse', '$http', '$compile', 'SETTINGS', 'editBidConfig',
 function($parse, $http, $compile, SETTINGS, editBidConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'editBidController',
    templateUrl: '/static/js/app/control/edit-bid/edit-bid.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, editBidCtrl){

    }
  }
}])
