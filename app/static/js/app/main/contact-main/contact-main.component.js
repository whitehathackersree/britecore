angular.
module('main')
.controller('contactMainController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner', 'Doc',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner, Doc){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:"Contact Us | Bid Buzz",
    description: "Contact us if you have any queries. 24/7 support: +91 8500058131. Please utilize the help section before reaching out.",
    keywords: "",
    image: "",
  });
}])
.constant('contactMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('contactMain', ['$parse', '$http', '$compile', 'SETTINGS', 'contactMainConfig',
 function($parse, $http, $compile, SETTINGS, contactMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'contactMainController',
    templateUrl: '/static/js/app/main/contact-main/contact-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, contactMainCtrl){

    }
  }
}])
