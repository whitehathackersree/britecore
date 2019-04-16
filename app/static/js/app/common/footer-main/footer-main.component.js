angular.
module('common').
controller('footerMainController', ['$scope', '$http', '$location','$element', 'SETTINGS',
 function($scope, $http, $location, $element, SETTINGS){
  var self = this;
  $http.get('/static/js/app/common/footer-main/footer-main.json?v='+SETTINGS.VERSION).then(function(response) {
   $scope.footerData = response.data;
  });

}])
.constant('footerMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('footerMain', ['$parse', '$http', '$compile', 'SETTINGS', 'footerMainConfig',
 function($parse, $http, $compile, SETTINGS, footerMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      pack: '='
    },
    controller: 'footerMainController',
    templateUrl: '/static/js/app/common/footer-main/footer-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, footerMainCtrl){

    }
  }
}])
