angular.
module('control')
.controller('itemsControlController', ['$sce', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'AuroraModal', 'Item', 'Bid', 'BidData', 'Socket',
 function($sce, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, AuroraModal, Item, Bid, BidData, socket){
  var self = this;
  $scope.items = Item.query({}, function(items){

  });

  $scope.createBid = function(item){
    AuroraModal.type="control-create-bid";
    AuroraModal.data={
      item: item
    }
    AuroraModal.isActive=true;
  }

  $scope.createItem = function(){
    AuroraModal.type="control-create-item";
    AuroraModal.data={

    }
    AuroraModal.isActive=true;
  }

  $scope.editItem = function(){
    AuroraModal.type="control-edit-item";
    AuroraModal.data={
      item: item
    }
    AuroraModal.isActive=true;
  }

}])
.constant('itemsControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('itemsControl', ['$parse', '$http', '$compile', 'SETTINGS', 'itemsControlConfig',
 function($parse, $http, $compile, SETTINGS, itemsControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'itemsControlController',
    templateUrl: '/static/js/app/control/items-control/items-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, itemsControlCtrl){

    }
  }
}])
