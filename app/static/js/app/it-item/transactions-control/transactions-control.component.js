angular.
module('control')
.controller('transactionsControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Transaction',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, Transaction){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.amount=$routeParams.amount?$routeParams.amount:"";
  $scope.method=$routeParams.method?$routeParams.method:"";
  $scope.user__phone_number=$routeParams.user__phone_number?$routeParams.user__phone_number:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  self.orderings=self.defaultOrderings={
    'user__phone_number':true,
    'amount': true,
    'method': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: 25,
      page: $scope.page,
      user__phone_number: $scope.user__phone_number,
      method: $scope.method?$scope.method.toUpperCase():"",
      amount: $scope.amount,
      ordering: $scope.ordering,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/transactions/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  Transaction.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.transactions = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/transactions/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

}])
.constant('transactionsControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('transactionsControl', ['$parse', '$http', '$compile', 'SETTINGS', 'transactionsControlConfig',
 function($parse, $http, $compile, SETTINGS, transactionsControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'transactionsControlController',
    templateUrl: '/static/js/app/control/transactions-control/transactions-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, transactionsControlCtrl){

    }
  }
}])
