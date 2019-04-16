angular.
module('company')
.controller('companyCareersController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner', 'OpeningHead',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner, OpeningHead){
  var self = this;
  Spinner.isCentered = true;
  Spinner.active();
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Careers | Bid Buzz",
    description:"Search job openings at bidbuzz. Flexible timings. Remote. Free food and drinks. Gaming community.",
    keywords: "",
    image: "",
  });
  OpeningHead.query({},function(openingHeads){
    $scope.openingHeads= openingHeads.filter(oh=>oh.openings.length>0);
    //$scope.openingHeads = openingHeads;
    Spinner.inactive();
  });


}])
.constant('companyCareersConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyCareers', ['$parse', '$http', '$compile', 'SETTINGS', 'companyCareersConfig',
 function($parse, $http, $compile, SETTINGS, companyCareersConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyCareersController',
    templateUrl: '/static/js/app/main/company/company-careers/company-careers.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyCareersCtrl){

    }
  }
}])
