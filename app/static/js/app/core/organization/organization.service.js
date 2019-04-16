angular.
  module('core.organization').
  factory('Organization', ['$resource',
    function($resource) {
      return $resource('/api/organization/:organizationId/',
        {organizationId: '@organizationId', }, {
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
