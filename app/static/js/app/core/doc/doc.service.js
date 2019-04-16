angular.
  module('core.doc').
  factory('Doc', ['$resource',
    function($resource) {
      return $resource('/api/doc/:docId/',
        {docId: '@docId'}, {
        query: {
          method: 'GET',
          isArray: true
        },
        create: {
          method: 'POST',
        },
        patch: {
          method: 'PATCH',
        },
      });
    }
  ]);
