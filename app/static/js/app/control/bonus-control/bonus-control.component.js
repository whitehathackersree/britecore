angular.
module('control')
.controller('bonusControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'AuroraModal', 'BonusCoinsTransaction',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, AuroraModal, BonusCoinsTransaction){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.id=$routeParams.id?$routeParams.id:"";
  $scope.user__phone_number=$routeParams.user__phone_number?$routeParams.user__phone_number:"";
  $scope.coins=$routeParams.coins?$routeParams.coins:"";
  $scope.amount=$routeParams.amount?$routeParams.amount:"";
  $scope.transaction=$routeParams.transaction?$routeParams.transaction:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  self.orderings=self.defaultOrderings={
    'id': true,
    'user__phone_number':true,
    'coins': true,
    'amount': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: 25,
      page: $scope.page,
      ordering: $scope.ordering,
      id: $scope.id,
      user__phone_number: $scope.user__phone_number,
      coins: $scope.coins,
      amount: $scope.amount,
      transaction: $scope.transaction,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/bonus/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  Spinner.isCentered=true;
  Spinner.active();
  BonusCoinsTransaction.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.bonuss = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/bonus/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

  $scope.issueBonus = function(){
    AuroraModal.type="control-create-bonus-transaction";
    AuroraModal.data={

    }
    AuroraModal.isActive=true;
  }


}])
.constant('bonusControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('bonusControl', ['$parse', '$http', '$compile', 'SETTINGS', 'bonusControlConfig',
 function($parse, $http, $compile, SETTINGS, bonusControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'bonusControlController',
    templateUrl: '/static/js/app/control/bonus-control/bonus-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, bonusControlCtrl){

    }
  }
}])
