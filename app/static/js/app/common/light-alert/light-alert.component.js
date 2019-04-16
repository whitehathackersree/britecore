angular.
module('common').
controller('lightAlertController', ['$scope',function($scope){
  var self = this;
  $scope.showClose = angular.isDefined($scope.showClose) ? $scope.showClose : true;
}])
.constant('lightAlertConfig', {
  showClose: true,
})
.directive('lightAlert', ['$parse', '$http', '$compile', 'SETTINGS', 'lightAlertConfig',
 function($parse, $http, $compile, SETTINGS, lightAlertConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      description: '@',
      actionTitle: '@',
      action: '@',
      showClose: "=?",
    },
    controller: 'lightAlertController',
    templateUrl: '/static/js/app/common/light-alert/light-alert.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, lightAlertCtrl){

    }
  }
}])
