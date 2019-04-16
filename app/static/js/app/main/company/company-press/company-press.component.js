angular.
module('company')
.controller('companyPressController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Press | Bid Buzz",
    description:"",
    keywords: "",
    image: "",
  });


}])
.constant('companyPressConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companyPress', ['$parse', '$http', '$compile', 'SETTINGS', 'companyPressConfig',
 function($parse, $http, $compile, SETTINGS, companyPressConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companyPressController',
    templateUrl: '/static/js/app/main/company/company-press/company-press.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companyPressCtrl){

    }
  }
}])
