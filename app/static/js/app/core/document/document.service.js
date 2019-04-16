angular.
  module('core.document').
  factory('Document', ['$resource',
    function($resource) {
      return $resource('/api/document/:documentId/',
        {documentId: '@documentId', }, {
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
