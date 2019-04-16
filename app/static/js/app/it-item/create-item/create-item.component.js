angular.
module('common').
controller('createItemController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'Item',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, Item){
  var self = this;
  self.user = AuthService.getUser();
  $scope.photo_count = 7;
  $scope.referwd="";
  $scope.btn_active=true;
  $scope.images=[];
  for(i=0;i<7;i++){
    $scope.images[i]={image:null};
  }
  
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   
   $scope.itemCreate = function(){
     $scope.btn_active=false;
     tmpArr = [];
     $scope.images.forEach(function(im){
       if(im.image)tmpArr.push(im);
     });
     $scope.images=tmpArr;
     data={
       title:$scope.title,
       mrp: $scope.mrp,
       discounted_rate: $scope.discounted_rate,
       sale_rate: $scope.sale_rate,
       amazon_link: $scope.amazon_link,
       flipkart_link: $scope.flipkart_link,
       description: $scope.description,
       images: $scope.images,
     };
     
     Item.create(data,function(item){
       $scope.btn_active=true;
       AuroraModal.isActive=false;
       Aurora.success("Item "+item.title+" created successfully");
       $window.location.reload();
     }, function(response){
       $scope.btn_active=true;
       Aurora.error(response["data"]);
     });
   }

   $scope.picUpdateNeeded = function(e, num){
     var fileEl = e.target;
     
     
     if(fileEl.files && fileEl.files[0]){
       var reader = new FileReader();
       reader.onload = function(e) {
         $scope.images[num].image = e.target.result;
         $scope.$apply();
       }
       reader.readAsDataURL(fileEl.files[0]);
     }
   }

   $scope.clickedPhoto = function(num, e){

   }
}])
.constant('createItemConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('createItem', ['$parse', '$http', '$compile', 'SETTINGS', 'createItemConfig',
 function($parse, $http, $compile, SETTINGS, createItemConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'createItemController',
    templateUrl: '/static/js/app/control/create-item/create-item.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, createItemCtrl){

    }
  }
}])
