angular.
module('company')
.controller('companyLeadershipController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:" | Bid Buzz",
    description:"",
    keywords: "",
    image: "",
  });


}])
.constant('companyLeadershipConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyLeadership', ['$parse', '$http', '$compile', 'SETTINGS', 'companyLeadershipConfig',
 function($parse, $http, $compile, SETTINGS, companyLeadershipConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyLeadershipController',
    templateUrl: '/static/js/app/main/company/company-leadership/company-leadership.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyLeadershipCtrl){

    }
  }
}])
