$(function() {
    init();
    console.log("Main init Called");
    parseFen(START_FEN);
    printBoard();
});

function initFilesRanksBrd() {
    let file = FILES.FILE_A;
    let rank = RANKS.RANK_1;
    let sq = SQUARES.A1;

    for (let i = 0; i < BRD_SQ_NUM; ++i) {
        FilesBrd[i] = SQUARES.OFFBOARD;
        RanksBrd[i] = SQUARES.OFFBOARD;
    }

    for(rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for(file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = FR2SQ(file,rank);
            FilesBrd[sq] = file;
            RanksBrd[sq] = rank;
        }
    }
    console.log("FilesBrd[0]:" + FilesBrd[0] + " RanksBrd[0]" + RanksBrd[0]);
    console.log("FilesBrd[SQUARES.A1]:" + FilesBrd[SQUARES.A1] + " RanksBrd[SQUARES.A1]" + RanksBrd[SQUARES.A1]);
    console.log("FilesBrd[SQUARES.E8]:" + FilesBrd[SQUARES.E8] + " RanksBrd[SQUARES.E8]" + RanksBrd[SQUARES.E8]);
    console.table(FilesBrd);
    console.table(RanksBrd);
}

function initHashKeys() {
    for (let i = 0; i < 14 * 120; ++i) {
        PieceKeys[i] = RAND_32();
    }

    sideKey = RAND_32();

    for (let i = 0; i < 16; ++i) {
        CastleKeys[i] = RAND_32();
    }

    console.log("inithashkeys called");
}

// convenience function so that we can loop over only the playable board
function initSq120To64() {
    let sq = SQUARES.A1;
    let sq64 = 0;

    for(let i = 0; i < BRD_SQ_NUM; ++i) {
        Sq120ToSq64[i] = 65;
    }

    for(let i = 0; i < 64; ++i) {
        Sq64ToSq120[i] = 120;
    }

    for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (let file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = FR2SQ(file, rank);
            Sq64ToSq120[sq64] = sq;
            Sq120ToSq64[sq] = sq64;
            sq64++;
        }
    }
}

function init() {
    console.log("init() called");
    initFilesRanksBrd();
    initHashKeys();
    initSq120To64();
}
