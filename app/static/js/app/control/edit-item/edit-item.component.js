angular.
module('control').
controller('editItemController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'Item',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, Item){
  var self = this;
  self.user = AuthService.getUser();
  $scope.photo_count = 5;
  $scope.referItem="";
  $scope.btn_active=true;
  $scope.$watch('data', function(value) {
    $scope.item = {};
    Item.get({itemId:value.id}, function(item){
      if(item.images.length < 7){
        for(i=0;i<7;i++){
          item.images[i]=item.images[i]?item.images[i]:{image:null};
        }
      }
      $scope.item = item;
      angular.copy($scope.item, $scope.referItem);
    });
  });

  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   $scope.itemUpdate = function(){
     $scope.btn_active=false;
     tmpArr = [];
     $scope.item.images.forEach(function(im){
       if(im.image)tmpArr.push(im);
     });
     $scope.item.images=tmpArr;
     data={
       itemId:$scope.item.id,
       title: $scope.item.title,
       mrp: $scope.item.mrp,
       discounted_rate: $scope.item.discounted_rate,
       sale_rate: $scope.item.sale_rate,
       amazon_link: $scope.item.amazon_link,
       flipkart_link: $scope.item.flipkart_link,
       description: $scope.item.description,
       images: $scope.item.images,
       ...(($scope.item.images!=$scope.referItem.images) && {images: $scope.item.images}),
       ...($scope.item.title && {title: $scope.item.title}),
       ...($scope.item.mrp && {mrp: $scope.item.mrp}),
       ...($scope.item.sale_rate && {sale_rate: $scope.item.sale_rate}),
       ...($scope.item.discounted_rate && {discounted_rate: $scope.item.discounted_rate}),
       ...($scope.item.amazon_link && {amazon_link: $scope.item.amazon_link}),
       ...($scope.item.flipkart_link && {flipkart_link: $scope.item.flipkart_link}),
       ...($scope.item.description && {description: $scope.item.description})
     };
     Item.update(data,function(item){
       $scope.btn_active=true;
       AuroraModal.isActive=false;
       Aurora.success("Item Updated successfully");
       //$window.location.reload();
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
         $scope.item.images[num].image = e.target.result;
         $scope.$apply();
       }
       reader.readAsDataURL(fileEl.files[0]);
     }
   }

   $scope.clickedPhoto = function(num, e){

   }
}])
.constant('editItemConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('editItem', ['$parse', '$http', '$compile', 'SETTINGS', 'editItemConfig',
 function($parse, $http, $compile, SETTINGS, editItemConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'editItemController',
    templateUrl: '/static/js/app/control/edit-item/edit-item.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, editItemCtrl){

    }
  }
}])
