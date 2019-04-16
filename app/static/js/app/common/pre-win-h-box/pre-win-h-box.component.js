angular.
module('common').
controller('preWinHBoxController', ['$scope', '$location','$element',
 function($scope, $location, $element){
  var self = this;
}])
.constant('preWinHBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('preWinHBox', ['$parse', '$http', '$compile', 'SETTINGS', 'preWinHBoxConfig',
 function($parse, $http, $compile, SETTINGS, preWinHBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'preWinHBoxController',
    templateUrl: '/static/js/app/common/pre-win-h-box/pre-win-h-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, preWinHBoxCtrl){

    }
  }
}])
