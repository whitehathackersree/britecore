angular.
  module('core.transaction').
  factory('Transaction', ['$resource',
    function($resource) {
      return $resource('/api/transaction/:transactionId/',
        {transactionId: '@transactionId' }, {
        query: {
          method: 'GET',
          isArray: true
        },
        queryPage: {
          method: 'GET',
          isArray: false
        },
        create: {
          method: 'POST',
        },
      });
    }
  ]);
