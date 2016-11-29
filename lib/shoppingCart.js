/**
 * Created by aaronbrecher on 11/28/16.
 */
if(Meteor.isClient){

  userKey = localStorage.getItem("user_key");
  if(!userKey){
    userKey = Meteor.uuid();
    localStorage.setItem("user_key", userKey);
  }

  getCart = function (next) {
    Meteor.call('getCart', next);
  };
  
  addToCart = function (sku, callback) {
    Meteor.call('addToCart', userKey, sku, callback);
  };
  
  removeFromCart = function (sku, callback) {
    Meteor.call('removeFromCart', userKey, sku, callback);
  };

  updateCart = function (sku, quantity, callback) {
    Meteor.call('updateCart', userKey, sku, quantity, callback);
  }
}

if (Meteor.isServer){
  Meteor.methods({
    getCart: function (userKey) {
      return Carts.getCart(userKey);
    },
    
    updateCart: function (userKey, sku, quantity) {
      var cart = Meteor.call('getCart', userKey);
      var found = _.find(cart.items, function (item) {
        return item.sku === sku;
      });

      if (!found)
        alert('no such item in cart');
      else {
        found.quantity = quantity;
        Meteor.call('saveCart', cart);
      }
    },

    addToCart: function (userKey, sku) {
      var cart = Meteor.call('getCart', userKey);
      var found = _.find(cart.items, function (item) {
        return item.sku === sku;
      });
      
      if(found)
        found.quantity++;
      else{
        var product = Products.bySku(sku);
        var item = {
          sku: product.sku,
          name: product.name,
          price: product.price,
          description: product.summary,
          discount: 0,
          image: product.image,
          added_at: new Date(),
          quantity: 1,
        };
        cart.items.push(item);
      }
      cart.notes.push({note: sku + ' added to cart', created_at: new Date()});
      Meteor.call('saveCart', cart);
      return cart;
    },

    removeFromCart: function (userKey, sku) {
      var cart = Meteor.call('getCart', userKey);
      var found = _.find(cart.items, function (item) {
        return item.sku === sku;
      });

      if (found){
        var index = cart.items.indexOf(found);
        cart.items.splice(index, 1);
        cart.notes.push({
          note: sku + ' removed from cart',
          created_at: new Date(),
        });
        Meteor.call('saveCart', cart);
      }
    },

    saveCart: function (cart) {
      cart.updated_at = new Date();
      cart.total = 0;
      var counter = 0;
      _.each(cart.items, function (item) {
        item.lineTotal = (item.price - item.discount) * item.quantity;
        cart.total += item.lineTotal;
        counter++;
      });
      cart.itemCount = counter;
      Carts.update({userKey: cart.userKey}, cart, {upsert: true});
      return cart;
    }
  });
}