/*
Tic tac toe logic, AI
*/

const gameoverMoves = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20],
    [21, 22, 23], [24, 25, 26], [0, 3, 6], [1, 4, 7], [2, 5, 8], [9, 12, 15], [8, 13, 18],
    [10, 13, 16], [11, 14, 17], [18, 21, 24], [19, 22, 25], [20, 23, 26],
    [0, 4, 8], [2, 4, 6], [9, 13, 17], [11, 13, 15], [18, 22, 26], [20, 22, 24],
    [0, 9, 18], [1, 10, 19], [2, 11, 20], [3, 12, 21], [4, 13, 22], [5, 14, 23],
    [6, 15, 24], [7, 16, 25], [8, 17, 26], [0, 12, 24], [1, 13, 25], [2, 14, 26],
    [6, 12, 18], [7, 13, 19], [8, 14, 20], [0, 10, 20], [3, 13, 23], [6, 16, 26],
    [2, 10, 18], [5, 13, 21], [8, 16, 24], [0, 13, 26], [2, 13, 24], [6, 13, 20]
];

const posInf = Number.POSITIVE_INFINITY;
const negInf = Number.NEGATIVE_INFINITY;
const intelligence = 6;

const validMoves = grids => {
    let moves = [];
    let count = 0;
    // Minimax for board 2 and 3 first, because low depth
    for (let i = 9; i < 27; i++) {
        if (!grids[i].selected) {
            moves.push(i);
            count++;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (!grids[i].selected) {
            moves.push(i);
            count++;
        }
    }
    return { moves, count };
}

// Select grid
const makeMove = (grid, player) => {
    grid.selected = true;
    grid.player = player;
}

// Undo select grid
const undoMove = (grid) => {
    grid.selected = false;
    grid.player = 0;
}

// maximizer win moves - minimizer win moves
const evaluate = (grids, moveCount) => {
    let aiMoves = 0;
    let humanMoves = 0;
    if (moveCount === 0) return {_winner: 'draw', _score: aiMoves - humanMoves};
    for (const move of gameoverMoves) {
        const [ pos1, pos2, pos3 ] = move;
        const g1 = grids[pos1];
        const g2 = grids[pos2];
        const g3 = grids[pos3];
        const moveSum = g1.player + g2.player + g3.player;
        if (moveSum === 0) continue;
        if (moveSum < 0) {
            aiMoves++;
        } else if (moveSum > 0) {
            humanMoves++;
        }

        if (moveSum === 3) { // player 1 wins
            return {_winner: 'player2', _score: aiMoves - humanMoves};
        } else if (moveSum === -3) { // player -1 wins
            return {_winner: 'player1', _score: aiMoves - humanMoves};;
        }
    }
    return {_winner: null, _score: aiMoves - humanMoves};
}

// AI minimax + alpha-beta
const minimax = (grids, depth, isMaximizer, alpha, beta) => {
    const { moves, count } = validMoves(grids);
    const { _winner, _score } = evaluate(grids, count);
    if (_winner || depth === intelligence) {
        return _score;
    }

    if (isMaximizer) {
        let maxScore = negInf;
        for (const move of moves) {
            makeMove(grids[move], -1); // AI
            let score = minimax(grids, depth + 1, false, alpha, beta);
            undoMove(grids[move]);
            maxScore = score > maxScore ? score : maxScore;
            alpha = Math.max(alpha, maxScore);
            if (beta <= alpha) break;
        }
        return maxScore;
    } else {
        let minScore = posInf;
        for (const move of moves) {
            makeMove(grids[move], 1); // human
            let score = minimax(grids, depth + 1, true, alpha, beta);
            undoMove(grids[move]);
            minScore = score < minScore ? score : minScore;
            beta = Math.min(beta, minScore);
            if (beta <= alpha) break;
        }
        return minScore;
    }
}

const AImove = grids => {
    const { moves } = validMoves(grids);
    let maxScore = negInf;
    let alpha = negInf;
    let beta = posInf;
    let bestMove;
    for (const move of moves) {
        makeMove(grids[move], -1);
        let score = minimax(grids, 0, false, alpha, beta);
        undoMove(grids[move]);
        if (score > maxScore) {
            maxScore = score;
            bestMove = move;
        }
        alpha = Math.max(alpha, maxScore);
        if (beta <= alpha) break;
    }
    makeMove(grids[bestMove], -1);
    grids[bestMove].markColor = 'rgb(231, 76, 60)'; // Bright green
    playerA = false; // Human
}