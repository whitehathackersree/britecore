angular.
module('common').
controller('controlNavController', ['$scope', '$location','$element', 'AuthService',
 function($scope, $location, $element, AuthService){
  var self = this;
  self.prefix = "/control";
  $scope.small_nav_trigger_type="icon";
  $scope.nav_options=[
    {
      title: "Items",
      link: self.prefix+"/items/",
    },
    {
      title: "Bids",
      link: self.prefix+"/bids/",
    },
    {
      title: "Users",
      link: self.prefix+"/users/",
    },
    {
      title: "Winners",
      link: self.prefix+"/winners/",
    },
    {
      title: "Transactions",
      link: self.prefix+"/transactions/",
    },
    {
      title: "Users",
      link: self.prefix+"/users/",
    },
    {
      title: "Coins",
      link: self.prefix+"/coins/",
    },
  ];
}])
.constant('controlNavConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('controlNav', ['$parse', '$http', '$compile', 'SETTINGS', 'controlNavConfig',
 function($parse, $http, $compile, SETTINGS, controlNavConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      freelancer: '='
    },
    controller: 'controlNavController',
    templateUrl: '/static/js/app/control/control-nav/control-nav.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, controlNavCtrl){

    }
  }
}])
