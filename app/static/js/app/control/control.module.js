angular.module('control', [
    'control.bid-bay-control',
    'control.items-control',
    'control.bids-control',
    'control.transactions-control',
    'control.coins-transactions-control',
    'control.bonus-control',
    'control.ticket-control',
    'control.buzzers-control',
    'control.control-nav',
    'control.create-bid',
    'control.create-item',
    'control.create-bonus-transaction',
    'control.create-control-ticket',
    'control.edit-item',
    'control.edit-bid',
    'control.edit-winner-delivery',
    'control.edit-control-ticket',
 ]);
angular.module("bidBayApp").requires.push('control');
angular.module('bidBayApp').
  config(['$routeProvider',
    function config($routeProvider, ) {
      var control_prefix = '/control';
      $routeProvider.
        when(control_prefix+'/live/', {
          template: '<bid-bay-control></bid-bay-control>'
        }).
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
        when(control_prefix+'/coinst/', {
          template: '<coins-transactions-control></coins-transactions-control>'
        }).
        when(control_prefix+'/bonus/', {
          template: '<bonus-control></bonus-control>'
        }).
        when(control_prefix+'/buzzers/', {
          template: '<buzzers-control></buzzers-control>'
        }).
        when(control_prefix+'/winners/', {
          template: '<winners-control></winners-control>'
        }).
        when(control_prefix+'/winners/:winnerId', {
          template: '<winner-detail-control></winner-detail-control>'
        }).
        when(control_prefix+'/tickets/', {
          template: '<ticket-control></ticket-control>'
        }).
        otherwise('/');
    }
  ]);
