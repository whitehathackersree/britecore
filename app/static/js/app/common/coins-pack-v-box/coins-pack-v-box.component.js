angular.
module('common').
controller('coinsPackVBoxController', ['$scope', '$window', '$location','$element', 'SETTINGS', 'Spinner', 'AuthService', 'Aurora', 'AuroraModal','Transaction',
 function($scope, $window, $location, $element, SETTINGS, Spinner, AuthService, Aurora, AuroraModal, Transaction){
  var self = this;
  self.user = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
  $scope.currentRoute= function(){
    return $location.path();
  }
  $scope.transactionHandler = function(transaction, amount){
    Transaction.create({
      payment_id: transaction.razorpay_payment_id,
      amount: transaction["amount"]
    }).$promise.then(function(){
      AuroraModal.type="coins_ordered";
      AuroraModal.data={
        user: self.user,
        amount: $scope.pack.rate,
      }
      AuroraModal.isActive=true;
      Aurora.success("Payment Success");
    }, function(response){
      AuroraModal.type="transaction-failed";
      AuroraModal.isActive=true;
      Aurora.error(response.data);
    });
  }
  console.log(SETTINGS.RAZORPAY_KEY_ID());
  $scope.options = {
      'key': SETTINGS.RAZORPAY_KEY_ID(),
      // Insert the amount here, dynamically, even
      'amount': $scope.pack.rate*100,
      'name': $scope.pack.title + " Pack",
      'description': $scope.pack.qty + '  coins',
      'image': '',
      'handler': function (transaction) {
        transaction["amount"] = $scope.pack.rate;
        $scope.transactionHandler(transaction);
      },
      'prefill': {
        'name': self.user["name"],
        'email': self.user["email"],
        'contact': self.user["phone_number"],
      },
      "notes": {
        "type": "coins_pack",
        "id": $scope.pack.id
      },
      "theme": {
        "color": "#0069ff"
      }
    };
    $scope.buyBtnClick = function (pid) {
      if(!AuthService.isAuthenticated()){
        $window.location.href = '/login/?next='+ $scope.currentRoute()+'&clickId=coinsPack_'+pid;
        return;
      }
      var rzp1 = new Razorpay($scope.options);
      rzp1.open();
    };

}])
.constant('coinsPackVBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('coinsPackVBox', ['$parse', '$http', '$compile', 'SETTINGS', 'coinsPackVBoxConfig',
 function($parse, $http, $compile, SETTINGS, coinsPackVBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      pack: '='
    },
    controller: 'coinsPackVBoxController',
    templateUrl: '/static/js/app/common/coins-pack-v-box/coins-pack-v-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, coinsPackVBoxCtrl){

    }
  }
}])
