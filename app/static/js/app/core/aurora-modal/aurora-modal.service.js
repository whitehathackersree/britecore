angular.
  module('core').
  factory('AuroraModal', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var self = this;
    self.service = {
      type: "default",
      data: "",
      isActive: false,
      getTemplateUrl: function(){
        return self.service.templateUrl;
      },
    }

    return self.service;
}]);
