/**
 * Created by aaronbrecher on 11/29/16.
 */

Template.productTile.events({
  'click .add-to-cart': function (e) {
    e.preventDefault();

    addToCart(this.sku,function (err, res) {
      if (err)
        alert('error in adding to cart');
      else
        Router.go('cartShow');
    });
  },

});