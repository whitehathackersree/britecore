angular.
  module('directive').
  directive('upArrowKeyPress', function () {
  return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
          if(event.which === 38) {
              scope.$apply(function (){
                  scope.$eval(attrs.upArrowKeyPress);
              });
              event.preventDefault();
          }
      });
  };
});
