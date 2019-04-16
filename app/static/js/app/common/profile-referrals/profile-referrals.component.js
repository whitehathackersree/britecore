angular.
module('common').
controller('profileReferralsController', ['$scope', '$location','$element', 'Spinner', 'ReferralData',
 function($scope, $location, $element, Spinner, ReferralData){
  var self = this;
  Spinner.isCentered=true;
  Spinner.active();
  $scope.show=false;

  $scope.referralData = ReferralData.get().$promise.then(function(referralData){
    $scope.referral="https://bidbuzz.in/c/"+referralData.referral;
    $scope.referralStats = [
      {
        title: "clicks",
        desc: "Number of times your link has been clicked.",
        stat: referralData.clicks
      },
      {
        title: "referrals",
        desc: "	People who have signed up using your link.",
        stat: referralData.referrals
      },
      {
        title: "credited",
        desc: "Coins that have been added to your account.",
        stat: referralData.credited_coins
      },
    ];
    Spinner.inactive();
    $scope.show=true;
  });


  $scope.copyReferral = function(){
    var c=document.getElementById("referral_link");
    c.style.display='block';
    c.select();
    document.execCommand("copy");
    c.style.display='none';
  };

}])
.constant('profileReferralsConfig', {
  srcErrorMessage: 'Couldn\'t load this tab!',
})
.directive('profileReferrals', ['$parse', '$http', '$compile', 'SETTINGS', 'profileReferralsConfig',
 function($parse, $http, $compile, SETTINGS, profileReferralsConfig){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      winner: '='
    },
    controller: 'profileReferralsController',
    templateUrl: '/static/js/app/common/profile-referrals/profile-referrals.template.html?v='+SETTINGS.VERSION,
    replace: true,
    link: function(scope, element, attrs, profileReferralsCtrl){

    }
  }
}])
