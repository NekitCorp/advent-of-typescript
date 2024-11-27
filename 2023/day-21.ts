import { Expect, Equal } from "../test";

/**
 * **What is Tic Tac Toe?**
 *
 * Tic-Tac-Toe is a two-player game where players alternate marking `❌`s and `⭕`s in a 3x3 grid, aiming to get three in a row.
 *
 * fun fact: Did you know that tic tac toe is widely considered to be the first computer video game ever created?! That"s right! A S Douglas implemented it all the way back in 1952, the same year as the coronation of Queen Elizabeth II.
 *
 * **Solving Tic Tac Toe**
 *
 * Your goal for this challenge is to use TypeScript types to encode the game logic of Tic Tac Toe. Eventually, every game will end with one of the players winning or a draw.
 */
type TicTacToe<
    Game extends TicTacToeGame,
    Position extends TicTacToePositions
> = Position extends `${infer Vert}-${infer Horz}`
    ? Vert extends TicTacToeYPositions
        ? Horz extends TicTacToeXPositions
            ? Game["board"][TicTacToeYPositionsIndex[Vert]][TicTacToeXPositionsIndex[Horz]] extends TicTacToeEmptyCell
                ? {
                      board: GetBoard<Game["board"], Vert, Horz, Game["state"]>;
                      state: GetState<GetBoard<Game["board"], Vert, Horz, Game["state"]>, Game["state"]>;
                  }
                : Game
            : never
        : never
    : never;

type GetBoard<
    Board extends TicTactToeBoard,
    Vert extends TicTacToeYPositions,
    Horz extends TicTacToeXPositions,
    State extends TicTacToeState
> = State extends TicTacToeChip
    ? [
          Vert extends "top" ? GetBoardLine<Board[0], Horz, State> : Board[0],
          Vert extends "middle" ? GetBoardLine<Board[1], Horz, State> : Board[1],
          Vert extends "bottom" ? GetBoardLine<Board[2], Horz, State> : Board[2]
      ]
    : Board;
type GetBoardLine<Line extends TicTacToeCell[], Horz extends TicTacToeXPositions, Chip extends TicTacToeChip> = [
    Horz extends "left" ? Chip : Line[0],
    Horz extends "center" ? Chip : Line[1],
    Horz extends "right" ? Chip : Line[2]
];

type GetState<Board extends TicTactToeBoard, State extends TicTacToeState> = State extends TicTacToeChip
    ? CheckWinBoard<Board, "❌"> extends true
        ? "❌ Won"
        : CheckWinBoard<Board, "⭕"> extends true
        ? "⭕ Won"
        : Board extends FullBoard
        ? "Draw"
        : State extends "❌"
        ? "⭕"
        : "❌"
    : State;

type CheckWinBoard<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = [Chip, Chip, Chip] extends
    | Board[0] // 1 row
    | Board[1] // 2 row
    | Board[2] // 3 row
    | [Board[0][0], Board[1][0], Board[2][0]] // 1 column
    | [Board[0][1], Board[1][1], Board[2][1]] // 2 column
    | [Board[0][2], Board[1][2], Board[2][2]] // 3 column
    | [Board[0][0], Board[1][1], Board[2][2]] // diagonal from top-left to bottom-right
    | [Board[2][0], Board[1][1], Board[0][2]] // diagonal from bottom-left to top-right
    ? true
    : false;

type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeYPositionsIndex = { top: 0; middle: 1; bottom: 2 };
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToeXPositionsIndex = { left: 0; center: 1; right: 2 };
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
    board: TicTactToeBoard;
    state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
type FullBoard = [
    [TicTacToeChip, TicTacToeChip, TicTacToeChip],
    [TicTacToeChip, TicTacToeChip, TicTacToeChip],
    [TicTacToeChip, TicTacToeChip, TicTacToeChip]
];

type NewGame = {
    board: EmptyBoard;
    state: "❌";
};

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type test_move1_actual = TicTacToe<NewGame, "top-center">;
//   ^?
type test_move1_expected = {
    board: [
        // prettier-ignore
        ["  ", "❌", "  "],
        ["  ", "  ", "  "],
        ["  ", "  ", "  "]
    ];
    state: "⭕";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, "top-left">;
//   ^?
type test_move2_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "  "],
        ["  ", "  ", "  "],
        ["  ", "  ", "  "]
    ];
    state: "❌";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, "middle-center">;
//   ^?
type test_move3_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "  "],
        ["  ", "❌", "  "],
        ["  ", "  ", "  "]
    ];
    state: "⭕";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, "bottom-left">;
//   ^?
type test_move4_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "  "],
        ["  ", "❌", "  "],
        ["⭕", "  ", "  "]
    ];
    state: "❌";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, "bottom-center">;
//   ^?
type test_x_win_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "  "],
        ["  ", "❌", "  "],
        ["⭕", "❌", "  "]
    ];
    state: "❌ Won";
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, "bottom-right">;
//   ^?
type type_move5_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "  "],
        ["  ", "❌", "  "],
        ["⭕", "  ", "❌"]
    ];
    state: "⭕";
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, "middle-left">;
//   ^?
type test_o_win_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "  "],
        ["⭕", "❌", "  "],
        ["⭕", "  ", "❌"]
    ];
    state: "⭕ Won";
};

// invalid move don"t change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, "top-center">;
//   ^?
type test_invalid_expected = {
    board: [
        // prettier-ignore
        ["  ", "❌", "  "],
        ["  ", "  ", "  "],
        ["  ", "  ", "  "]
    ];
    state: "⭕";
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "⭕"],
        ["⭕", "❌", "❌"],
        ["❌", "⭕", "  "]
    ];
    state: "⭕";
};
type test_draw_actual = TicTacToe<test_before_draw, "bottom-right">;
//   ^?
type test_draw_expected = {
    board: [
        // prettier-ignore
        ["⭕", "❌", "⭕"],
        ["⭕", "❌", "❌"],
        ["❌", "⭕", "⭕"]
    ];
    state: "Draw";
};
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
