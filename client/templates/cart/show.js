/**
 * Created by aaronbrecher on 11/28/16.
 */
Template.cartShow.helpers({
  
   cart: function () {
     currentCart = Carts.getCart(userKey);
     return currentCart;
   },
  
   thereAreNo: function (items) {
     return items >= 0;
   } 
});

Template.cartShow.events({
  'click .remove-from-cart': function (e) {
    e.preventDefault();
    removeFromCart(this.sku, function (err, res) {
      if (err)
        console.log(err);
      else{
        if (currentCart.items.length === 0)
          Router.go('homeIndex');
      }
    });
  },

  'change .item-qty': function (e) {
    var rawValue = e.target.value;
    if(isNaN(rawValue))
      sAlert.error('you did not enter a number');
    else{
      var number = parseInt(rawValue);
      var name = this.name;
      if (number <= 0){
        removeFromCart(this.sku);
      }
      else{
        this.quantity = number;
        updateCart(this.sku, this.quantity, function (err, res) {
          if(err)
            sAlert.error('was not able to update');
          else
            sAlert.success('updated ' + name);
        });
      }
    }
  },


});