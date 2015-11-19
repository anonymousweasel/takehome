var choices = new Mongo.Collection('choices');

FlowRouter.route('/player1', {
  action: function(params, queryParams) {
    Session.set('player', '1');
  }
});

FlowRouter.route('/player2', {
  action: function(params, queryParams) {
    Session.set('player', '2');
  }
});

function choseWeapon(weapon) {
  choices.insert({
    player: Session.get('player'),
    weapon: weapon
  });
}

var outcomes = {
  'rock': {
    'rock': 3,
    'paper': 2,
    'scissors': 1,
  },
  'paper': {
    'rock': 1,
    'paper': 3,
    'scissors': 2,
  },
  'scissors': {
    'rock': 2,
    'paper': 1,
    'scissors': 3,
  },
};

function getWeaponForPlayer(player) {
  var playerChoice = choices.findOne({player: player});
  if (!playerChoice) {
    return false;
  }
  return playerChoice.weapon;
}


function getWinner() {
  var weapon1 = getWeaponForPlayer('1');
  var weapon2 = getWeaponForPlayer('2');
  console.log(weapon1);
  console.log(weapon2);
  if (!weapon1 || !weapon2) {
    return false;
  }
  var winner = outcomes[weapon1][weapon2];
  console.log("Winner: " + winner);
  return winner;
}

if (Meteor.isClient) {
  Template.body.helpers({
    player: function() {
      return Session.get('player');
    },
    winner: function() {
      return getWinner();
    },
    winnerText: function() {
      var winner = getWinner();
      if (winner == 3) {
        return 'It was a tie!';
      } else if (winner == Session.get('player')) {
        return 'You won!';
      } else {
        return 'You lost :(';
      }
    },
    chosenWeapon: function() {
      return getWeaponForPlayer(Session.get('player'));
    },
  });
  Template.body.events({
    'click .weaponButton': function (event) {
      var weapon = event.target.id;
      choseWeapon(weapon);
    },
    'click #playAgain': function (event) {
      Meteor.call('reset');
    },
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    reset: function() {
      choices.remove({});
    },
  });
}
