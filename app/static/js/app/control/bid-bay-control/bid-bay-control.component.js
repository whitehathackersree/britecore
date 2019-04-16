angular.
module('control')
.controller('bidBayControlController', ['$sce', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Item', 'Bid', 'BidData', 'Socket',
 function($sce, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, Item, Bid, BidData, socket){
  var self = this;
  $scope.refreshing=true;
  $scope.bids="";
  Spinner.isCentered=true;
  Spinner.active();
  $scope.load = function(){
     Bid.query({no_page:true, is_active:true, is_won: false}, function(bids){
      $scope.bids=bids;
      $scope.refreshing=false;
      Spinner.inactive();
    });
  }
  $scope.load();
}])
.constant('bidBayControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('bidBayControl', ['$parse', '$http', '$compile', 'SETTINGS', 'bidBayControlConfig',
 function($parse, $http, $compile, SETTINGS, bidBayControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'bidBayControlController',
    templateUrl: '/static/js/app/control/bid-bay-control/bid-bay-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, bidBayControlCtrl){

    }
  }
}])
