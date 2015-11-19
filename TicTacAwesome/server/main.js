Meteor.methods({
  reset: function() {
    movesDb.remove({});
  },
});
