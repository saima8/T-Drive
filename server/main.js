import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { FilesCollection } from "/imports/db/FilesCollection";
import "/imports/api/authMethods";
import "/imports/api/filesMethods";
import "/imports/api/filesPublications";

const insertFile = (file, user) =>
  FilesCollection.insert({
    ...file,
    ownerId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "tithy";
const SEED_EMAIL = "tithy@gmail.com";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

 
});
