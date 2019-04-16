angular.
module('common').
controller('thirdNavController', [function(){
  var self = this;
  self.downArrowPressed = function(){
    
  }
}]).
directive('thirdNav', ['SETTINGS', function(SETTINGS){
  return{
    restrict: 'E',
    replace: false,
    scope: {
        tabs: '=',
        activeTab: '=',
        pickItem : '&onSelect'
    },
    transclude: true,
    templateUrl: '/static/js/app/common/third-nav/third-nav.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope', '$element',
    function thirdNavController($scope, $element) {
        var self = this;


      }]
  }

}]);
