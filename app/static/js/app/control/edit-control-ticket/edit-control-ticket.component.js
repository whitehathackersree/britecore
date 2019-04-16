angular.
module('control').
controller('editControlTicketController', ['$scope', '$window', '$location','$element', 'SETTINGS', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'Ticket',
 function($scope, $window, $location, $element, SETTINGS, Spinner, Aurora, AuthService,AuroraModal, Ticket){
  var self = this;
  $scope.btn_active=true;
  $scope.$watch('data', function(value) {
    $scope.ticket = {};
    Ticket.get({ticketId:value.id}, function(ticket){
      $scope.ticket = ticket;
    });
  });
   $scope.ticketUpdate = function(){
     $scope.btn_active=false;
     data={
       ticketId:$scope.ticket.id,
       type: $scope.ticket.type,
       description: $scope.ticket.description,
       solution: $scope.ticket.solution,
       resolved: $scope.ticket.resolved,
     };
     Ticket.patch(data,function(ticket){
       $scope.btn_active=true;
       Aurora.success("Ticket: "+ticket.id+" Updated successfully");
       AuroraModal.isActive=false;
       $window.location.reload();
     }, function(response){
       $scope.btn_active=true;
       Aurora.error(response["data"]);
     });
   }

}])
.constant('editControlTicketConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('editControlTicket', ['$parse', '$http', '$compile', 'SETTINGS', 'editControlTicketConfig',
 function($parse, $http, $compile, SETTINGS, editControlTicketConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'editControlTicketController',
    templateUrl: '/static/js/app/control/edit-control-ticket/edit-control-ticket.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, editControlTicketCtrl){

    }
  }
}])
