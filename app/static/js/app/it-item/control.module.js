angular.module('control', [
    'control.items-control',
    'control.bids-control',
    'control.transactions-control',
    'control.control-nav',
    'control.create-bid',
    'control.create-item',
 ]);
angular.module("bidBayApp").requires.push('control');
angular.module('bidBayApp').
  config(['$routeProvider',
    function config($routeProvider, ) {
      var control_prefix = '/control';
      $routeProvider.
        when(control_prefix+'/items/', {
          template: '<items-control></items-control>'
        }).
        when(control_prefix+'/items/:itemId', {
          template: '<item-detail-control></item-detail-control>'
        }).
        when(control_prefix+'/bids/', {
          template: '<bids-control></bids-control>'
        }).
        when(control_prefix+'/bids/:itemId', {
          template: '<item-detail-control></item-detail-control>'
        }).
        when(control_prefix+'/users/', {
          template: '<users-control></users-control>'
        }).
        when(control_prefix+'/users/:userId', {
          template: '<user-detail-control></user-detail-control>'
        }).
        when(control_prefix+'/transactions/', {
          template: '<transactions-control></transactions-control>'
        }).
        when(control_prefix+'/transactions/:transactionId', {
          template: '<transaction-detail-control></transaction-detail-control>'
        }).
        when(control_prefix+'/winners/', {
          template: '<winners-control></winners-control>'
        }).
        when(control_prefix+'/winners/:winnerId', {
          template: '<winner-detail-control></winner-detail-control>'
        }).
        otherwise('/');
    }
  ]);
