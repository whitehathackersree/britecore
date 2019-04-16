angular.
module('common').
controller('controlNavController', ['$scope', '$location','$element', 'AuthService',
 function($scope, $location, $element, AuthService){
  var self = this;
  self.prefix = "/control";
  $scope.small_nav_trigger_type="icon";
  $scope.nav_options=[
    {
      title: "Live",
      link: self.prefix+"/live/",
    },
    {
      title: "Items",
      link: self.prefix+"/items/",
    },
    {
      title: "Bids",
      link: self.prefix+"/bids/?ordering=-id",
    },
    {
      title: "Buzzers",
      link: self.prefix+"/buzzers/?ordering=-id",
    },
    {
      title: "DMBs",
      link: self.prefix+"/dmbs/?ordering=-id",
    },
    {
      title: "Users",
      link: self.prefix+"/users/",
    },
    {
      title: "Winners",
      link: self.prefix+"/winners/?ordering=-id",
    },
    {
      title: "Transactions",
      link: self.prefix+"/transactions/?ordering=-id",
    },
    {
      title: "Bonus",
      link: self.prefix+"/bonus/?ordering=-id",
    },
    {
      title: "Users",
      link: self.prefix+"/users/",
    },
    {
      title: "Coinst",
      link: self.prefix+"/coinst/",
    },
    {
      title: "Tickets",
      link: self.prefix+"/tickets/",
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
