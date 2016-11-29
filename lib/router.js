/**
 * Created by aaronbrecher on 11/24/16.
 */
import {Router} from 'meteor/iron:router';

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route("/", {
  name: 'homeIndex',
  data: {
    message: 'Welcome to the Rocket Shop',
  },
});

Router.route('/contact', {
  name: 'homeContact',
});

Router.route('/about', {
  name: 'homeAbout',
});

Router.route('/productsShow/:sku', {
  name: 'productsShow',
  data: function () {
    return Products.findOne({sku: this.params.sku})
  }
});

Router.route('/vendors/:slug', {
  name: 'vendorsShow',
  data: function () {
    return Vendors.findOne({slug: this.params.slug});
  }
});

Router.route('/cart', {
  name: 'cartShow',
});