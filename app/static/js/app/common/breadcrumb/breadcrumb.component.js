angular.
module('common').
controller('breadcrumbController', ['$scope', '$location', '$timeout','$element',
 function($scope, $location, $timeout,$element){
  var self = this;

}])
.constant('breadcrumbConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('breadcrumb', ['$parse', '$http', '$compile', 'SETTINGS', 'breadcrumbConfig',
 function($parse, $http, $compile, SETTINGS, breadcrumbConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      options: '='
    },
    controller: 'breadcrumbController',
    templateUrl: '/static/js/app/common/breadcrumb/breadcrumb.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, breadcrumbCtrl){

    }
  }
}])
