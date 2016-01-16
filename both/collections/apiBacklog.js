ApiBacklogItems = new Mongo.Collection("apiBacklogItems");

ApiBacklogItems.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 100,
    autoform: {
      placeholder: "Title"
    }
  },
  details: {
    type: String,
    label: "Details",
    max: 1000,
    autoform: {
      rows: 5,
      placeholder: "Description"
    }
  },
  priority: {
    type: Number,
    label: 'Priority',
    min:0,
    max:2,
    autoform: {
      options: [
        { label: "High", value: 2 },
        { label: "Middle", value: 1 },
        { label: "None", value: 0 }
      ]
    }
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      return Meteor.userId();
    }
  },
  apiBackendId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {

      if (this.isInsert)
        return new Date();

      else if (this.isUpsert)
        return { $setOnInsert: new Date() };

      else
        this.unset();
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date();
    }
  }
}));

ApiBacklogItems.allow({
  insert: function (userId, backlog) {

    // Transform backlog document to an ApiBacklog instance
    var backlogTransformedDocument = ApiBacklogItems._transform(backlog);

    // Call ApiBacklog helper that return boolean
    return backlogTransformedDocument.currentUserIsApiBackendManager(backlog.apiBackendId);
  },
  update: function (userId, backlog) {

    // Transform backlog document to an ApiBacklog instance
    var backlogTransformedDocument = ApiBacklogItems._transform(backlog);

    // Call ApiBacklog helper that return boolean
    return backlogTransformedDocument.currentUserIsApiBackendManager(backlog.apiBackendId) && (userId === backlog.userId);
  },
  remove: function (userId, backlog) {

    // Transform backlog document to an ApiBacklog instance
    var backlogTransformedDocument = ApiBacklogItems._transform(backlog);

    // Call ApiBacklog helper that return boolean
    return backlogTransformedDocument.currentUserIsApiBackendManager(backlog.apiBackendId) && (userId === backlog.userId);
  }
});

ApiBacklogItems.helpers({
  currentUserIsApiBackendManager: function (apiBackendId) {

    // Get current user's id
    var currentUserId = Meteor.userId();

    // Find related API Backend that contains "managerIds" field
    var apiBackend = ApiBackends.findOne(apiBackendId, {fields: {managerIds: 1}});

    // Try - Catch wrapper here because Mongodb call above can return zero matches
    try {

      // Get managerIds array from API Backend document
      var managerIds = apiBackend.managerIds;

    } catch (err) {

      // If no related document found return false - API Backend does not have any managers listed
      return false;
    }

    // Check if an array of managerIds contain user id passed
    var isManager = _.contains(managerIds, currentUserId);

    return isManager;
  }
});
