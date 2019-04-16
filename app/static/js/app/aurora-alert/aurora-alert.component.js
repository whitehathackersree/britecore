angular.
  module('auroraAlert').
  component('auroraAlert', {
    templateUrl: ['SETTINGS', function(SETTINGS) {
        return '/static/js/app/aurora-alert/aurora-alert.template.html?v='+SETTINGS.VERSION;
      }],
    controller: ['$routeParams','$scope', 'Aurora',
      function AuroraAlertController($routeParams, $scope, Aurora) {
        var self = this;
        self.alertQueue = Aurora.alertQueue;
        self.removeAlert = function(alert) {
          Aurora.removeAlert(alert);
        };
        //Aurora.alert("goooooooo");
      }
    ]
  });
