angular.
  module('core.ticket').
  factory('Ticket', ['$resource',
    function($resource) {
      return $resource('/api/ticket/:ticketId/',
        {ticketId: '@ticketId'}, {
        query: {
          method: 'GET',
          isArray: true
        },
        queryPage: {
          method: 'GET',
          isArray: false
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
