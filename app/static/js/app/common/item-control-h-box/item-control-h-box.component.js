angular.
module('common').
controller('itemControlHBoxController', ['$scope', '$location', '$timeout','$element', 'Spinner', 'Socket', 'BidData',
 function($scope, $location, $timeout,$element, Spinner, socket,BidData){
  var self = this;

}])
.constant('itemControlHBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('itemControlHBox', ['$parse', '$http', '$compile', 'SETTINGS', 'itemControlHBoxConfig',
 function($parse, $http, $compile, SETTINGS, itemControlHBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      item: '='
    },
    controller: 'itemControlHBoxController',
    templateUrl: '/static/js/app/common/item-control-h-box/item-control-h-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, itemControlHBoxCtrl){

    }
  }
}])
