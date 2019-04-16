angular.
module('common').
controller('profileTransactionsController', ['$scope', '$location','$element', 'Spinner', 'Payments',
 function($scope, $location, $element, Spinner, Payments){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  Payments.query({}, function(payments){
    payments.forEach(function(p){
      p.notes= p.notes? JSON.parse(p.notes.replace(/'/g, '"')):"{}";
    });
    $scope.payments = payments.reverse();
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.emptyCr = {
    image: "/static/svg/vault.svg",
    heading: "No Transactions done yet!",
    description: "Here you find the history of payments/transactions."
  }

}])
.constant('profileTransactionsConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileTransactions', ['$parse', '$http', '$compile', 'SETTINGS', 'profileTransactionsConfig',
 function($parse, $http, $compile, SETTINGS,  profileTransactionsConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileTransactionsController',
    templateUrl: '/static/js/app/common/profile-transactions/profile-transactions.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileTransactionsCtrl){

    }
  }
}])
