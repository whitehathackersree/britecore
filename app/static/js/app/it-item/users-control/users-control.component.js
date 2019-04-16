angular.
module('control')
.controller('usersControlController', ['$sce', '$route', '$routeParams', '$scope', '$location',
 '$timeout', '$q', '$element', 'Spinner', 'Aurora', 'User',
 function($sce, $route, $routeParams, $scope, $location, $timeout,$q, $element, Spinner, Aurora, User){
  var self = this;
  $scope.search=$routeParams.search?$routeParams.search:"";
  $scope.ordering=$routeParams.ordering?$routeParams.ordering:"";
  $scope.page = $routeParams.page?$routeParams.page:1;
  $scope.phone_number=$routeParams.phone_number?$routeParams.phone_number:"";
  $scope.username=$routeParams.username?$routeParams.username:"";
  $scope.city=$routeParams.city?$routeParams.city:"";
  self.orderings=self.defaultOrderings={
    'phone_number':true,
    'username': true,
    'city': true,
  };
  self.query_params = function(){
    return {
      search: $scope.search,
      page_size: 50,
      ordering: $scope.ordering,
      page: $scope.page,
      phone_number: $scope.phone_number,
      username: $scope.username,
      city: $scope.city,
    }
  }
  $scope.pagination_url = function(){
    params =  self.query_params();
    delete params.page;
    return "/control/users/?"+dictToURI(params)+"&";
  }
  $scope.current_page = $routeParams.page?$routeParams.page:1;
  User.queryPage(self.query_params(), function(page_data){
    $scope.page_data = page_data;
    $scope.users = page_data.results;
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.query = function(){
    params = self.query_params();
    delete params.page;
    $location.path("/control/users/").search(params);
  }
  $scope.sort_order = function(prop){
    self.orderings[prop]=!self.orderings[prop];
    if(self.orderings[prop])prop= '-'+prop;
    $scope.ordering=prop;
    $scope.query();
  }

}])
.constant('usersControlConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('usersControl', ['$parse', '$http', '$compile', 'SETTINGS', 'usersControlConfig',
 function($parse, $http, $compile, SETTINGS, usersControlConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'usersControlController',
    templateUrl: '/static/js/app/control/users-control/users-control.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, usersControlCtrl){

    }
  }
}])
