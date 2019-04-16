angular.
  module('core').
  factory('AuthService', ['$rootScope', '$cookies', '$q', '$http', 'Socket',
  function($rootScope, $cookies, $q, $http, socket) {
    var self = this;
    self.baseURL = "/api/auth/";
    self.service={

      setUser: function(user){
        $cookies.remove('user');
        $cookies.put('user', JSON.stringify(user), {'path': '/'});
        $rootScope.$broadcast('user:updated', user);
      },

      getUser: function() {
          return $cookies.get('user')?JSON.parse($cookies.get('user')):{};
      },

      login: function(username, password){
        return $http({
            method: "POST",
            url: self.baseURL + "token/",
            data: {username_or_email_or_mobile: username, password: password },
        }).then(function(response) {  // sucsess
          $cookies.remove('userToken');
          $cookies.put('userToken', response.data["token"], {'path': '/'});
          self.service.setUser(response.data["user"]);
          return response;
        },
        function(response) { // failed
          return $q.reject(response);
        });
      },

      logout: function(){
        $http({
            method: "POST",
            url: self.baseURL + "deleteToken/",
            data: {token: $cookies.get("userToken")},
        }).then(function(){
          $cookies.remove("userToken", {path: "/"});
          $cookies.remove("user", {path: "/"});
          self.service.setUser({});
        },function(){
          $cookies.remove("userToken", {path: "/"});
          $cookies.remove("user", {path: "/"});
          self.service.setUser({});
        });
      },

      sendOTP: function(phone_number){
        console.log(phone_number)
        return $http({
            method: "POST",
            url: "/api/otp/",
            data: {
              phone_number: phone_number
            },
        });
      },

      register: function(phone_number, otp, email, password, referral){
        return $http({
            method: "POST",
            url: "/api/user/",
            data: {
              phone_number: phone_number,
              otp: otp,
              email: email,
              password: password,
              referral: referral
            },
        });
      },

      passwordReset: function(phone_number, otp, password){
        return $http({
            method: "POST",
            url: "/api/auth/password_reset/",
            data: {
              phone_number: phone_number,
              otp: otp,
              password: password
            },
        });
      },

      isAuthenticated: function() {
        var token = $cookies.get('userToken');
        if(token)return true;
        return false;
      },

      getAuthenticatedUser: function() {
        var token = $cookies.get('userToken');
        return $http({
          method: 'POST',
          url: self.baseURL + 'isAuthenticated/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
          }
        }).then(function(response){
          self.service.setUser(response.data?response.data:{});
          return response.data;
        });
      },


    };

    socket.subscribe('user-coins', function(message){
      if(message["data"]){
        user = self.service.getUser();
        user["coins"] = message["data"]["coins"];
        self.service.setUser(user);
      }
    });

    return self.service;
}]);
