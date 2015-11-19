// global
movesDb = new Mongo.Collection("moves");


FlowRouter.route('/player1', {
  action: function(params, queryParams) {
    Session.set('player', 'X');
  }
});

FlowRouter.route('/player2', {
  action: function(params, queryParams) {
    Session.set('player', 'O');
  }
});
