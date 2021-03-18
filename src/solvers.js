/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



// Helper function to find N Rooks
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var findRookSolution = function(board, startRow, rows, cb) {
  // reached the end of the board
  if (startRow === rows) {
    return cb(board);
  }

  for (var i = 0; i < rows; i++) {
    // place piece, (rowIndex, colIndex)
    board.togglePiece(startRow, i);
    // check for collisions in rows and columns
    // hasAnyRooksConflicts() = this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    if (!board.hasAnyRooksConflicts()) {
      // if no conflict, iterate through the board
      var result = findRookSolution(board, startRow + 1, rows, cb);
      return result;
    }
    // unplace the piece if conflict.
    board.togglePiece(startRow, i);
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();

  // findRookSolution(board, 0, n, function(board) {
  //   return solution = board.rows();
  // });
  // refactor to ES6
  findRookSolution(board, 0, n, (board) => solution = board.rows());

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  // increment solutionCount after each valid solution

  // TODO: Need to improve run time for this.
  // Previous runtime -> Exceed 2000ms
  // Current runtime -> ~400ms
  var countValid = function(row = 0) {
    // reached the end of board
    if (row === n) {
      solutionCount++;
    } else {
      for (let col = 0; col < n; col++) {
        // place piece, (rowIndex, colIndex)
        board.togglePiece(row, col);
        // check for collisions in rows and columns
        // hasAnyRooksConflicts() = this.hasAnyRowConflicts() || this.hasAnyColConflicts();
        if (!board.hasColConflictAt(col)) {
          countValid(row + 1);
        }
        // unplace the piece if conflict.
        board.togglePiece(row, col);
      }
    }
  };
  countValid();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
var findQueenSolution = function(board, startRow, rows, cb) {
  // reached the end of the board
  if (startRow === rows) {
    return cb(board);
  }

  for (var i = 0; i < rows; i++) {
    // place piece, (rowIndex, colIndex)
    board.togglePiece(startRow, i);
    if (!board.hasAnyQueensConflicts()) {
      // if no conflict, iterate through the board
      var result = findQueenSolution(board, startRow + 1, rows, cb);
      if (result) {
        return result;
      }
    }
    // unplace the piece if conflict.
    board.togglePiece(startRow, i);
  }
};

window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();

  findQueenSolution(board, 0, n, (board) => solution = board.rows());

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  findQueenSolution(board, 0, n, function(board) {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
