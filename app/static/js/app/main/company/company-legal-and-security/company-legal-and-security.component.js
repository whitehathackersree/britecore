angular.
module('company')
.controller('companyLegalAndSecurityController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Legal & Security - Bid Buzz",
    description:"Legal Terms of Service Agreement for bidbuzz, Online MarketPlace for bidding.",
    keywords: "",
    image: "",
  });


}])
.constant('companyLegalAndSecurityConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyLegalAndSecurity', ['$parse', '$http', '$compile', 'SETTINGS', 'companyLegalAndSecurityConfig',
 function($parse, $http, $compile, SETTINGS, companyLegalAndSecurityConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyLegalAndSecurityController',
    templateUrl: '/static/js/app/main/company/company-legal-and-security/company-legal-and-security.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyLegalAndSecurityCtrl){

    }
  }
}])
