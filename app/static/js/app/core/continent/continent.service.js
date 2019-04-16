angular.
  module('core.continent').
  factory('Continent', ['$resource',
    function($resource) {
      return $resource('/api/continent/:continentId/',
        {continentId: '@continentId', }, {
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
