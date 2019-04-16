angular.
module('common').
controller('profileDocumentsController', ['$scope', '$routeParams', '$location','$element', 'Spinner', 'Document',
 function($scope, $routeParams, $location, $element, Spinner, Document){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  $scope.empty =false;
  $scope.documents = "";
  Document.query({organization__username: $routeParams.username}, function(page){
    $scope.documents=page.results;
    if($scope.documents.length==0)$scope.empty = true;
    Spinner.inactive();
    $scope.show=true;
  });

  $scope.emptyCr = {
    image: "/static/svg/tap.svg",
    heading: "You have not started any buzzers yet!",
    description: "Buzzer helps you automate your bidding process and saves time. \n To start one, visit the product page and click '<a href='aa'>create buzzer</a>'."
  }
}])
.constant('profileDocumentsConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileDocuments', ['$parse', '$http', '$compile', 'SETTINGS', 'profileDocumentsConfig',
 function($parse, $http, $compile, SETTINGS, profileDocumentsConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileDocumentsController',
    templateUrl: '/static/js/app/common/profile-documents/profile-documents.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileDocumentsCtrl){

    }
  }
}])
