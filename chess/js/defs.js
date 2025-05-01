const pieces = {
    EMPTY:  0,
    wP:     1, // white Pawn
    wN:     2, // white Knight
    wB:     3, // white Bishop
    wR:     4, // white Rook
    wQ:     5, // white Queen
    wK:     6, // white King
    bP:     7,
    bN:     8,
    bB:     9,
    bR:    10,
    bQ:    11,
    bK:    12,
}

const BRD_SQ_NUM = 120;

const FILES = {
    FILE_A:    0,
    FILE_B:    1,
    FILE_C:    2,
    FILE_D:    3,
    FILE_E:    4,
    FILE_F:    5,
    FILE_G:    6,
    FILE_H:    7,
    FILE_NONE: 8
}

const RANKS = {
    RANK_A:    0,
    RANK_B:    1,
    RANK_C:    2,
    RANK_D:    3,
    RANK_E:    4,
    RANK_F:    5,
    RANK_G:    6,
    RANK_H:    7,
    RANK_NONE: 8
}

const COLOURS = {
    WHITE: 0,
    BLACK: 1,
    BOTH:  2
}

const squares = {
    A1:       21,      
    B1:       22,
    C1:       23,
    D1:       24,
    E1:       25,
    F1:       26,
    G1:       27,
    H1:       28,
    A8:       91,
    B8:       92,
    C8:       93,
    D8:       94,
    E8:       95,
    F8:       96,
    G8:       97,
    H8:       98,
    NO_SQ:    99,
    OFFBOARD: 100
}

const BOOL = {
    FALSE: 0,
    TRUE:  1
}
