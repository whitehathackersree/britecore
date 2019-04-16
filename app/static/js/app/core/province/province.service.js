angular.
  module('core.province').
  factory('Province', ['$resource',
    function($resource) {
      return $resource('/api/province/:provinceId/',
        {provinceId: '@provinceId', }, {
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
