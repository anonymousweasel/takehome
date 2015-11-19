var boardSize = 640;
var padding = 35;
var spacingBetweenLines = (boardSize - padding * 2) / 3;


function getXDrawingData(position) {
  var centerPixel = getCenterPixelOfPosition(position);
  var distanceFromCenter = spacingBetweenLines * .3;
  return {
    'xTopLeft': centerPixel.x - distanceFromCenter,
    'yTopLeft': centerPixel.y - distanceFromCenter,
    'xTopRight': centerPixel.x + distanceFromCenter,
    'yTopRight': centerPixel.y - distanceFromCenter,
    'xBottomLeft': centerPixel.x - distanceFromCenter,
    'yBottomLeft': centerPixel.y + distanceFromCenter,
    'xBottomRight': centerPixel.x + distanceFromCenter,
    'yBottomRight': centerPixel.y + distanceFromCenter,
  }
}

function getODrawingData(position) {
  var centerPixel = getCenterPixelOfPosition(position);
  return {
    'cx': centerPixel.x,
    'cy': centerPixel.y,
    'r': spacingBetweenLines * .3
  }
}

function getCenterPixelOfPosition(position) {
  return {
    x: padding + (position.col + 0.5) * spacingBetweenLines,
    y: padding + (position.row + 0.5) * spacingBetweenLines,
  }
}

Template.body.helpers({
  boardLines: function() {
    return [
      // vertical left
      {x1: padding + spacingBetweenLines,
       y1: padding,
       x2: padding + spacingBetweenLines,
       y2: boardSize - padding,
      },
      // vertical right
      {x1: padding + spacingBetweenLines * 2,
       y1: padding,
       x2: padding + spacingBetweenLines * 2,
       y2: boardSize - padding,
      },
      // horizontal top
      {x1: padding,
       y1: padding + spacingBetweenLines,
       x2: boardSize - padding,
       y2: padding + spacingBetweenLines,
      },
      // horizontal bottom
      {x1: padding,
       y1: padding + spacingBetweenLines * 2,
       x2: boardSize - padding,
       y2: padding + spacingBetweenLines * 2,
      },
    ];
  },
  xMoves: function() {
    var moves = movesDb.find({player: 'X'});
    return moves.map(getXDrawingData);
  },
  oMoves: function() {
    var moves = movesDb.find({player: 'O'});
    return moves.map(getODrawingData);
  }
});

function pixelToPosition(x, y) {
  function oneDimension(v) {
    return Math.floor((v - padding) / spacingBetweenLines);
  }
  return {
    row: oneDimension(y),
    col: oneDimension(x),
  }
}

Template.body.events({
  'click #board': function(event) {
    var position = pixelToPosition(event.offsetX, event.offsetY);
    positionClicked(position);
  },
  'click #playAgain': function(event) {
    Meteor.call('reset');
  }
})
