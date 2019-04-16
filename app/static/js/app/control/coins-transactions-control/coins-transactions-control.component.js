angular.
module('control')
.controller('coinsTransactionsControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'CoinsTransaction',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, CoinsTransaction){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  $scope.page_size = $routeParams.page_size?$routeParams.page_size:25;
  $scope.user__phone_number=$routeParams.user__phone_number?$routeParams.user__phone_number:"";
  $scope.coins_pack=$routeParams.coins_pack?$routeParams.coins_pack:"";
  $scope.qty=$routeParams.qty?$routeParams.qty:"";
  $scope.transaction=$routeParams.transaction?$routeParams.transaction:"";
  self.orderings=self.defaultOrderings={
    'user__phone_number':true,
    'coins_pack': true,
    'qty': true,
    'transaction': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: $scope.page_size,
      page: $scope.page,
      ordering: $scope.ordering,
      user__phone_number: $scope.user__phone_number,
      qty: $scope.qty,
      transaction: $scope.transaction,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/coinst/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  Spinner.isCentered=true;
  Spinner.active();
  CoinsTransaction.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.coinsTransactions = page_data.results;
    Spinner.inactive();
    $scope.show=true;

  },function(response){
    Aurora.error(response.data);
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/coinst/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

}])
.constant('coinsTransactionsControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('coinsTransactionsControl', ['$parse', '$http', '$compile', 'SETTINGS', 'coinsTransactionsControlConfig',
 function($parse, $http, $compile, SETTINGS, coinsTransactionsControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'coinsTransactionsControlController',
    templateUrl: '/static/js/app/control/coins-transactions-control/coins-transactions-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, coinsTransactionsControlCtrl){

    }
  }
}])
