$(function() {
    init();
    console.log("Main init Called");
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

function init() {
    initFilesRanksBrd();
    console.log("init() called")
}
