angular.
module('directive')
.controller('dateOffsetController', ['$scope', '$location','$element',
 function($scope, $location, $element){
  var self = this;
  self.CalDate = function(date1,date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var secs = Math.floor(diff/1000);
    var mins = Math.floor(secs/60);
    var hours = Math.floor(mins/60);
    var days = Math.floor(hours/24);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);
    months=Math.floor(months%12);
    days = Math.floor(days%31);
    hours = Math.floor(hours%24);
    mins = Math.floor(mins%60);
    secs = Math.floor(secs%60);
    var message = "";
    if(days<=0){
      if(hours>0)message += hours + (hours>1?" hours ":" hour ");
      if(hours==0 && mins<1) return "Just now";
      if(mins!=0)message += mins + (mins>1?" minutes ":" minute ");
    }else{
            if(years>0){
            message += years + (years>1?" years ":" year");
        }
        if(months>0 || years>0){
            message += months + (months>1?" months ":" month ");
        }
        message += days + (days>1?" days":" day ");
    }
    return message+" ago"
  };
  self.getDateOffset = function(date) {
    date = new Date(date);
    var currdate = new Date();
    var offset = self.CalDate(currdate,date);
    return offset;
  }
  self.setDateOffset = function(time) {
    date = new Date(time);
    var currdate = new Date();
    var offset = self.CalDate(currdate,date);
    $scope.offset = offset;
  }
}])
.directive('dateOffset', ['$parse', '$interval', '$compile',
 function($parse, $interval, $compile){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      serverTime: '@time'
    },
    template: "<span>{{offset}}</span>",
    controller: 'dateOffsetController',
    replace: true,
    link: function(scope, element, attrs, dateOffsetCtrl){
      $interval(function() {
        dateOffsetCtrl.setDateOffset(scope.serverTime);
      }, 1000);
    }
  }
}])
