var winningLines = generateWinningLines();

function generateWinningLines() {
  var winningLines = [];
  // Add verticals
  for (var row = 0; row < 3; row++) {
    winningLines.push([
      {row: row, col: 0}, {row: row, col: 1}, {row: row, col: 2}
    ]);
  };
  // Add horizontals
  for (var col = 0; col < 3; col++) {
    winningLines.push([
      {row: 0, col: col}, {row: 1, col: col}, {row: 2, col: col}
    ]);
  };
  // Diagnals
  winningLines.push([
    {row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2}
  ]);
  winningLines.push([
    {row: 0, col: 2}, {row: 1, col: 1}, {row: 2, col: 0}
  ]);
  return winningLines;
}

Template.body.helpers({
  isPlayer: function() {
    var player = Session.get('player');
    return player == 'X' || player == 'O';
  },
  getWinner: getWinner,
});

function getPlayerWonLine(winningLine) {
  var winner;
  for (var i = 0; i < winningLine.length; i++) {
    var owner = getOwningPlayerOfPosition(winningLine[i]);
    if (!owner) {
      return false;
    } else {
      if (i != 0 && winner != owner) {
        return false;
      }
      winner = owner;
    }
  }
  return winner;
}

function getWinner() {
  for (var i = 0; i < winningLines.length; i++) {
    var winningPlayer = getPlayerWonLine(winningLines[i]);
    if (winningPlayer) {
      return winningPlayer;
    }
  }
  return false;
}

function getNumberOfMoves() {
  return movesDb.find().count();
}

function playerCanMove() {
  return (Session.get('player') == 'X' && getNumberOfMoves() % 2 == 0) ||
      (Session.get('player') == 'O' && getNumberOfMoves() % 2 == 1);
}

function getOwningPlayerOfPosition(position) {
  var move = movesDb.findOne({row: position.row, col: position.col});
  if (move) {
    return move.player;
  } else {
    return false;
  }
}

function makeMove(position) {
  movesDb.insert({
    row: position.row,
    col: position.col,
    player: Session.get('player')
  });
}

// Global
positionClicked = function(position) {
  if (!playerCanMove()) {
    console.log('Not your turn to move.');
    return;
  }
  if (getOwningPlayerOfPosition(position)) {
    console.log('Position already taken.');
    return;
  }
  if (getWinner()) {
    console.log('Someone already won');
    return;
  }
  makeMove(position);
};
