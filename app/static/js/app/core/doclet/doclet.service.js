angular.
  module('core.app').
  factory('app', ['$resource',
    function($resource) {
      return $resource('/api/app/:appId/',
        {appId: '@appId', }, {
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
