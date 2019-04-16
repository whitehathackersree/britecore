angular.
module('common').
controller('heavyAlertController', ['$scope', '$location', '$timeout','$element',
 function($scope, $location, $timeout,$element){
  var self = this;

}])
.constant('heavyAlertConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('heavyAlert', ['$parse', '$http', '$compile', 'SETTINGS', 'heavyAlertConfig',
 function($parse, $http, $compile, SETTINGS, heavyAlertConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      options: '='
    },
    controller: 'heavyAlertController',
    templateUrl: '/static/js/app/common/heavy-alert/heavy-alert.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, heavyAlertCtrl){

    }
  }
}])
