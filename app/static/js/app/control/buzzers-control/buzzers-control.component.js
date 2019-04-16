angular.
module('control')
.controller('buzzersControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Buzzer',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, Buzzer){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.id=$routeParams.id?$routeParams.id:"";
  $scope.user__username=$routeParams.user__username?$routeParams.user__username:"";
  $scope.user__phone_number=$routeParams.user__phone_number?$routeParams.user__phone_number:"";
  $scope.user__is_dummy=$routeParams.user__is_dummy?$routeParams.user__is_dummy:"";
  $scope.bid__id=$routeParams.bid__id?$routeParams.bid__id:"";
  $scope.coins=$routeParams.coins?$routeParams.coins:"";
  $scope.active=$routeParams.active?$routeParams.active:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  self.orderings=self.defaultOrderings={
    'id': true,
    'user__phone_number':true,
    'user__username': true,
    'bid__id': true,
    'coins': true,
    'active': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: 100,
      page: $scope.page,
      id: $scope.id,
      user__username: $scope.user__username,
      user__phone_number: $scope.user__phone_number,
      user__is_dummy: $scope.user__is_dummy,
      bid__id: $scope.bid__id,
      coins: $scope.coins,
      active: $scope.active,
      ordering: $scope.ordering,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/buzzers/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  Spinner.isCentered=true;
  Spinner.active();
  Buzzer.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.buzzers = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/buzzers/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

}])
.constant('buzzersControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('buzzersControl', ['$parse', '$http', '$compile', 'SETTINGS', 'buzzersControlConfig',
 function($parse, $http, $compile, SETTINGS, buzzersControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'buzzersControlController',
    templateUrl: '/static/js/app/control/buzzers-control/buzzers-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, buzzersControlCtrl){

    }
  }
}])
