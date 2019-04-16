angular.
module('control').
controller('createBonusTransactionController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'User', 'BonusCoinsTransaction',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, User, BonusCoinsTransaction){
  var self = this;
   $scope.currentRoute= function(){
     return $location.path();
   }
   $scope.amount=0;
   $scope.btn_active=true;
   $scope.user={};
   $scope.setUser = function(){
    User.get({phone_number: $scope.phone_number}, function(page){
      $scope.user=page.results[0];
    })
   }
   $scope.bonusCreate = function(){
    $scope.btn_active=false;
    BonusCoinsTransaction.create({
      user: $scope.user.id,
      coins: $scope.coins,
      amount: $scope.amount,
      description: $scope.description,
      transaction: $scope.transaction,
    }).$promise.then(function(response){
      $scope.btn_active=true;
      AuroraModal.isActive=false;
      Aurora.success("Bonus Coins for "+$scope.user.phone_number+" added successfully.");
    }, function(response){
      $scope.btn_active=true;
      Aurora.error(response["data"]);
    });
  }
}])
.constant('createBonusTransactionConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('createBonusTransaction', ['$parse', '$http', '$compile', 'SETTINGS', 'createBonusTransactionConfig',
 function($parse, $http, $compile, SETTINGS, createBonusTransactionConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'createBonusTransactionController',
    templateUrl: '/static/js/app/control/create-bonus-transaction/create-bonus-transaction.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, createBonusTransactionCtrl){
      scope.$watch('data', function(value) {
          scope.item = value.item;
      });
    }
  }
}])
