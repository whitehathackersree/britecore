angular.
module('main')
.controller('profileSubMainController', ['$rootScope', '$scope', '$window', '$location', '$routeParams', '$element', 'MetaService', 'AuthService', 'User',
 function($rootScope, $scope, $window, $location, $routeParams, $element, MetaService, AuthService, User){
  var self = this;
  $scope.user = AuthService.getUser();
  $scope.submenus = [
    {
      submenu_title: "profile-and-security",
      breadcrumb_title: "Profile And Security",
      description: ""
    },
    {
      submenu_title: "buzzers",
      breadcrumb_title: "Buzzers",
    },
    {
      submenu_title: "transactions",
      breadcrumb_title: "Transactions",
    },
    {
      submenu_title: "cart",
      breadcrumb_title: "Your Cart",
    },
    {
      submenu_title: "claimed",
      breadcrumb_title: "Claimed Products and Tracking",
    },
    {
      submenu_title: "favourites",
      breadcrumb_title: "Your Favourite Products",
    },
    {
      submenu_title: "coins-usage",
      breadcrumb_title: "Coins Usage",
    },
    {
      submenu_title: "referrals",
      breadcrumb_title: "Refer And Earn",
    }
  ];
  $scope.submenu = $scope.submenus.filter(function(dc){return dc.submenu_title == $routeParams.submenu})[0];
  if(!$scope.submenu){
    $window.location.href="/coins/";
  }
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:$scope.submenu.breadcrumb_title+" | Bid Buzz",
    description: "",
    keywords: "",
    image: "",
  });
  $scope.breadcrumbOptions = [
    {title: "Profile", link: "/ac/"+$scope.user.username+"/"},
    {title: $scope.submenu.breadcrumb_title, link: $location.path()}
  ];

}])
.constant('profileSubMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileSubMain', ['$parse', '$http', '$compile', 'SETTINGS', 'profileSubMainConfig',
 function($parse, $http, $compile, SETTINGS, profileSubMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'profileSubMainController',
    templateUrl: '/static/js/app/main/profile-sub-main/profile-sub-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileSubMainCtrl){

    }
  }
}])
