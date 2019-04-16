angular.
module('common').
controller('profileappsController', ['$scope', '$location','$element', 'Spinner',
 function($scope, $location, $element, Spinner){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;



  $scope.emptyCr = {
    image: "/static/svg/coins_layer_bw.svg",
    heading: "No Coins used yet!",
    description: "Here you find the history of the coins used."
  }
}])
.constant('profileappsConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileapps', ['$parse', '$http', '$compile', 'SETTINGS', 'profileappsConfig',
 function($parse, $http, $compile, SETTINGS, profileappsConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileappsController',
    templateUrl: '/static/js/app/common/profile-apps/profile-apps.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileappsCtrl){

    }
  }
}])
