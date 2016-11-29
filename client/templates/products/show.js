/**
 * Created by aaronbrecher on 11/29/16.
 */
Template.productsShow.events({
  'click #add-to-cart': function (e) {
    e.preventDefault();

    addToCart(this.sku,function (err, res) {
      if (err)
        sAlert.error('error in adding to cart');
      else
        Router.go('cartShow');
    });
  },
})