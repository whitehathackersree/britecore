angular.
  module('bidBayApp').
  provider('SETTINGS', function ($resourceProvider) {
    var self=this;
    self.RAZORPAY_KEY_ID = "rzp_live_1h3ZyAz4feFjB5";
    self.RAZORPAY_TEST_KEY_ID = "rzp_test_IWfwO9BqdV5dnF";
    self.RAZORPAY_TEST_MODE=false;
    self.ORDER_PLATFORMS=["amazon", "flipkart", "snapdeal"];
    self.DELIVERY_STATUS=["order processing", "shipped", "out for delivery", "delivered"];
    this.setOne = function(value) {
        valOne = value;
    };

    this.$get = function($resource) {
        return {
            RAZORPAY_KEY_ID: function() {
                return self.RAZORPAY_TEST_MODE?self.RAZORPAY_TEST_KEY_ID:self.RAZORPAY_KEY_ID;
            },
            VERSION: "2.0.7",
            ORDER_PLATFORMS: self.ORDER_PLATFORMS,
            DELIVERY_STATUS: self.DELIVERY_STATUS,
        };
    };

});


/*
app = angular.
  module('bidBayApp',[]).
  provider('SETTINGS', function ($resourceProvider) {
    var valOne = 'Some Default';
    this.setOne = function(value) {
        valOne = value;
    };

    var valTwo = 'Another Default';
    this.setTwo = function(value) {
        valTwo = value;
    };

    this.$get = function($resource) {
        return {
            getOne: function() {
                return valOne;
            },
            getTwo: function() {
                return valTwo;
            }
        };
    };

});*/
