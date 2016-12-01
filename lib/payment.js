/**
 * Created by aaronbrecher on 11/30/16.
 */
if (Meteor.isClient){
  processPayment = function (checkout, next) {
    Meteor.call("processPayment", checkout, next);
  };

  getReciept = function (key, next) {
    return Meteor.call("getReceipt", key, next);
  }
}

if (Meteor.isServer){
  Meteor.methods({
    getReceipt: function (key) {
      return SalesRepo.getReceipt(key);
    },

    processPayment: function (checkout) {
      var cart = Carts.findOne({_id : checkout.cart_id});
      checkout.total = cart.total;
      checkout.items = JSON.stringify(cart.items);
      checkout.payment_details = StripeService.runCharge(checkout);
      checkout.refrence_key = Meteor.uuid();
      Meteor.call('emptyCart', cart.userKey);
      return SalesRepo.saveCheckout(checkout);
    },
  });
}