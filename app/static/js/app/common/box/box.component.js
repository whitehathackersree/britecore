angular.
module('common').
controller('boxController', ['$scope', '$sce', '$window','$location', '$timeout','$element',
 function($scope, $sce, $window, $location, $timeout,$element){
  var self = this;
}])
.constant('boxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('box', ['$parse', '$http', '$compile', 'SETTINGS','boxConfig',
 function($parse, $http, $compile, SETTINGS, boxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      head: '@',
      para: '@',
    },
    controller: 'boxController',
    templateUrl: '/static/js/app/common/box/box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, boxCtrl){

    }
  }
}])
