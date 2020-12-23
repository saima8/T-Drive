import { Meteor } from 'meteor/meteor';
import { FilesCollection } from '/imports/db/FilesCollection';

Meteor.publish('files', function publishFiles() {
  return FilesCollection.find({ userId: this.userId });
});
