/**
 * Created by aaronbrecher on 11/28/16.
 */
Template.vendorsShow.helpers({
  products: function () {
    return Products.find({'vendor.id': this.id});
  },
});