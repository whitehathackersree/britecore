angular.
module('common').
controller('firstNavController', ['$scope', '$location','$element', 'SETTINGS', 'AuthService',
 function($scope, $location, $element, SETTINGS, AuthService){
  var self = this;
  $scope.user = AuthService.getUser();
  $scope.currentRoute= function(){
    return $location.path();
  }

  $scope.logout = function(){
    AuthService.logout();
  };
  $scope.nav_options=[
    {
      title: "Dashboard",
      link: "/",
    },
    {
      title: "Documents",
      link: "/documents/",
    },
    {
      title: "apps",
      link: "/apps/",
    },
    {
      title: "Network",
      link: "/network/",
    },
    {
      title: "Explore",
      link: "/explore/",
    }
  ];
  self.getProfileOptions = function(){
    return [
      {
        title: "Profile",
        link: "/ac/"+$scope.user["username"]+"/",
      },
      {
        title: "Cart",
        link: "/ac/"+$scope.user["username"]+"/cart/",
      },
      {
        title: "Logout",
        link: "",
        click: $scope.logout,
      }
    ];
  };


  $scope.isAuthenticated = AuthService.isAuthenticated();
  if($scope.isAuthenticated){
    $scope.profile_options=self.getProfileOptions();
  }
  self.create_small_nav = function(){
    if($scope.isAuthenticated){
      $scope.small_nav_trigger_type="image";
      $scope.small_nav_trigger_image=$scope.user['photo'];
      $scope.small_nav_options= $scope.nav_options.concat($scope.profile_options);
    }
    else{
      $scope.small_nav_trigger_type="icon";
      $scope.small_nav_options= $scope.nav_options.concat([
        {
          title: "login",
          link: "/login/"
        },
        {
          title: "signup",
          link: "/signup/",
        }
      ]);
    }
  }
  $scope.$on('user:updated', function(event,user) {
     $scope.user=user;
     $scope.isAuthenticated = AuthService.isAuthenticated();
     //$scope.profile_options=self.getProfileOptions();
     self.create_small_nav();
   });
   self.create_small_nav();
}])
.constant('firstNavConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('firstNav', ['$parse', '$http', '$compile', 'SETTINGS', 'firstNavConfig',
 function($parse, $http, $compile, SETTINGS, firstNavConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      freelancer: '='
    },
    controller: 'firstNavController',
    templateUrl: '/static/js/app/common/first-nav/first-nav.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, firstNavCtrl){

    }
  }
}])
