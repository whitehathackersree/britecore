angular.
module('common').
controller('paginationController', ['$scope', '$location','$element',
 function($scope, $location, $element){
  var self = this;
  $scope.showOnly = 2;
  if($scope.totalPages > $scope.showOnly){

  }
  $scope.showLeft = ($scope.currentPage-4)<1;
  $scope.showRight = parseInt($scope.currentPage)+4>$scope.totalPages;
  $scope.showMid = !$scope.showLeft && !$scope.showRight && ($scope.currentPage-2 > 1 && parseInt($scope.currentPage)+2 < $scope.totalPages);
  $scope.initialPages = function(){
    if($scope.showLeft){
      len = $scope.totalPages>=5?5:$scope.totalPages;
      list = [];
      for (var i = 1; i <= len; i++) {
        list.push(i);
      }
      return list;
    }
    if($scope.showMid || $scope.showRight){
      return [1]
    }
  }
  $scope.middlePages = function(){
    if($scope.showMid){
      len = parseInt($scope.currentPage)+2;
      list = [];
      for (var i = parseInt($scope.currentPage)-2; i <= len; i++) {
        list.push(i);
      }
      return list;
    }
  }
  $scope.endPages = function(){
    if($scope.showRight){
      list = [];
      for (var i = parseInt($scope.totalPages-4); i <= $scope.totalPages; i++) {
        if(i>0)list.push(i);
      }
      return list;
    }
    if($scope.showMid || $scope.showLeft){
      return [$scope.totalPages]
    }
  }
  $scope.range = function(n) {
      return new Array(n);
  };
}])
.constant('paginationConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('pagination', ['$parse', '$http', '$compile', 'SETTINGS', 'paginationConfig',
 function($parse, $http, $compile, SETTINGS, paginationConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      url: '=',
      totalPages: '=',
      currentPage: '='
    },
    controller: 'paginationController',
    templateUrl: '/static/js/app/common/pagination/pagination.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, paginationCtrl){

    }
  }
}])
