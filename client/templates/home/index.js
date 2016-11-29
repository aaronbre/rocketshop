/**
 * Created by aaronbrecher on 11/24/16.
 */

Template.homeIndex.helpers({
  featured: function(){
    return Products.featured();
  },
});