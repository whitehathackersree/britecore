angular.
module('common').
controller('modalController', ['$scope', '$sce', '$window','$location', '$timeout','$element', 'SETTINGS', 'AuroraModal', 'Socket','AuthService',
 function($scope, $sce, $window, $location, $timeout,$element, SETTINGS, AuroraModal, socket, AuthService){
  var self = this;
  $scope.version = SETTINGS.VERSION;
  $scope.user = AuthService.getUser();
  $scope.$on('user:updated', function(event,user) {
     $scope.user = AuthService.getUser();
   });
  socket.subscribe('product-won', function(message) {
    var data = message["data"]
    if(data["winner"] && (data["winner"]==$scope.user.username)){
      AuroraModal.type="product_won";
      AuroraModal.data={
        user: $scope.user,
        item_title: data["item_title"],
        item_image: data["item_image"],
        amount: data["amount"]
      }
      AuroraModal.isActive=true;
      $scope.$apply();
    }
  });

}])
.constant('modalConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('modal', ['$parse', '$http', '$compile', 'SETTINGS','modalConfig', 'AuroraModal',
 function($parse, $http, $compile, SETTINGS, modalConfig, AuroraModal){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {

    },
    controller: 'modalController',
    templateUrl : '/static/js/app/common/modal/modal.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, modalCtrl){
      scope.type = function(){
        return AuroraModal.type;
      }
      scope.data = function(){
        return AuroraModal.data;
      }
      scope.isActive = function(){
        return AuroraModal.isActive;
      }
      scope.close = function(){
        AuroraModal.isActive=false;
        AuroraModal.data={};
      }
    }
  }
}])
