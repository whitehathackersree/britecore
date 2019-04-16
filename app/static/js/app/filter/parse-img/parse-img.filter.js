angular.
module('filter')
.filter('parseImg', function () {
    return function (val) {
      var regex_ = /(img:[/](?:[^#? ]+)+\.(?:jpe?g|JPE?G|gif|GIF|png|PNG|svg|SVG))/gm;
      var str_=val;
      var m_;

      while ((m_ = regex_.exec(str_)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m_.index === regex_.lastIndex) {
              regex_.lastIndex++;
          }

          // The result can be accessed through the `m`-variable.
          m_.forEach((match, groupIndex) => {
            var tmp = match.replace(/img:/,"");
            tmp = "<img src='"+tmp+"'/>";
            str_=str_.replace(match, tmp);
          });
      }
      return str_;
    }
});
