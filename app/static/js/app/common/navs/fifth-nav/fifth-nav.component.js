angular.
module('navs').
directive('fifthNav', ['SETTINGS',function(SETTINGS){
  return{
    restrict: 'E',
    replace: false,
    scope: {
        tabs: '=',
        activeTab: '=',
        changeTab : '&onSelect'
    },
    transclude: true,
    templateUrl: '/static/js/app/common/navs/fifth-nav/fifth-nav.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope', '$element',
    function fifthNavController($scope, $element) {
        var self = this;


      }]
  }

}]);
