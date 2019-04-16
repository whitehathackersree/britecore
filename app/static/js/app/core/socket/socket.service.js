angular.
module('core.socket').
constant('SOCKET_EVENTS', {
    bidPlaced: 'bid-placed',
    userCoins: 'user-coins',
    userNotif: 'user-notif',
}).
factory('Socket', ['$resource', '$location', '$cookies', 'SOCKET_EVENTS', 'Aurora',
function($resource, $location, $cookies, SOCKET_EVENTS, Aurora) {
  var self = this;
  var Service = {};
  var token = $cookies.get("userToken");
  var web_socket_url = (($location.protocol()=="http")?"ws":"wss") + '://'+ $location.host() +':'+  8001  +'/ws/bidData/?token='+token;
  var ws = new WebSocket(web_socket_url);


  var callbacksArray = [];
  var eventCallbacksArray = [];
  //eventCallbacksArray = [{"event_type": "event_name", callbacks: ["cb1", "cb2", ]}];
  Service.subscribe = function(event_type, callback){
    var eventDict = eventCallbacksArray.filter(function(dct){return dct.event_type == event_type})[0];
    if(eventDict){
      eventDict["callbacks"].push(callback);
    }
    else if(event_type){
      eventCallbacksArray.push({event_type: event_type, callbacks: [callback,]});
    }
    else{
      callbacksArray.push(callback)
    }
  }
  Service.onMessage = function(messageEvent) {
    var message = JSON.parse(messageEvent["data"])["message"];

    if(message["errors"]){
      Aurora.error(message["errors"]);
    }
    var event_type = message["event_type"];
    var eventDict = eventCallbacksArray.filter(function(dct){return dct.event_type == event_type})[0];
    if(eventDict){
      eventDict["callbacks"].forEach(function(cb){
        cb(message);
      });
    }
    else{
      callbacksArray.forEach(function(cb){
        cb(data);
      });
    }
  };

  Service.onClose = function() {

    setTimeout(function(){Service.connect();}, 1000);
  };

  Service.onOpen = function() {

  };

  Service.onError = function(error) { /* some code */};

  Service.send = function(data) {
    data = JSON.stringify(data);
    data["token"]=$cookies.get("userToken");

    ws.send(data);

  };

  Service.connect = function() {
    if(ws.readyState === ws.CLOSED){

      ws = new WebSocket(web_socket_url);
    }
      // (Re)connect
      //ws = new WebSocket(web_socket_url);
      // Reattaching handlers to object
      ws.onmessage = Service.onMessage;
      ws.onclose = Service.onClose;
      ws.onopen = Service.onOpen;
      ws.onerror = Service.onError;
  }
  Service.connect();
  return Service;

}]);


/*

angular.
module('core.socket').
factory('Socket', ['$resource', '$location', function($resource, $location) {
  var self = this;
  var stack = [];
  var onmessageDefer;
  var web_socket_url = $location.protocol()=="https"?"wss":"ws" + '://'+ $location.host() +':'+  $location.port()  +'/ws/bidData/';
  self.ws = new WebSocket(web_socket_url);
  self.service = {
    init: function(){
      if(self.ws.readyState === self.ws.CLOSED){

        self.ws = new WebSocket(web_socket_url);
      }
      self.ws.onopen = function(event) {

        for (i in stack) {
            self.ws.send(stack[i]);
        }
        stack = [];
        if (onmessageDefer) {
            self.ws.onmessage = onmessageDefer;
            onmessageDefer = null;
        }
      }
      self.ws.onclose = function(){

        setTimeout(function(){self.service.init();}, 1000);
       }
    },
    send: function(data) {
        data = JSON.stringify(data);
        if (self.ws.readyState == 1) {
            self.ws.send(data);

        } else {
            stack.push(data);
        }
    },
    onmessage: function(callback) {
        if (self.ws.readyState == 1) {
            self.ws.onmessage = callback;

        } else {
            onmessageDefer = callback;
        }
    },
  };
  self.service.init();
  return self.service;
}]);
*/
/*

angular.
module('core.socket').
factory('Socket', ['$resource', '$location', function($resource, $location) {
    var stack = [];
    var onmessageDefer;
    var web_socket_url = $location.protocol()=="https"?"wss":"ws" + '://'+ $location.host() +':'+  $location.port()  +'/ws/bidData/';
    var ws = new WebSocket(web_socket_url);
    function socket(){
      var self = this;
      if(ws.readyState === ws.CLOSED){

        ws = new WebSocket(web_socket_url);
      }
      ws.onopen = function(event) {

          for (i in stack) {
              ws.send(stack[i]);
          }
          stack = [];
          if (onmessageDefer) {
              ws.onmessage = onmessageDefer;
              onmessageDefer = null;
          }
      };
      self.send = function(data) {
          data = JSON.stringify(data);
          if (ws.readyState == 1) {
              ws.send(data);

          } else {
              stack.push(data);
          }
      };
      self.onmessage = function(callback) {
          if (ws.readyState == 1) {
              ws.onmessage = callback;

          } else {
              onmessageDefer = callback;
          }
      };
      ws.onclose = function(){

		    setTimeout(function(){socket();socket.onmessage();}, 1000);
	     }
    };
    return socket;
}]);
*/
