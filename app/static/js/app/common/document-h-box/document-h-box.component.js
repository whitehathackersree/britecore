angular.
module('common').
controller('documentHBoxController', ['$scope', '$location','$element',
 function($scope, $location, $element){
  var self = this;
  $scope.expandProjectHBox = function(e){
    e.preventDefault();
    $element[0].querySelector('.document-h-box-show').style.display="none";
    $element[0].querySelector('.document-h-box-expanded').style.display="block";
  }
}])
.constant('documentHBoxConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('documentHBox', ['$parse', '$http', '$compile', 'SETTINGS', 'documentHBoxConfig',
 function($parse, $http, $compile,SETTINGS, documentHBoxConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      document: '='
    },
    controller: 'documentHBoxController',
    templateUrl: '/static/js/app/common/document-h-box/document-h-box.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, documentHBoxCtrl){

    }
  }
}])
