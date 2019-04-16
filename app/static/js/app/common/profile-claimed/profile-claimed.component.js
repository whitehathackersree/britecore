angular.
module('common').
controller('profileClaimedController', ['$scope', '$location','$element', 'Spinner', 'Claimed',
 function($scope, $location, $element, Spinner, Claimed){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  $scope.empty =false;
  $scope.claimed = "";
  Claimed.query({}, function(claimed){
    $scope.claimed=claimed;
    if(claimed.length==0)$scope.empty =true;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.emptyCr = {
    image: "/static/svg/empty_claimed.svg",
    heading: "No Gifts claimed yet!",
    description: "If you win any product, please claim them from your Cart."
  }
}])
.constant('profileClaimedConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileClaimed', ['$parse', '$http', '$compile', 'SETTINGS', 'profileClaimedConfig',
 function($parse, $http, $compile, SETTINGS, profileClaimedConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileClaimedController',
    templateUrl: '/static/js/app/common/profile-claimed/profile-claimed.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileClaimedCtrl){

    }
  }
}])
