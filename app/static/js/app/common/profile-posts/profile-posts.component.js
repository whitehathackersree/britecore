angular.
module('common').
controller('profilePostsController', ['$scope', '$location','$element', 'Spinner',
 function($scope, $location, $element, Spinner, Payments){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  $scope.emptyCr = {
    image: "/static/svg/vault.svg",
    heading: "No Transactions done yet!",
    description: "Here you find the history of payments/transactions."
  }

}])
.constant('profilePostsConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profilePosts', ['$parse', '$http', '$compile', 'SETTINGS', 'profilePostsConfig',
 function($parse, $http, $compile, SETTINGS,  profilePostsConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profilePostsController',
    templateUrl: '/static/js/app/common/profile-posts/profile-posts.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profilePostsCtrl){

    }
  }
}])
