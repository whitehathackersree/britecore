angular.
module('directive').
constant('informativeBadgeConfig', {
  color: '#000',
  background: '#f7f7f7',
  srcErrorMessage: 'Couldn\'t load this tab!',
}).
directive('informativeBadge', ['SETTINGS', function(SETTINGS){
  return{
    restrict: 'E',
    replace: true,
  //  require: 'enterKeyPress, downArrowKeyPress',
    scope: {
        name: '=',
        info: '@',
        color: '@',
        background: '@'
    },
    transclude: true,
    templateUrl: '/static/js/app/directive/informative-badge/informative-badge.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope', '$element', '$window', '$compile', 'informativeBadgeConfig',
    function informativeBadgeController($scope,$element, $window, $compile, informativeBadgeConfig) {
        var self = this;
        $scope.color = (!angular.isDefined($scope.color) || $scope.color=="")?informativeBadgeConfig.color:$scope.color;
        $scope.background = (!angular.isDefined($scope.background) || $scope.background=="")?informativeBadgeConfig.background:$scope.background;
        self.badge = $element[0].querySelector(".informative-badge .badge-name");
        self.info = $element[0].querySelector(".informative-badge .info");
        if(!angular.isDefined($scope.info) || $scope.info==""){
          self.info.style.display="none";
        }
        self.badge.style.color = $scope.color;
        self.badge.style.bgColor = $scope.background;
        $scope.hovered = function(){
          var el = $element[0];
          var infoEl = el.querySelector(".info");
          var elRect = el.getBoundingClientRect();
          var infoRect = infoEl.getBoundingClientRect();
          if(elRect.top+infoRect.bottom-infoRect.top+50 > $window.innerHeight){
            infoEl.style.removeProperty("top");
            infoEl.style.bottom="80%";
          }
          else{
            infoEl.style.removeProperty("bottom");
            infoEl.style.top="80%";
          }
        }
      }]
  }

}]);
