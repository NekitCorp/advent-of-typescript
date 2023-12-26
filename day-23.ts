import { Expect, Equal } from "./test";

/**
 * **Connect 4, but in TypeScript types**
 *
 * Your goal for this challenge is to implement Connect 4 in TypeScript types.
 *
 * Each cell in the game can contain `🔴` or `🟡` or be empty ( ). You're provided with a rough layout of how to organize the board in the `EmptyBoard` type. The game state is represented by an object with a `board` property and a `state` property (which keeps track of which player is next up to play).
 *
 * **What is Connect 4**
 *
 * In case you haven't played it before: Connect 4 is a game in which the players choose a color and then take turns dropping colored tokens into a six-row, seven-column vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own tokens.
 *
 * fun fact: Connect 4 is also known as Connect Four, Four Up, Plot Four, Find Four, Captain's Mistress, Four in a Row, Drop Four, and Gravitrips in the Soviet Union
 *
 * another fun fact: Connect 4 was "solved" by James Allen and Victor Allis (independently from one another.. like two weeks apart!) in 1988. They couldn't do a full brute-force proof at the time, but 7 years later John Tromp in the Netherlands did it with a database on a Sun Microsystems and Silicon Graphics International worksations (for a combined total of 40,000 computation hours!).
 */
type Connect4<
    TGame extends Connect4Game,
    TColumn extends number,
    TRow extends number = FindRow<TGame["board"], TColumn>,
    TNewBoard extends Connect4Cell[][] = GetNewBoard<TGame["board"], TRow, TColumn, TGame["state"]>,
    TNewState extends Connect4State = GetNewState<TNewBoard, TGame["state"]>
> = {
    board: TNewBoard;
    state: TNewState;
};

// Get new board

type FindRow<TBoard extends Connect4Cell[][], TColumn extends number> = TBoard extends [
    ...infer Rest extends Connect4Cell[][],
    infer Last extends Connect4Cell[]
]
    ? Last[TColumn] extends Connect4Empty
        ? Rest["length"]
        : FindRow<Rest, TColumn>
    : -1;

type GetNewBoard<
    TBoard extends Connect4Cell[][],
    TRow extends number,
    TColumn extends number,
    TState extends Connect4State
> = TBoard extends [...infer Rest extends Connect4Cell[][], infer Last extends Connect4Cell[]]
    ? [
          ...GetNewBoard<Rest, TRow, TColumn, TState>,
          TRow extends Rest["length"] ? GetNewBoardColumn<Last, TColumn, TState> : Last
      ]
    : [];

type GetNewBoardColumn<
    TRow extends Connect4Cell[],
    TColumn extends number,
    TState extends Connect4State
> = TRow extends [...infer Rest extends Connect4Cell[], infer Last extends Connect4Cell]
    ? [
          ...GetNewBoardColumn<Rest, TColumn, TState>,
          TColumn extends Rest["length"] ? (Last extends Connect4Empty ? TState : Last) : Last
      ]
    : [];

// Get new state

type GetNewState<
    Board extends Connect4Cell[][],
    State extends Connect4State
> = CheckWinRows<Board> extends Connect4Chips
    ? `${CheckWinRows<Board>} Won`
    : CheckWinColumns<Board> extends Connect4Chips
    ? `${CheckWinColumns<Board>} Won`
    : CheckWinDiagonals<Board> extends Connect4Chips
    ? `${CheckWinDiagonals<Board>} Won`
    : CheckFullBoard<Board> extends true
    ? "Draw"
    : State extends "🔴"
    ? "🟡"
    : "🔴";

type CheckFullBoard<TBoard extends Connect4Cell[][]> = TBoard extends [
    ...infer Rest extends Connect4Cell[][],
    infer Last extends Connect4Cell[]
]
    ? Last extends FullLine<Last>
        ? CheckFullBoard<Rest>
        : false
    : true;

type FullLine<M extends Connect4Cell[]> = {
    [X in keyof M]: Connect4Chips;
};

type CheckWinRows<Board extends Connect4Cell[][]> = Board extends [
    infer FirstRow extends Connect4Cell[],
    ...infer Rest extends Connect4Cell[][]
]
    ? CheckWinArray<FirstRow> extends Connect4Chips
        ? CheckWinArray<FirstRow>
        : CheckWinRows<Rest>
    : null;

type CheckWinColumns<
    Board extends Connect4Cell[][],
    ColumnIndex extends 0[] = []
> = ColumnIndex["length"] extends Board[0]["length"]
    ? null
    : CheckWinArray<GetColumn<Board, ColumnIndex["length"]>> extends Connect4Chips
    ? CheckWinArray<GetColumn<Board, ColumnIndex["length"]>>
    : CheckWinColumns<Board, [...ColumnIndex, 0]>;

type GetColumn<
    Board extends Connect4Cell[][],
    ColumnIndex extends number,
    Column extends Connect4Cell[] = []
> = Column["length"] extends Board["length"]
    ? Column
    : GetColumn<Board, ColumnIndex, [...Column, Board[Column["length"]][ColumnIndex]]>;

