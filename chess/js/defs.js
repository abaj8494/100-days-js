const PIECES = {
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
    RANK_1:    0,
    RANK_2:    1,
    RANK_3:    2,
    RANK_4:    3,
    RANK_5:    4,
    RANK_6:    5,
    RANK_7:    6,
    RANK_8:    7,
    RANK_NONE: 8
}

const COLOURS = {
    WHITE: 0,
    BLACK: 1,
    BOTH:  2
}

const CASTLEBIT = {
    WKCA: 1,
    WQCA: 2,
    BKCA: 4,
    BQCA: 8,
}

const SQUARES = {
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

const FilesBrd = new Array(BRD_SQ_NUM);
const RanksBrd = new Array(BRD_SQ_NUM);

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const pceChar = ".PNBRQKpnbrqk";
const sideChar = "wb-";
const rankChar = "12345678";
const fileChar = "abcdefgh";

function FR2SQ(f, r) { // file rank to square
    return ((21 + (f)) + ((r)*10));
}


// copy-pasted these defs :'(
const PieceBig = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
const PieceMaj = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE ];
const PieceMin = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
const PieceVal= [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000  ];
const PieceCol = [ COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE,
	COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK ];
	
const PiecePawn = [ BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];	
const PieceKnight = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
const PieceKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE ];
const PieceRookQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];
const PieceBishopQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE ];
const PieceSlides = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];

const KnDir = [ -8, -19, -21, -12, 8, 19, 21, 12 ];
const RkDir = [ -1, -10, 1, 10]; // queen is rook + bishop
const BiDir = [ -9, -11, 11, 9];
const KiDir = [ -1, -10, 1, 10, -9, -11, 11, 9 ];


const PieceKeys = new Array(14 * 120);
let sideKey;
const CastleKeys = new Array(16);

const Sq120ToSq64 = new Array(BRD_SQ_NUM);
const Sq64ToSq120 = new Array(64);

const MAXGAMEMOVES = 2048;
const MAXPOSITIONMOVES = 256;
const MAXDEPTH = 64;

function RAND_32() {
    return (
        (Math.floor(Math.random() * 256) << 24) |
        (Math.floor(Math.random() * 256) << 16) |
        (Math.floor(Math.random() * 256) << 8) |
        Math.floor(Math.random() * 256)
    ) >>> 0;
}

function SQ64(sq120) {
    return Sq120ToSq64[(sq120)];
}

function SQ120(sq64) {
    return Sq64ToSq120[(sq64)];
}


function PCEINDEX(pce, pceNum) {
    return (pce * 10 + pceNum);
}

/*
0000 0000 0000 0000 0000 0000 0111 1111  -> from 0x7F
0000 0000 0000 0000 0011 1111 1000 0000  -> to >> 7, 0x7F
0000 0000 0000 0011 1100 0000 0000 0000  -> captured >> 14, 0xF
0000 0000 0000 0100 0000 0000 0000 0000  -> EP 0x40000
0000 0000 0000 1000 0000 0000 0000 0000  -> pawn start 0x80000
0000 0000 1111 0000 0000 0000 0000 0000  -> promoted piece >> 20, 0xF
0000 0001 0000 0000 0000 0000 0000 0000  -> castle 0x1000000
*/


function FROMSQ(m) {return (m & 0x7F);}
function TOSQ(m) {return ((m >> 7) & 0x7F);}
function CAPTURED(m) {return ((m >> 14) & 0xF);}
function PROMOTED(m) {return ((m >> 20) & 0xF);}

const MFLAGEP = 0x40000;
const MFLAGPS = 0x80000;
const MFLAGCA = 0x100000;

const MFLAGCAP = 0x7C000;
const MFLAGPROM = 0xF00000;

const NOMOVE = 0;


