angular.
  module('core').
  factory('Aurora', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var self = this;
    self.deleteAlert = function(alert){
      self.service.alertQueue.splice(self.service.alertQueue.indexOf(alert), 1);
    };

    self.addAlert = function(message, type){
      message = {message: message, type: type};
      self.service.alertQueue.push(message);
      $rootScope.$broadcast('alertQueue.update');
      $timeout(function(){ self.deleteAlert(self.service.alertQueue[0]) }, 3000);
    };

    self.splitAndAddAlert = function(obj, type){
      if(isDict(obj)){
        Object.keys(obj).forEach(function(key){
          self.splitAndAddAlert(obj[key], type);
          /*obj[key].forEach(function(iobj){
            if(isDict(iobj)){
              self.splitAndAddAlert(iobj, type);
            }
            else{
              self.addAlert(iobj, type)
            }
          })*/
        });
      }
      else if(isArray(obj)){
        obj.forEach(function(iobj){
          self.splitAndAddAlert(iobj, type);
        })
      }
      else{
        self.addAlert(obj, type);
      }
    }

    self.service = {
      alertQueue: [],
      alert: function(msg){
        self.addAlert(msg);
      },
      info: function(msg){
        self.splitAndAddAlert(msg, "info");
      },
      warning: function(msg){
        self.splitAndAddAlert(msg, "warning");
      },
      error: function(msg){
        self.splitAndAddAlert(msg, "error");
      },
      success: function(msg){
        self.splitAndAddAlert(msg, "success");
      },
      notice: function(msg){
        self.splitAndAddAlert(msg, "notice");
      },
      removeAlert: function(alert){
        self.deleteAlert(alert);
      },
      getAlerts: function(){
        return self.service.alertQueue;
      }
    }

    return self.service;
}]);
