angular.
module('company')
.controller('companyAboutController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:" About | Bid Buzz",
    description:"BidBuzz is the Online MarketPlace for bidding. On a mission to help people who dream of expensive unaffordable products. 90% of the amount earned through this platform goes to charities, to help orphans with their education, to take care of the unwanted.",
    keywords: "",
    image: "",
  });



}])
.constant('companyAboutConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyAbout', ['$parse', '$http', '$compile', 'SETTINGS', 'companyAboutConfig',
 function($parse, $http, $compile, SETTINGS, companyAboutConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyAboutController',
    templateUrl: '/static/js/app/main/company/company-about/company-about.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyAboutCtrl){

    }
  }
}])
