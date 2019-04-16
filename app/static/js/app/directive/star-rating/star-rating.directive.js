angular.
module('directive').
constant('starRatingConfig', {
  showNum: true,
}).
directive('starRating', ['starRatingConfig', 'SETTINGS',  function(starRatingConfig, SETTINGS){
  return{
    restrict: 'E',
    replace: true,
  //  require: 'enterKeyPress, downArrowKeyPress',
    scope: {
        localRating: '=rating',
        showNum: '@'
    },
    transclude: true,
    templateUrl: '/static/js/app/directive/star-rating/star-rating.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope',
    function starRatingController($scope) {
        var self = this;
        self.pickHex = function(w) {
          if(w<=0) {return "#c5c5c5  ";}
          else if(w<=1) {return "#f44336  ";}
          else if(w<=2) {return "#ff1744";}
          else if(w<=3) {return "#ff6f00";}
          else if(w<=4) {return "#f57f17  ";}
          else{return "#0069ff";}
        }
        if (!angular.isDefined($scope.showNum) || $scope.showNum == '')$scope.showNum = starRatingConfig.showNum;
        //$scope.localRating = angular.isDefined($scope.localRating) ? parseFloat($scope.localRating) : 0.0;
        $scope.starStyle={'width': $scope.localRating*20+'%', 'color':self.pickHex($scope.localRating)};
        $scope.numStyle = {'background': self.pickHex($scope.localRating)}
        $scope.getStarStyle= function(data){
          return {'width': data*20+'%', 'color':self.pickHex(data)};
        }
        $scope.getNumStyle= function(data){
          return {'background': self.pickHex(data)};
        }
      }]
  }

}]);
