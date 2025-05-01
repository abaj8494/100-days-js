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
