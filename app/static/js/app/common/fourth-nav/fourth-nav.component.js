angular.
module('common').
directive('fourthNav', ['SETTINGS',function(SETTINGS){
  return{
    restrict: 'E',
    replace: false,
    scope: {
        tabs: '=',
        activeTab: '=',
        changeTab : '&onSelect'
    },
    transclude: true,
    templateUrl: '/static/js/app/common/fourth-nav/fourth-nav.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope', '$element',
    function fourthNavController($scope, $element) {
        var self = this;


      }]
  }

}]);
