angular.
module('directive')
.controller('dateOffsetTimerController', ['$scope', '$location','$element',
 function($scope, $location, $element){
  var self = this;
  $scope.seconds=$scope.seconds?$scope.seconds:$scope.startsSeconds;
  self.secondsToHms = function(sec){
    sec = Number(sec);
    var d = Math.floor(sec /(3600*24));
    var h = Math.floor((sec-d*3600*24) / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);

    var dDisplay = d > 0 ? d + (d == 1? " day ": " days "):"";
    var hDisplay = h<10?"0"+h:h;
    var mDisplay = m<10?"0"+m:m;
    var sDisplay = s<10?"0"+s:s;
    return dDisplay +(isNaN(hDisplay)?" -- ":hDisplay) +":"+ (isNaN(mDisplay)?" -- ":mDisplay) +":"+ (isNaN(sDisplay)?" -- ":sDisplay);
  }

  self.setdateOffsetTimer = function() {
    $scope.seconds=$scope.seconds-1;
    if($scope.seconds<=0 && !$scope.started){
      $scope.started=true;
      $scope.seconds=$scope.duration;
    }
    if($scope.seconds<=0&& $scope.started){
      $scope.seconds=0;
    }
    $scope.offset = self.secondsToHms($scope.seconds);
  }
}])
.directive('dateOffsetTimer', ['$parse', '$interval', '$compile',
 function($parse, $interval, $compile){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      startsSeconds: '=',
      duration: '=',
      started: '=',
      seconds: '=',
    },
    template: "<span>{{offset}}</span>",
    controller: 'dateOffsetTimerController',
    replace: true,
    link: function(scope, element, attrs, dateOffsetTimerCtrl){
      scope.offset = dateOffsetTimerCtrl.secondsToHms(scope.seconds);
      $interval(function() {
        dateOffsetTimerCtrl.setdateOffsetTimer();
      }, 1000);
    }
  }
}])
