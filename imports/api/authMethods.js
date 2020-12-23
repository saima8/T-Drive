import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "registerAccountWithPassword"(username, email, password) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username: username,
        email: email,
        password: password,
      });
    }
  },
});
