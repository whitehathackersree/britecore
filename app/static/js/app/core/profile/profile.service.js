angular.
  module('core.profile').
  factory('Profile', ['$resource',
    function($resource) {
      return $resource('/api/profile/:profileId/',
        {profileId: '@profileId'}, {
        query: {
          method: 'GET',
          isArray: true
        },
        create: {
          method: 'POST',
        },
      });
    }
  ]);
