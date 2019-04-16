angular.
module('company')
.controller('companyEventsController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Careers | Bid Buzz",
    description:"",
    keywords: "",
    image: "",
  });


}])
.constant('companyEventsConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyEvents', ['$parse', '$http', '$compile', 'SETTINGS', 'companyEventsConfig',
 function($parse, $http, $compile, SETTINGS, companyEventsConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyEventsController',
    templateUrl: '/static/js/app/main/company/company-events/company-events.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyEventsCtrl){

    }
  }
}])
