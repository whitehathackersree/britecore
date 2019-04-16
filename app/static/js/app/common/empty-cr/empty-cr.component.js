angular.
module('common').
controller('emptyCrController', ['$scope', '$sce', '$window','$location', '$timeout','$element',
 function($scope, $sce, $window, $location, $timeout,$element){
  var self = this;
  $scope.description = $scope.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
  $scope.parsedDescription = $sce.trustAsHtml($scope.description);
}])
.constant('emptyCrConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('emptyCr', ['$parse', '$http', '$compile', 'SETTINGS', 'emptyCrConfig',
 function($parse, $http, $compile, SETTINGS, emptyCrConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      image: '=',
      heading: '=',
      description: '='
    },
    controller: 'emptyCrController',
    templateUrl: '/static/js/app/common/empty-cr/empty-cr.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, emptyCrCtrl){

    }
  }
}])
