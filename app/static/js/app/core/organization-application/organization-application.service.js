angular.
  module('core.organization-application').
  factory('OrganizationApplication', ['$resource',
    function($resource) {
      return $resource('/api/organizationApplication/:organizationApplicationId/',
        {organizationApplicationId: '@organizationApplicationId', }, {
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
