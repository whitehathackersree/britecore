angular.
  module('core.country').
  factory('Country', ['$resource',
    function($resource) {
      return $resource('/api/country/:countryId/',
        {countryId: '@countryId', }, {
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
