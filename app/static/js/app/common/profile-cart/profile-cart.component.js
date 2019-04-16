angular.
module('common').
controller('profileCartController', ['$scope', '$location','$element', 'Spinner', 'Cart',
 function($scope, $location, $element, Spinner, Cart){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  $scope.empty =false;
  $scope.cart = "";
  Cart.query({}, function(cart){
    $scope.cart=cart;
    if(cart.length==0)$scope.empty = true;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.emptyCr = {
    image: "/static/svg/empty_cart.svg",
    heading: "Your cart is empty.",
    description: "Products won and not yet claimed will appear here."
  }
}])
.constant('profileCartConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileCart', ['$parse', '$http', '$compile', 'SETTINGS', 'profileCartConfig',
 function($parse, $http, $compile, SETTINGS, profileCartConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileCartController',
    templateUrl: '/static/js/app/common/profile-cart/profile-cart.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileCartCtrl){

    }
  }
}])
