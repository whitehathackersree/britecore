angular.
module('common').
controller('makeAReviewController', ['$scope', '$window', '$location','$element', 'Spinner', 'Aurora', 'AuthService', 'AuroraModal', 'WinnerData',
 function($scope, $window, $location, $element, Spinner, Aurora, AuthService,AuroraModal, WinnerData){
  var self = this;
  self.user = AuthService.getUser();
  $scope.photo_count = 5;
  $scope.referwd="";
  $scope.btn_active=true;
  WinnerData.get({winnerDataId:$scope.data.id}, function(wd){
    if(wd.winner_images.length < 5){
      for(i=0;i<5;i++){
        wd.winner_images[i]=wd.winner_images[i]?wd.winner_images[i]:{image:null};
      }
    }
    $scope.wd = wd;
    angular.copy($scope.wd, $scope.referwd);
  });
  $scope.$on('user:updated', function(event,user) {
     self.user = AuthService.getUser();
   });
   $scope.currentRoute= function(){
     return $location.path();
   }
   
   $scope.reviewCreate = function(){
     $scope.btn_active=false;
     tmpArr = [];
     $scope.wd.winner_images.forEach(function(wi){
       if(wi.image)tmpArr.push(wi);
     });
     $scope.wd.winner_images=tmpArr;
     data={
       winnerDataId:$scope.wd.id,
       title: $scope.wd.title,
       description: $scope.wd.description,
       winner_images: $scope.wd.winner_images,
       ...(($scope.wd.winner_images!=$scope.referwd.winner_images) && {winner_images: $scope.wd.winner_images}),
       ...($scope.wd.title && {title: $scope.wd.title}),
       ...($scope.wd.description && {description: $scope.wd.description})
     };
     
     WinnerData.put(data,function(wd){
       $scope.btn_active=true;
       AuroraModal.isActive=false;
       Aurora.success("Review made successfully");
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
         $scope.wd.winner_images[num].image = e.target.result;
         $scope.$apply();
       }
       reader.readAsDataURL(fileEl.files[0]);
     }
   }

   $scope.clickedPhoto = function(num, e){

   }
}])
.constant('makeAReviewConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('makeAReview', ['$parse', '$http', '$compile', 'SETTINGS', 'makeAReviewConfig',
 function($parse, $http, $compile, SETTINGS, makeAReviewConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      data: '='
    },
    controller: 'makeAReviewController',
    templateUrl: '/static/js/app/common/make-a-review/make-a-review.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, makeAReviewCtrl){

    }
  }
}])
