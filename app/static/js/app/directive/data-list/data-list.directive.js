angular.
module('directive').
controller('selectableDataListController', [function(){
  var self = this;
  self.downArrowPressed = function(){
    
  }
}]).
directive('selectableDataList', ['SETTINGS',function(SETTINGS){
  return{
    restrict: 'E',
    replace: false,
    require: 'enterKeyPress, downArrowKeyPress',
    scope: {
        items: '=',
        toShowProperty: '@',
        pickItem : '&onSelect'
    },
    transclude: true,
    templateUrl: '/static/js/app/directive/data-list/data-list.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope', '$element','Aurora',
    function selectableDataListController($scope,$element, Aurora) {
        var self = this;
        $scope.currentIndex=-1;
        self.scrollingDiv = $element[0].querySelector("input+div");
        self.scrollToTop = function(){
          var currentElement = self.scrollingDiv.querySelector(".current-item");
          var childDivs = self.scrollingDiv.querySelectorAll("span");
          if(currentElement){
            var topPos = childDivs[$scope.currentIndex].offsetTop;
            self.scrollingDiv.scrollTop = topPos;
          }
        }
        $scope.setSelectToInitial = function(){
          $scope.currentIndex=-1;
          $scope.currentItem="";
        }
        $scope.upArrowKeyPressed = function(){
          $scope.currentIndex--;
          $scope.currentIndex = $scope.currentIndex<0?$scope.filteredItems.length-1:$scope.currentIndex;
          $scope.currentItem=$scope.filteredItems[$scope.currentIndex];
          self.scrollToTop();
        }
        $scope.downArrowKeyPressed = function(){
          $scope.currentIndex++;
          $scope.currentIndex = $scope.currentIndex>=$scope.filteredItems.length?0:$scope.currentIndex;
          $scope.currentItem=$scope.filteredItems[$scope.currentIndex];
          self.scrollToTop();
        }

      }]
  }

}]);
