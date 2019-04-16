angular.
module('control')
.controller('bidsControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'AuroraModal', 'Bid',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, AuroraModal, Bid){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.id=$routeParams.id?$routeParams.id:"";
  $scope.item=$routeParams.item?$routeParams.item:"";
  $scope.start_amount=$routeParams.start_amount?$routeParams.start_amount:"";
  $scope.disallow_amount=$routeParams.disallow_amount?$routeParams.disallow_amount:"";
  $scope.start_date_time=$routeParams.start_date_time?$routeParams.start_date_time:"";
  $scope.duration=$routeParams.duration?$routeParams.duration:"";
  $scope.is_active=$routeParams.is_active?$routeParams.is_active:"";
  $scope.allow_buzzers=$routeParams.allow_buzzers?$routeParams.allow_buzzers:"";
  $scope.minimum_buzzer_coins=$routeParams.minimum_buzzer_coins?$routeParams.minimum_buzzer_coins:"";
  $scope.is_won=$routeParams.is_won?$routeParams.is_won:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  $scope.page_size = $routeParams.page_size?$routeParams.page_size:25;
  self.orderings=self.defaultOrderings={
    'id': true,
    'item':true,
    'item__title':true,
    'item__sale_rate': true,
    'start_amount':true,
    'disallow_amount':true,
    'start_date_time':true,
    'duration':true,
    'is_active':true,
    'allow_buzzers':true,
    'minimum_buzzer_coins':true,
    'is_won':true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      ordering: $scope.ordering,
      page_size: $scope.page_size,
      page: $scope.page,
      id: $scope.id,
      item: $scope.item,
      item__title:$scope.item__title,
      item__sale_rate: $scope.item__sale_rate,
      start_amount: $scope.start_amount,
      disallow_amount: $scope.disallow_amount,
      start_date_time: $scope.start_date_time,
      duration: $scope.duration,
      is_active: $scope.is_active,
      allow_buzzers: $scope.allow_buzzers,
      minimum_buzzer_coins: $scope.minimum_buzzer_coins,
      is_won: $scope.is_won,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/bids/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  Spinner.isCentered=true;
  Spinner.active();
  Bid.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.bids = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/bids/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

  $scope.editBid = function(bid){
    AuroraModal.type="control-edit-bid";
    AuroraModal.data={
      id: bid.slug
    }
    AuroraModal.isActive=true;
  }

}])
.constant('bidsControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('bidsControl', ['$parse', '$http', '$compile', 'SETTINGS', 'bidsControlConfig',
 function($parse, $http, $compile, SETTINGS, bidsControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'bidsControlController',
    templateUrl: '/static/js/app/control/bids-control/bids-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, bidsControlCtrl){

    }
  }
}])
