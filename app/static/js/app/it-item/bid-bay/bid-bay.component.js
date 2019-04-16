angular.
module('main')
.controller('bidBayController', ['$scope', '$location', '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Bid', 'BidData', 'Socket',
 function($scope, $location, $timeout,$q, $element, Spinner, Aurora, Bid, BidData, socket){
  var self = this;
  $scope.bids = Bid.query();
  self.bidNotify = function(bid) {
    return $q(function(resolve, reject) {
      bid.notif=true;
      setTimeout(function() {
          resolve(bid);
      }, 1000);
    });
  }
  socket.onmessage(function(event) {
    var message = JSON.parse(event.data)["message"];
    
    ////This doesn't work
    //$scope.bid.top_bid_data=data["message"];//This doesn't work
    if(message["data"]){
      data = message["data"];
      bid = $scope.bids.filter(function(arr){return arr.id == data.bid})[0]
      bid.top_bid_data=data;
      bid.seconds_remaining=bid.top_bid_data.seconds_remaining;
      bid.placing_bid=false;

      var promise = self.bidNotify(bid);
      promise.then(function(bid) {
        bid.notif=false;
      });
    }
    if(message["errors"]){
      errors = message["errors"];
      Aurora.error(errors);
    }
    Spinner.inactive();

  });

}])
.constant('bidBayConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('bidBay', ['$parse', '$http', '$compile', 'SETTINGS', 'bidBayConfig',
 function($parse, $http, $compile, SETTINGS, bidBayConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'bidBayController',
    templateUrl: '/static/js/app/main/bid-bay/bid-bay.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, bidBayCtrl){

    }
  }
}])
