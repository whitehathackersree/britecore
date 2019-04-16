angular.
module('control')
.controller('itemsControlController', ['$sce', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'AuroraModal', 'Item', 'Bid', 'BidData', 'Socket',
 function($sce, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, AuroraModal, Item, Bid, BidData, socket){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.items = [];
  Item.query({no_page:true}, function(items){
    $scope.items=items;
    Spinner.inactive();
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

  $scope.editItem = function(item){
    AuroraModal.type="control-edit-item";
    AuroraModal.data={
      id: item.id
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
