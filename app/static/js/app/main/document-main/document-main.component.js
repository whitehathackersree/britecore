angular.
module('main')
.controller('documentMainController', ['$rootScope', '$routeParams','$scope', '$location', '$timeout', '$q',
'$element', 'Spinner', 'Aurora', 'Socket', 'AuthService', 'MetaService', 'Document',
 function($rootScope, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, socket,
  AuthService, MetaService, Document){
  var self = this;
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title: "Live | bidbuzz India - Onlline Bidding Marketplace",
  });
  Spinner.isCentered = true;
  Spinner.active();
  self.authUser = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     $scope.authUser=user;
   });
   Document.get({documentId: $routeParams.documentId}, function(doc) {
     $rootScope.metaservice.set({
       title:doc.username+" | app India",
       description: "View bidding profile of "+doc.username+" on bidbuzz. bidbuzz is a global hub for bidders. For dreamers of expensive products.",
       keywords: "",
       image: doc.og_image,
     });
     $scope.doc = doc;
     Spinner.inactive();
     $scope.show=true;
     console.log(doc);
   });
}])
.constant('documentMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('documentMain', ['$parse', '$http', '$compile', 'SETTINGS', 'documentMainConfig',
 function($parse, $http, $compile, SETTINGS, documentMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'documentMainController',
    templateUrl: '/static/js/app/main/document-main/document-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, documentMainCtrl){

    }
  }
}])
