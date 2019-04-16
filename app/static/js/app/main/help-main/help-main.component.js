angular.
module('main')
.controller('helpMainController', ['$rootScope', '$scope', '$sce', '$location', '$routeParams', '$timeout', '$q', '$element', 'MetaService', 'Spinner', 'Doc',
 function($rootScope, $scope, $sce, $location, $routeParams,  $timeout,$q, $element, MetaService, Spinner, Doc){
  var self = this;
  $rootScope.metaservice = MetaService;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  $scope.current_tab = $routeParams.tab;
  $scope.show_nav = false;//for small devices
  $scope.toggle_nav = function(){
    $scope.show_nav=!$scope.show_nav;
  }
  $scope.nav_options=[
    {
      title: "How it works",
      param: 'how-it-works',
      docId: 1,
    },
    {
      title: "Tips & Tricks",
      param: 'tips-and-tricks',
      docId: 2,
    },
    {
      title: "bid buzzer",
      param: 'bid-buzzer',
      docId: 7,
    },
    {
      title: "Promotions",
      param: 'promotions',
      docId: 3,
    },
    {
      title: "Payments",
      param: 'payments',
      docId: 4,
    },
    {
      title: "Orders & Shipping",
      param: 'orders-and-shipping',
      docId: 5,
    },
    {
      title: "FAQ",
      param: 'faq',
      docId: 6
    }
  ];
  self.current_nav = $scope.nav_options.filter(obj => {
    return obj.param === $scope.current_tab;
  })[0]
  self.current_nav = self.current_nav?self.current_nav:$scope.nav_options[0];
  $scope.doc="";
  Doc.get({docId: self.current_nav.docId}, function(doc){
    $rootScope.metaservice.set({
      title:self.current_nav.title+" | Bid Buzz",
      description: doc.description.substring(0,150),
      keywords: "",
      image: "",
    });
    $scope.doc=doc;
    $scope.breadcrumbOptions = [
      {title: "Help", link: "/help/"},
      {title: doc.head, link: "/help/"+self.current_nav.param+"/"}
    ];
    Spinner.inactive();
    $scope.show=true;
  });
  $scope.parsedDescription = function(){
    parsedDesc= $scope.doc.description?$scope.doc.description.replace(/(?:\r\n|\r|\n)/g, '<br>'):'';
    return $sce.trustAsHtml(parsedDesc);
  }



}])
.constant('helpMainConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('helpMain', ['$parse', '$http', '$compile', 'SETTINGS', 'helpMainConfig',
 function($parse, $http, $compile, SETTINGS, helpMainConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'helpMainController',
    templateUrl: '/static/js/app/main/help-main/help-main.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, helpMainCtrl){

    }
  }
}])
