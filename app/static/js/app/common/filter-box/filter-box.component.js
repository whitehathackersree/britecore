angular.
module('common').
controller('filterBoxController', ['$scope', '$location','$element',
 function($scope, $location, $element){
  var self = this;
}])
.constant('filterBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('filterBox', ['$parse', '$http', '$compile', 'SETTINGS', 'filterBoxConfig',
 function($parse, $http, $compile, SETTINGS,  filterBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      filter: '='
    },
    controller: 'filterBoxController',
    templateUrl: '/static/js/app/common/filter-box/filter-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, filterBoxCtrl){

    }
  }
}])
