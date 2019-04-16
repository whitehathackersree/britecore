angular.
  module('directive', ['ngMessages']).
  directive('compare', function (){
   return {
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {
          var data = attr.compare.split(',');
          var bool;
          var input_value = parseFloat(data[1]);
          ngModel.$parsers.unshift(function (value) {
            value=parseFloat(value);
            if(data[0]=='<'){bool = value<input_value;}
            else if(data[0]=='<='){bool = value<=input_value;}
            else if(data[0]=='>'){bool = value>input_value;}
            else if(data[0]=='>='){bool = value>=input_value;}
            else{ bool = false}
            ngModel.$setValidity('compare', bool);
            return value;
          });
      }
   };
});
