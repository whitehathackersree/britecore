angular.
module('company')
.controller('companySubController', ['$rootScope', '$scope', '$window', '$location', '$routeParams', '$element', 'MetaService', 'AuthService', 'User',
 function($rootScope, $scope, $window, $location, $routeParams, $element, MetaService, AuthService, User){
  var self = this;
  $scope.user = AuthService.getUser();
  $scope.submenus = [
    {
      submenu_title: "about",
      breadcrumb_title: "About",
      description: ""
    },
    {
      submenu_title: "careers",
      breadcrumb_title: "Careers",
    },
    {
      submenu_title: "events",
      breadcrumb_title: "Events",
    },
    {
      submenu_title: "leadership",
      breadcrumb_title: "Leadership",
    },
    {
      submenu_title: "legal-and-security",
      breadcrumb_title: "Legal and Security",
    },
    {
      submenu_title: "press",
      breadcrumb_title: "Press",
    },
    {
      submenu_title: "referral-program",
      breadcrumb_title: "Referral Program",
    }
  ];
  $scope.submenu = $scope.submenus.filter(function(dc){return dc.submenu_title == $routeParams.submenu.toLowerCase()})[0];
  if(!$scope.submenu){
    $window.location.href="/";
  }
  $rootScope.metaservice = MetaService;
  $rootScope.metaservice.set({
    title:$scope.submenu.breadcrumb_title+" | Bid Buzz",
    description: "",
    keywords: "",
    image: "",
  });
  $scope.breadcrumbOptions = [
    {title: "Company", link: "/company/"},
    {title: $scope.submenu.breadcrumb_title, link: $location.path()}
  ];

}])
.constant('companySubConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('companySub', ['$parse', '$http', '$compile', 'SETTINGS', 'companySubConfig',
 function($parse, $http, $compile, SETTINGS, companySubConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'companySubController',
    templateUrl: '/static/js/app/main/company/company-sub/company-sub.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, companySubCtrl){

    }
  }
}])
