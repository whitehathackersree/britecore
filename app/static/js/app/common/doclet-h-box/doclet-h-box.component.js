angular.
module('common').
controller('appHBoxController', ['$scope', '$sce', '$window','$location', '$timeout','$element', 'Spinner', 'AuthService', 'Transaction', 'AuroraModal',
 function($scope, $sce, $window, $location, $timeout,$element, Spinner, AuthService,Transaction, AuroraModal){
  var self = this;

}])
.constant('appHBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('appHBox', ['$parse', '$http', '$compile', 'SETTINGS', 'appHBoxConfig',
 function($parse, $http, $compile, SETTINGS, appHBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      app: "="
    },
    controller: 'appHBoxController',
    templateUrl: '/static/js/app/common/app-h-box/app-h-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, appHBoxCtrl){

    }
  }
}])
