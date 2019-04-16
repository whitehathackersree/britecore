angular.
module('control').
controller('createControlTicketController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'User', 'Ticket',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, User, Ticket){
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
   $scope.ticketCreate = function(){
    $scope.btn_active=false;
    Ticket.create({
      user: $scope.user.id,
      type: $scope.type,
      description: $scope.description,
      solution: $scope.solution,
      resolved: $scope.resolved,
    }).$promise.then(function(response){
      $scope.btn_active=true;
      AuroraModal.isActive=false;
      Aurora.success("Ticket for "+$scope.user.phone_number+" created successfully.");
      $scope.user={};
      $scope.description="";
      $scope.solution="";
      $scope.type="";
      $scope.resolved=false;
    }, function(response){
      $scope.btn_active=true;
      Aurora.error(response["data"]);
    });
  }
}])
.constant('createControlTicketConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('createControlTicket', ['$parse', '$http', '$compile', 'SETTINGS', 'createControlTicketConfig',
 function($parse, $http, $compile, SETTINGS, createControlTicketConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'createControlTicketController',
    templateUrl: '/static/js/app/control/create-control-ticket/create-control-ticket.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, createControlTicketCtrl){
      scope.$watch('data', function(value) {
          scope.item = value.item;
      });
    }
  }
}])
