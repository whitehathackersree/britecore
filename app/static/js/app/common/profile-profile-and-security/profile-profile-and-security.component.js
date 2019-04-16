angular.
module('common').
controller('profileProfileAndSecurityController', ['$scope', '$location','$element', 'Spinner', 'AuthService','User', 'Aurora',
 function($scope, $location, $element, Spinner, AuthService, User, Aurora){
  var self = this;

  $scope.referUser = AuthService.getUser();
  $scope.user = {};
  angular.copy($scope.referUser, $scope.user);
  $scope.changed = function(){
    r = $scope.referUser;
    c = $scope.user;
    return r.profile_photos['200x200']!=c.profile_photos['200x200']?c.profile_photos['200x200']:null || r.username!=c.username?c.username:null || r.email!=c.email?c.email:null || r.address!=c.address?c.address:null;
  }

  $scope.picUpdateNeeded = function(){
    var fileEl = document.querySelector('#user_profile_pic');

    if(fileEl.files && fileEl.files[0]){
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.user.profile_photos['200x200'] = e.target.result;
        $scope.$apply();
      }
      reader.readAsDataURL(fileEl.files[0]);
    }
  }

  $scope.update = function(){
    data={
      userId:$scope.user.id,
      ...(($scope.user.profile_photos['200x200']!=$scope.referUser.profile_photos['200x200']) && {photo: $scope.user.profile_photos['200x200']}),
      ...($scope.user.username && {username: $scope.user.username}),
      ...($scope.user.email && {email: $scope.user.email}),
      ...($scope.user.address && {address: $scope.user.address})
    };

    User.patch(data,function(user){
      AuthService.setUser(user);
      Aurora.success("Profile updated successfully");
    }, function(response){
      Aurora.error(response["data"]);
    });

    $scope.$on('user:updated', function(event,user) {
       $scope.referUser=user;
       angular.copy($scope.referUser, $scope.user);
     });
  }
}])
.constant('profileProfileAndSecurityConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileProfileAndSecurity', ['$parse', '$http', '$compile', 'SETTINGS', 'profileProfileAndSecurityConfig',
 function($parse, $http, $compile, SETTINGS, profileProfileAndSecurityConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileProfileAndSecurityController',
    templateUrl: '/static/js/app/common/profile-profile-and-security/profile-profile-and-security.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileProfileAndSecurityCtrl){

    }
  }
}])
