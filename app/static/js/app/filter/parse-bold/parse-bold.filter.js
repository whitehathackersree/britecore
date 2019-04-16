angular.
module('filter')
.filter('parseBold', function ($sce) {
    return function (val) {
      const bold_regex = /([*][\w -\d]*[*])/gm;
      var str = val;
      let m;
      while ((m = bold_regex.exec(str)) !== null) {
          if (m.index === bold_regex.lastIndex) {
              bold_regex.lastIndex++;
          }
          m.forEach((match, groupIndex) => {
            var tmp = match.replace(/^[*]/, "<strong>").replace(/[*]$/, "</strong>");
            str = str.replace(match, tmp);
          });
      }
      return str;
    };
});
