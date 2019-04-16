angular.
module('directive')
.controller('serverClockController', ['$scope', '$interval','$element',
 function($scope, $interval, $element){
  var self = this;

  self.runClock = function(time){
    self.date = new Date(time);
    self.dateMillis = self.date.getTime();
    self.client_date = new Date();
    self.client_dateMillis = self.client_date.getTime();
    $interval(function(){
      self.curr_date = new Date();
      self.curr_dateMillis = self.curr_date.getTime();
      self.newDate = new Date();
      self.newDate.setTime(self.dateMillis + self.curr_dateMillis - self.client_dateMillis);
      $scope.clock = self.newDate;
    },60000);
  }
}])
.directive('serverClock', ['$parse', '$interval', '$compile',
 function($parse, $interval, $compile){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      clock: '@time'
    },
    template: "{{clock |date : 'hh:mm a'}}",
    controller: 'serverClockController',
    link: function(scope, element, attrs, serverClockCtrl){
      serverClockCtrl.runClock(scope.clock);
    }
  }
}])
