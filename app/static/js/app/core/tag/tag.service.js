angular.
  module('core.tag').
  factory('Tag', ['$resource',
    function($resource) {
      return $resource('/api/tag/:tagId/',
        {tagId: '@tagId', }, {
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
