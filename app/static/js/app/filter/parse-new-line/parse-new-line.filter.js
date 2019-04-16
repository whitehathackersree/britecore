angular.
module('filter')
.filter('parseNewLine', function () {
    return function (val) {
      val=val?val:"";
      var regex_ = /(?:\r\n|\r|\n)/gm;
      return val.replace(regex_,'<br>');
    }
});
