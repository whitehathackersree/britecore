angular.
module('common').
controller('auroraFlyoutController', ['$scope', '$location', '$window', '$element',
 function($scope, $location, $window, $element){
  var self = this;
  $scope.isActive = false;
  self.trigger = $element[0].querySelector(".aurora-flyout-trigger");
  self.container = $element[0].querySelector(".aurora-flyout-container");
  $scope.toggle = function(event){
    $scope.isActive = !$scope.isActive;
    event.stopPropagation();
  }
  $window.onclick = function(e) {
    if (e.target !== $element[0] || $element[0].contains(e.target)) {
      $scope.$apply(function(){
        $scope.isActive = false;
      });
      return;
    }
    return;
  }
}])
.constant('auroraFlyoutConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('auroraFlyout', ['$parse', '$http', '$compile', 'SETTINGS', 'auroraFlyoutConfig',
 function($parse, $http, $compile, SETTINGS, auroraFlyoutConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      triggerType: '@',
      triggerImage: '=',
      triggerIcon: '@',
      options: '=',
      badge: '=',
    },
    controller: 'auroraFlyoutController',
    templateUrl: '/static/js/app/common/aurora-flyout/aurora-flyout.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, auroraFlyoutCtrl){

    }
  }
}])
