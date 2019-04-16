angular.
module('common').
controller('claimedHBoxController', ['$scope', '$sce', '$window','$location', '$timeout','$element', 'Spinner', 'AuthService',
 function($scope, $sce, $window, $location, $timeout,$element, Spinner, AuthService){
  var self = this;
  self.user = AuthService.getUser();
  $scope.delivery_statuses = [
    "order processing", "shipped", "out for delivery", "delivered"
  ];

}])
.constant('claimedHBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('claimedHBox', ['$parse', '$http', '$compile', 'SETTINGS', 'claimedHBoxConfig',
 function($parse, $http, $compile, SETTINGS, claimedHBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      claim: '=',
    },
    controller: 'claimedHBoxController',
    templateUrl: '/static/js/app/common/claimed-h-box/claimed-h-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, claimedHBoxCtrl){

    }
  }
}])
