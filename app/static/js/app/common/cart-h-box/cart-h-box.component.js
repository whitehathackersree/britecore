angular.
module('common').
controller('cartHBoxController', ['$scope', '$sce', '$window','$location', '$timeout','$element', 'SETTINGS', 'Spinner', 'AuthService', 'Transaction', 'AuroraModal',
 function($scope, $sce, $window, $location, $timeout,$element, SETTINGS, Spinner, AuthService,Transaction, AuroraModal){
  var self = this;
  self.user = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });

  $scope.claimed = false;
  $scope.currentRoute= function(){
    return $location.path();
  }

  $scope.transactionHandler = function(transaction, amount){
    Transaction.create({
      payment_id: transaction.razorpay_payment_id,
      amount: transaction["amount"]
    }).$promise.then(function(response){
      $scope.claimed = true;
      $scope.note = {
        type: 'success',
        message: $sce.trustAsHtml("Payment done successfully. Please visit <a href='/ac/"+self.user.username+"/claimed/'>claims</a> to track your order.")
      };
      AuroraModal.type="product_claimed";
      AuroraModal.data={
        user: self.user,
        item_image: $scope.cart.item_primary_images['100x100'],
        item_title: $scope.cart.item_title,
      }
      AuroraModal.isActive=true;

    }, function(){
      AuroraModal.type="transaction-failed";
      AuroraModal.isActive=true;
    });
  }

  $scope.options = {
      'key': SETTINGS.RAZORPAY_KEY_ID(),
      // Insert the amount here, dynamically, even
      'amount': parseInt(Math.ceil($scope.cart.sale_amount)*100),
      'name': $scope.cart.item_title,
      'description':  'CLAIM_ID: #'+$scope.cart.claim_id,
      'image': '',
      'handler': function (transaction) {
        transaction["amount"] = Math.ceil($scope.cart.sale_amount);
        $scope.transactionHandler(transaction);
      },
      'prefill': {
        'name': self.user["name"],
        'email': self.user["email"],
        'contact': self.user["phone_number"],
      },
      "notes": {
        "type": "claim",
        "id": $scope.cart.claim_id
      },
      "theme": {
        "color": "#0069ff"
      }
    };
    $scope.claimBtnClick = function (pid) {
      
      if(!AuthService.isAuthenticated()){
        $window.location.href = '/login/?next='+ $scope.currentRoute();
        return;
      }
      var rzp1 = new Razorpay($scope.options);
      rzp1.open();
    };

}])
.constant('cartHBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('cartHBox', ['$parse', '$http', '$compile', 'SETTINGS', 'cartHBoxConfig',
 function($parse, $http, $compile, SETTINGS, cartHBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      cart: '=',
    },
    controller: 'cartHBoxController',
    templateUrl: '/static/js/app/common/cart-h-box/cart-h-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, cartHBoxCtrl){

    }
  }
}])
