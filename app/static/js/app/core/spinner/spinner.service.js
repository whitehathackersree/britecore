angular.
  module('core').
  factory('Spinner', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var self = this;
    self.spinner = false;
    self.isCentered = true;
    self.isBig =false;
    self.setDefaults = function(){
      self.spinner = false;
      self.isCentered = true;
      self.isBig =false;
    }
    self.setSpinner = function(bool){
      if (typeof variable === "boolean"){
        throw "Boolean required for the spinner either true or false.";
      };
      self.spinner = bool;
      $rootScope.$broadcast('spinner.update');
    };

    self.service = {
      active: function(){
        self.setSpinner(true);
      },
      inactive: function( ){
        self.setSpinner(false);
        self.setDefaults();
      },
      getSpinner: function(){
        return self.spinner;
      }
    }

    return self.service;
}]).
directive('spinner', ['Spinner', 'SETTINGS',function(Spinner, SETTINGS){
  return{
    restrict: 'E',
    replace: true,
  //  require: 'enterKeyPress, downArrowKeyPress',
    scope: {

    },
    transclude: true,
    templateUrl: '/static/js/app/core/spinner/spinner.template.html?v='+SETTINGS.VERSION,
    controller: ['$scope', '$element',
    function spinnerController($scope, $element) {
        var self = this;
        $scope.$on('spinner.update', function(event){
          $scope.isBig = Spinner.isBig;
          $scope.isCentered = Spinner.isCentered;
          if(Spinner.getSpinner()){
            $element[0].classList.add("is-active");
          }
          else{
            $element[0].className = $element[0].className.replace(/\bis-active\b/g, "");
          }
        })
      }]
  }
}]);
