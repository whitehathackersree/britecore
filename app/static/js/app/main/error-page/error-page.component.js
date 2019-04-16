angular.
module('main')
.controller('errorPageController', ['$rootScope', '$scope', '$location', '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'Bid', 'BidData', 'Socket', 'AuthService', 'MetaService',
 function($rootScope, $scope, $location, $timeout,$q, $element, Spinner, Aurora, Bid, BidData, socket, AuthService, MetaService){
  var self = this;
  $rootScope.metaservice = MetaService;
  $scope.types=[
    {
      type: '404',
      title: 'Not Found',
      image: '/static/images/errors/404_2.png'
    },
    {
      type: '500',
      title: 'Server Error',
      image: '/static/images/errors/500_1.jpg'
    },
  ]
  $scope.error = $scope.types.filter(obj => {
    return obj.type == $scope.type;
  })[0];
  $rootScope.metaservice.set({
    title: $scope.error.type+" - "+$scope.error.title+" | bidbuzz India",
  });

}])
.constant('errorPageConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('errorPage', ['$parse', '$http', '$compile', 'SETTINGS', 'errorPageConfig',
 function($parse, $http, $compile, SETTINGS, errorPageConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      type: '=',
    },
    controller: 'errorPageController',
    templateUrl: '/static/js/app/main/error-page/error-page.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, errorPageCtrl){

    }
  }
}])
