angular.
  module('core.currency').
  factory('Currency', ['$resource',
    function($resource) {
      return $resource('/api/currency/:currencyId/',
        {currencyId: '@currencyId', }, {
        query: {
          method: 'GET',
        },
        create: {
          method: 'POST',
        },
        update: {
          method: 'PUT',
        },
        delete: {
          method: 'DELETE',
        },
      });
    }
  ]);