type CheckWinDiagonals<TBoard extends Connect4Cell[][]> = TBoard extends [
    ...infer Rest extends Connect4Cell[][],
    infer Last4 extends Connect4Cell[],
    infer Last3 extends Connect4Cell[],
    infer Last2 extends Connect4Cell[],
    infer Last1 extends Connect4Cell[]
]
    ? CheckWinDiagonalsRows<[Last4, Last3, Last2, Last1]> extends Connect4Chips
        ? CheckWinDiagonalsRows<[Last4, Last3, Last2, Last1]>
        : CheckWinDiagonals<[...Rest, Last4, Last3, Last2]>
    : null;

type CheckWinDiagonalsRows<
    TRows extends [Connect4Cell[], Connect4Cell[], Connect4Cell[], Connect4Cell[]]
> = TRows extends [
    [
        infer Cell41 extends Connect4Cell,
        infer Cell42 extends Connect4Cell,
        infer Cell43 extends Connect4Cell,
        infer Cell44 extends Connect4Cell,
        ...infer Rest4 extends Connect4Cell[]
    ],
    [
        infer Cell31 extends Connect4Cell,
        infer Cell32 extends Connect4Cell,
        infer Cell33 extends Connect4Cell,
        infer Cell34 extends Connect4Cell,
        ...infer Rest3 extends Connect4Cell[]
    ],
    [
        infer Cell21 extends Connect4Cell,
        infer Cell22 extends Connect4Cell,
        infer Cell23 extends Connect4Cell,
        infer Cell24 extends Connect4Cell,
        ...infer Rest2 extends Connect4Cell[]
    ],
    [
        infer Cell11 extends Connect4Cell,
        infer Cell12 extends Connect4Cell,
        infer Cell13 extends Connect4Cell,
        infer Cell14 extends Connect4Cell,
        ...infer Rest1 extends Connect4Cell[]
    ]
]
    ? CheckWinArray<[Cell11, Cell22, Cell33, Cell44]> extends Connect4Chips
        ? CheckWinArray<[Cell11, Cell22, Cell33, Cell44]>
        : CheckWinDiagonalsRows<
              [
                  [Cell42, Cell43, Cell44, ...Rest4],
                  [Cell32, Cell33, Cell34, ...Rest3],
                  [Cell22, Cell23, Cell24, ...Rest2],
                  [Cell12, Cell13, Cell14, ...Rest1]
              ]
          >
    : null;

type CheckWinArray<
    Array extends Connect4Cell[],
    RedCount extends 0[] = [],
    YellowCount extends 0[] = []
> = Array extends [infer First extends Connect4Cell, ...infer Rest extends Connect4Cell[]]
    ? First extends "🔴"
        ? [...RedCount, 0]["length"] extends 4
            ? "🔴"
            : CheckWinArray<Rest, [...RedCount, 0], []>
        : First extends "🟡"
        ? [...YellowCount, 0]["length"] extends 4
            ? "🟡"
            : CheckWinArray<Rest, [], [...YellowCount, 0]>
        : null
    : null;

// Helpers

type Connect4Chips = "🔴" | "🟡";
type Connect4Empty = "  ";
type Connect4Cell = Connect4Chips | Connect4Empty;
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";
type Connect4Game = {
    board: Connect4Cell[][];
    state: Connect4State;
};

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type EmptyBoard = [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type NewGame = {
    board: EmptyBoard;
    state: "🟡";
};

type test_move1_actual = Connect4<NewGame, 0>;
//   ^?
type test_move1_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
    ];
    state: "🔴";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
    ];
    state: "🟡";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
    ];
    state: "🔴";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "🔴", "  ", "  ", "  ", "  ", "  "]
    ];
    state: "🟡";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "]
    ];
    state: "🔴";
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "🔴", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "]
    ];
    state: "🟡";
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
    {
        board: [
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
            ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
            ["🔴", "🔴", "🔴", "  ", "  ", "  ", "  "],
            ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
        ];
        state: "🔴";
    },
    3
>;

type test_red_win_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "🔴", "🔴", "🔴", "  ", "  ", "  "],
        ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🔴 Won";
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
    {
        board: [
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
            ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
            ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
            ["🟡", "  ", "🟡", "🟡", "  ", "  ", "  "]
        ];
        state: "🟡";
    },
    1
>;

type test_yellow_win_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
        ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
        ["🟡", "🟡", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🟡 Won";
};

type test_yellow_win = Expect<Equal<test_yellow_win_actual, test_yellow_win_expected>>;

type test_diagonal_yellow_win_actual = Connect4<
    {
        board: [
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
            ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
            ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
            ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
        ];
        state: "🟡";
    },
    3
>;

type test_diagonal_yellow_win_expected = {
    board: [
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "🟡", "  ", "  ", "  "],
        ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
        ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
        ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🟡 Won";
};

type test_diagonal_yellow_win = Expect<
    Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>
>;

type test_draw_actual = Connect4<
    {
        board: [
            ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "  "],
            ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
            ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
            ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
            ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
            ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"]
        ];
        state: "🟡";
    },
    6
>;

type test_draw_expected = {
    board: [
        ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
        ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
        ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
        ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
        ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
        ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"]
    ];
    state: "Draw";
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
