/**
 * Created by aaronbrecher on 11/29/16.
 */
Template.checkoutShow.helpers({
  cart: function () {
    currentCart = Carts.findOne({userKey: userKey});
    return currentCart;
  },
});

Template.checkoutShow.onRendered(function () {
  checkoutModel = new CheckoutViewModel({
    name: 'Jill test',
    email: 'jill@test.com',
    address: {
      street: '12 test street',
      city: 'lakewood',
      state: 'NJ',
      zip: '08701',
      country: 'US',
    },
  });

  var panel = document.getElementById('checkout-panel');
  ko.cleanNode(panel);
  ko.applyBindings(checkoutModel, panel);
});