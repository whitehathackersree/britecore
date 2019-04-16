angular.
module('control')
.controller('itemDetailControlController', ['$sce', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Item', 'Bid', 'BidData', 'Socket',
 function($sce, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, Item, Bid, BidData, socket){
  var self = this;
  self.descriptionParser = function(desc){
    var regex = /^[a-z]*.*/gm;
    var m;
    var ul = "<ul>";
    while ((m = regex.exec(desc)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        else{
          ul+="<li>"+m+"</li>";
        }

    }
    return ul+"</ul>";
  }
  $scope.item = Item.get({itemId: $routeParams.itemId}, function(item) {
    item.description = $sce.trustAsHtml(self.descriptionParser(item.description));
  });

}])
.constant('itemDetailControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('itemDetailControl', ['$parse', '$http', '$compile', 'SETTINGS', 'itemDetailControlConfig',
 function($parse, $http, $compile, SETTINGS, itemDetailControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'itemDetailControlController',
    templateUrl: '/static/js/app/control/item-detail-control/item-detail-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, itemDetailControlCtrl){

    }
  }
}])
