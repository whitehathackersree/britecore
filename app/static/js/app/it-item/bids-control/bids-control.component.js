angular.
module('control')
.controller('bidsControlController', ['$sce', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Item', 'Bid', 'BidData', 'Socket',
 function($sce, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, Item, Bid, BidData, socket){
  var self = this;
  $scope.refreshing=true;
  $scope.bids="";
  $scope.load = function(){
     Bid.query({no_page:true}, function(bids){
      $scope.bids=bids;
      $scope.refreshing=false;
    });
  }
  $scope.load();
}])
.constant('bidsControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('bidsControl', ['$parse', '$http', '$compile', 'SETTINGS', 'bidsControlConfig',
 function($parse, $http, $compile, SETTINGS, bidsControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'bidsControlController',
    templateUrl: '/static/js/app/control/bids-control/bids-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, bidsControlCtrl){

    }
  }
}])
