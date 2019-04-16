angular.
  module('core.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('/api/user/:userId/',
        {userId: '@userId', }, {
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
