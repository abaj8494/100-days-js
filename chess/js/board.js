function PCEINDEX(pce, pceNum) {
    return (pce * 10 + pceNum);
}

let gameBoard = {};

gameBoard.pieces = new Array(BRD_SQ_NUM);
gameBoard.side = COLOURS.white;
gameBoard.fiftyMove = 0;
gameBoard.hisPly = 0;
gameBoard.ply = 0;
gameBoard.enPas = 0;
gameBoard.castlePerm = 0; // something about bits

gameBoard.material = new Array(2);

// we shouldn't check moves for all the empty squares
// so we finesse with data structures:
gameBoard.pceNum = new Array(13);
gameBoard.pList = new Array(14 * 10);
gameBoard.posKey = 0;

gameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
gameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
gameBoard.moveListStart = new Array(MAXDEPTH);

function generatePosKey() {
    let finalKey = 0;
    let piece = PIECES.EMPTY;

    for (let sq = 0; sq < BRD_SQ_NUM; ++sq) {
        piece = gameBoard.pieces[sq];
        if(piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD) {
            finalKey ^= PieceKeys[(piece * 120) + sq];
        }
    }

    if (gameBoard.side === COLOURS.WHITE) {
        finalKey ^= sideKey;
    }

    if (gameBoard.enPas != SQUARES.NO_SQ) {
        finalKey ^= PieceKeys[gameBoard.enPas];
    }

    finalKey ^= CastleKeys[gameBoard.castlePerm];
    return finalKey;
}


function resetBoard() {
    for (let i = 0; i < BRD_SQ_NUM; ++i) {
        gameBoard.pieces[i] = SQUARES.OFFBOARD;
    }

    for (let i = 0; i < 64; ++i) {
        gameBoard.pieces[SQ120(i)] = PIECES.EMPTY;
    }

    for (let i = 0; i < 14 * 120; ++i) { // think the length might need to be 14 * 10.
        gameBoard.pList[i] = PIECES.EMPTY;
    }

    for (let i = 0; i < 2; ++i) {
        gameBoard.material[i] = 0;
    }

    for (let i = 0; i < 13; ++i) {
        gameBoard.pceNum[i] = 0;
    }

    gameBoard.side = COLOURS.BOTH;
    gameBoard.enPas = SQUARES.NO_SQ;
    gameBoard.fiftyMove = 0;
    gameBoard.ply = 0;
    gameBoard.hisPly = 0;
    gameBoard.castlePerm = 0;
    gameBoard.posKey = 0;
    gameBoard.moveListStart[gameBoard.ply] = 0;
}

function parseFEN(fen) {
    resetBoard();


}
