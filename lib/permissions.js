/**
 * Created by aaronbrecher on 11/27/16.
 */

isAdmin = function () {
  var loggedInUser = Meteor.user();
  return (loggedInUser && Roles.userIsInRole(loggedInUser, ['admin']));

}