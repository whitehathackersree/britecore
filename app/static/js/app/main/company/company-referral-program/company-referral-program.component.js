angular.
module('company')
.controller('companyReferralProgramController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Referral Program | Bid Buzz",
    description:"The bidbuzz referral program is launched to connect more users together to bid and avail the chance of acquiring their expensive unaffordable product at a much lower rate.",
    keywords: "",
    image: "",
  });


}])
.constant('companyReferralProgramConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyReferralProgram', ['$parse', '$http', '$compile', 'SETTINGS', 'companyReferralProgramConfig',
 function($parse, $http, $compile, SETTINGS, companyReferralProgramConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyReferralProgramController',
    templateUrl: '/static/js/app/main/company/company-referral-program/company-referral-program.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyReferralProgramCtrl){

    }
  }
}])
