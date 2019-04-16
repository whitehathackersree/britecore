angular.
module('common').
controller('bidVBoxController', ['$scope', '$window', '$location', '$timeout','$q','$element', 'Spinner', 'Aurora', 'Socket', 'BidData', 'AuthService', 'AuroraModal',
 function($scope, $window, $location, $timeout,$q,$element, Spinner, Aurora, socket,BidData, AuthService, AuroraModal){
  var self = this;
  $scope.user = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     $scope.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
  $scope.bid.placing_bid=false;
  $scope.bidPlacedStyle={};
  $scope.placeBid = function(){
    if(!AuthService.isAuthenticated()){
      $window.location.href = '/login/?next='+ $scope.currentRoute();
      return;
    }
    $scope.bid.placing_bid=true;
    Spinner.active();
    socket.send({
      event_type: "place-bid",
      data: {
        bidId: $scope.bid.id
      }
    });
  };

  self.bidNotify = function(bid) {
    return $q(function(resolve, reject) {
      bid.notif=true;
      setTimeout(function() {
          resolve(bid);
      }, 1000);
    });
  }

  socket.subscribe('place-bid', function(message) {
    var data = message["data"];
    var errors = message["errors"];
    if(data?$scope.bid.id==data.bid:false){
      if($scope.bid.top_bid_data?$scope.bid.top_bid_data["id"]!=data["id"]:$scope.bid.started=true){
        $scope.bid.top_bid_data=data;
        $scope.bid.seconds_remaining=data.seconds_remaining;
        $scope.bid.placing_bid=false;

        var promise = self.bidNotify($scope.bid);
        promise.then(function(bid) {
          bid.notif=false;
        });
      }
    }
    Spinner.inactive();

  });

  socket.subscribe('product-won', function(message) {
    var data = message["data"]
    if(data["bid_id"]==$scope.bid.id){
      console.log(data);
      $scope.bid.is_won=true;
      $scope.bid.winner=data["winner"]
      $scope.$apply();
    }
  });

  $scope.no_new_bidders = function(){
    return (($scope.bid.top_bid_data?parseFloat($scope.bid.top_bid_data.amount):0)>parseFloat($scope.bid.disallow_amount))&&!$scope.bid.is_won;
  }
}])
.constant('bidVBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('bidVBox', ['$parse', '$http', '$compile', 'SETTINGS', 'bidVBoxConfig',
 function($parse, $http, $compile, SETTINGS, bidVBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      bid: '='
    },
    controller: 'bidVBoxController',
    templateUrl: '/static/js/app/common/bid-v-box/bid-v-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, bidVBoxCtrl){

    }
  }
}])
