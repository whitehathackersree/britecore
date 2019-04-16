angular.
module('control')
.controller('ticketControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'AuroraModal', 'Ticket',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, AuroraModal, Ticket){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  $scope.page_size = $routeParams.page_size?$routeParams.page_size:25;
  $scope.id=$routeParams.id?$routeParams.id:"";
  $scope.user__phone_number=$routeParams.user__phone_number?$routeParams.user__phone_number:"";
  $scope.type=$routeParams.type?$routeParams.type:"";
  $scope.resolved=$routeParams.resolved?$routeParams.resolved:"";
  self.orderings=self.defaultOrderings={
    'id': true,
    'user__phone_number':true,
    'user__username':true,
    'type': true,
    'resolved': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: $scope.page_size,
      page: $scope.page,
      ordering: $scope.ordering,
      id: $scope.id,
      user__phone_number: $scope.user__phone_number,
      type: $scope.type,
      resolved: $scope.resolved,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/tickets/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  Spinner.isCentered=true;
  Spinner.active();
  Ticket.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.tickets = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/tickets/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

  $scope.createTicket = function(){
    AuroraModal.type="create-control-ticket";
    AuroraModal.data={

    }
    AuroraModal.isActive=true;
  }
  $scope.editTicket = function(ticket){
    AuroraModal.type="edit-control-ticket";
    AuroraModal.data={
      id: ticket.id
    }
    AuroraModal.isActive=true;
  }


}])
.constant('ticketControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('ticketControl', ['$parse', '$http', '$compile', 'SETTINGS', 'ticketControlConfig',
 function($parse, $http, $compile, SETTINGS, ticketControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'ticketControlController',
    templateUrl: '/static/js/app/control/ticket-control/ticket-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, ticketControlCtrl){

    }
  }
}])
