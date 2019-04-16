angular.
module('control')
.controller('winnersControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'WinnerData',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, WinnerData){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  $scope.winner__phone_number=$routeParams.winner__phone_number?$routeParams.winner__phone_number:"";
  $scope.sold=$routeParams.sold?$routeParams.sold:"";
  $scope.bid__id=$routeParams.bid__id?$routeParams.bid__id:"";
  $scope.order_platform=$routeParams.order_platform?$routeParams.order_platform:"";
  $scope.order_no=$routeParams.order_no?$routeParams.order_no:"";
  $scope.delivered=$routeParams.delivered?$routeParams.delivered:"";
  self.orderings=self.defaultOrderings={
    'winner__phone_number':true,
    'order_platform': true,
    'delivered': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: 50,
      ordering: $scope.ordering,
      page: $scope.page,
      winner__phone_number: $scope.winner__phone_number,
      sold: $scope.sold?$scope.sold:"",
      bid__id: $scope.bid__id,
      order_platform: $scope.order_platform,
      order_no: $scope.order_no,
      delivered: $scope.delivered,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/winners/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  WinnerData.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.winners = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/winners/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

}])
.constant('winnersControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('winnersControl', ['$parse', '$http', '$compile', 'SETTINGS', 'winnersControlConfig',
 function($parse, $http, $compile, SETTINGS, winnersControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'winnersControlController',
    templateUrl: '/static/js/app/control/winners-control/winners-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, winnersControlCtrl){

    }
  }
}])
