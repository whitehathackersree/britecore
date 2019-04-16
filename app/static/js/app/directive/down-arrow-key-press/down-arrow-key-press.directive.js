angular.
  module('directive').
  directive('downArrowKeyPress', function () {
  return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
          if(event.which === 40) {
              scope.$apply(function (){
                  scope.$eval(attrs.downArrowKeyPress);
              });
              event.preventDefault();
          }
      });
  };
});
