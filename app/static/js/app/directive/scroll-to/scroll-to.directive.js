angular.
  module('directive').
  directive('scrollTo', ['$location', '$anchorScroll',
  function ($location, $anchorScroll) {
  return function (scope, element, attrs) {
      var self = this;
      element.bind("click", function (event) {
        event.stopPropagation();
        self.old = $location.hash();
        $location.hash(attrs.scrollTo);
        $anchorScroll();
        $location.hash(self.old);
      });
  };
}]);
