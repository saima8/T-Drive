import { check } from 'meteor/check';
import { FilesCollection } from '/imports/db/FilesCollection';

Meteor.methods({
  'files.insert'(file) {
    check(file.name, String);
    check(file.url, String);
    check(file.isDirectory, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    FilesCollection.insert({
      ...file,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'files.remove'(fileId) {
    check(fileId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const file = FilesCollection.findOne({ _id: fileId, userId: this.userId });

    if (!file) {
      throw new Meteor.Error("Access denied or File Doesn't Exist.");
    }

    FilesCollection.remove(fileId);
  },

  // 'files.setIsChecked'(fileId, isChecked) {
  //   check(fileId, String);
  //   check(isChecked, Boolean);

  //   if (!this.userId) {
  //     throw new Meteor.Error('Not authorized.');
  //   }

  //   const file = FilesCollection.findOne({ _id: fileId, userId: this.userId });

  //   if (!file) {
  //     throw new Meteor.Error('Access denied.');
  //   }

  //   FilesCollection.update(fileId, {
  //     $set: {
  //       isChecked,
  //     },
  //   });
  // },
});