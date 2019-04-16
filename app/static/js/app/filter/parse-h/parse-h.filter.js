angular.
module('filter')
.filter('parseH', function () {
    return function (val) {
      var regex_ = /^h([12345]):[\w\d].*$/gm;
      var str_ = val;
      var m_;

      while ((m_ = regex_.exec(str_)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m_.index === regex_.lastIndex) {
              regex_.lastIndex++;
          }
      	var tmp=m_[0].replace(/h[12345]:/,'');
      	tmp="<h"+m_[1]+">"+tmp+"</h"+m_[1]+">";
          str_ = str_.replace(m_[0],tmp);
      }
      return str_;
    }
});
