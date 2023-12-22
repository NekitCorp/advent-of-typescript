import { Expect, Equal } from "./test";

/**
 * **Reindeer Sudoku**
 *
 * Santa's reindeer sure do like to cause trouble! This time they've decided to make a game out of arranging themselves into a Sudoku board.
 *
 * Before arranging themselves in this configuration, the reindeer left Santa a foreboding message:
 *
 * SaNtA.... yOu MuSt ImPleMeNt ThE `Validate` TyPe To DeTerMinE WhEThEr OuR SuDokU ConFiGuRaTiOn Is vALid
 *
 * Oh.. and what's that... also Vixen seems to have left a separate note
 *
 * make sure `Validate` is a predicate
 * - Vixen
 *
 * Well that's sorta condescending. Vixen seems to be assuming we already know that a "predicate" is just a fancy computer science term for a function that returns `true` or `false`. Oh well. That's Vixen for you.
 *
 * **What is Sudoku**
 *
 * If you're not already familiar: Sudoku is a logic-based number placement puzzle. Here are the basic rules:
 * - Grid Structure: The game is played on a 9x9 grid, divided into nine 3x3 subgrids or "regions."
 * - Number Placement: The objective is to fill the grid with numbers from 1 to 9.
 * - Row Constraint: Every row must contain each number from 1 to 9 without repeating.
 * - Column Constraint: Every column must also contain each number from 1 to 9 without repeating.
 * - Region Constraint: Each of the nine 3x3 regions must contain each number from 1 to 9, again without repetition.
 *
 * Normally you solve the puzzle by logically deducing the numbers for the empty cells, ensuring that all rows, columns, and 3x3 regions have numbers from 1 to 9 according to the rules. However, in this case the cells are all already filled in and your mission is to instead determine whether the configuration follows the rules of Sudoku.
 */
type Validate<Grid extends Reindeer[][][]> = false extends
    | ValidateRow<Grid, 0>
    | ValidateRow<Grid, 1>
    | ValidateRow<Grid, 2>
    | ValidateRow<Grid, 3>
    | ValidateRow<Grid, 4>
    | ValidateRow<Grid, 5>
    | ValidateRow<Grid, 6>
    | ValidateRow<Grid, 7>
    | ValidateRow<Grid, 8>
    | ValidateColumn<Grid, 0>
    | ValidateColumn<Grid, 1>
    | ValidateColumn<Grid, 2>
    | ValidateColumn<Grid, 3>
    | ValidateColumn<Grid, 4>
    | ValidateColumn<Grid, 5>
    | ValidateColumn<Grid, 6>
    | ValidateColumn<Grid, 7>
    | ValidateColumn<Grid, 8>
    | ValidateSubgrid<Grid, 0>
    | ValidateSubgrid<Grid, 1>
    | ValidateSubgrid<Grid, 2>
    | ValidateSubgrid<Grid, 3>
    | ValidateSubgrid<Grid, 4>
    | ValidateSubgrid<Grid, 5>
    | ValidateSubgrid<Grid, 6>
    | ValidateSubgrid<Grid, 7>
    | ValidateSubgrid<Grid, 8>
    ? false
    : true;

// Rows

type ValidateRow<Grid extends Reindeer[][][], RowIndex extends number> = ValidateArray<
    GetRow<Grid, RowIndex>
>;

type GetRow<Grid extends Reindeer[][][], RowIndex extends number> = [
    ...Grid[RowIndex][0],
    ...Grid[RowIndex][1],
    ...Grid[RowIndex][2]
];

// Columns

type ValidateColumn<Grid extends Reindeer[][][], ColumnIndex extends number> = ValidateArray<
    GetColumn<Grid, ColumnIndex>
>;

type GetColumn<Grid extends Reindeer[][][], ColumnIndex extends number> = [
    GetRow<Grid, 0>[ColumnIndex],
    GetRow<Grid, 1>[ColumnIndex],
    GetRow<Grid, 2>[ColumnIndex],
    GetRow<Grid, 3>[ColumnIndex],
    GetRow<Grid, 4>[ColumnIndex],
    GetRow<Grid, 5>[ColumnIndex],
    GetRow<Grid, 6>[ColumnIndex],
    GetRow<Grid, 7>[ColumnIndex],
    GetRow<Grid, 8>[ColumnIndex]
];

// Subgrids

type ValidateSubgrid<Grid extends Reindeer[][][], SubgridIndex extends number> = ValidateArray<
    GetSubgrid<Grid, SubgridIndex>
>;

type GetSubgrid<Grid extends Reindeer[][][], SubgridIndex extends number> = [
    ...Grid[SubGridRowIndex[SubgridIndex]][SubGridColumnIndex[SubgridIndex]],
    ...Grid[AddOne[SubGridRowIndex[SubgridIndex]]][SubGridColumnIndex[SubgridIndex]],
    ...Grid[AddTwo[SubGridRowIndex[SubgridIndex]]][SubGridColumnIndex[SubgridIndex]]
];

// Util types

type AddOne = [1, 2, 3, 4, 5, 6, 7, 8];
type AddTwo = [2, 3, 4, 5, 6, 7, 8];
type SubGridRowIndex = [0, 0, 0, 3, 3, 3, 6, 6, 6];
type SubGridColumnIndex = [0, 1, 2, 0, 1, 2, 0, 1, 2];
type ValidateArray<Array extends Reindeer[]> = Reindeer extends Array[number] ? true : false;

/** because "dashing" implies speed */
type Dasher = "💨";
/** representing dancing or grace */
type Dancer = "💃";
/** a deer, prancing */
type Prancer = "🦌";
/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";
/** for the celestial body that shares its name */
type Comet = "☄️";
/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";
/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";
/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";
/** for his famous red nose */
type Rudolph = "🔴";
type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type test_sudoku_1_actual = Validate<
    [
        [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
        [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
        [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
        [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
        [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
        [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
        [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
        [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
        [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
    ]
>;
type test_sudoku_1 = Expect<Equal<test_sudoku_1_actual, true>>;

type test_sudoku_2_actual = Validate<
    [
        [["🌩️", "💨", "☄️"], ["🌟", "🦌", "⚡"], ["❤️", "🔴", "💃"]],
        [["🌟", "⚡", "❤️"], ["🔴", "💃", "☄️"], ["🌩️", "💨", "🦌"]],
        [["🔴", "🦌", "💃"], ["💨", "❤️", "🌩️"], ["🌟", "⚡", "☄️"]],
        [["❤️", "☄️", "🌩️"], ["💃", "⚡", "🔴"], ["💨", "🦌", "🌟"]],
        [["🦌", "💃", "⚡"], ["🌩️", "🌟", "💨"], ["🔴", "☄️", "❤️"]],
        [["💨", "🌟", "🔴"], ["🦌", "☄️", "❤️"], ["⚡", "💃", "🌩️"]],
        [["☄️", "🔴", "💨"], ["❤️", "🌩️", "🦌"], ["💃", "🌟", "⚡"]],
        [["💃", "❤️", "🦌"], ["⚡", "🔴", "🌟"], ["☄️", "🌩️", "💨"]],
        [["⚡", "🌩️", "🌟"], ["☄️", "💨", "💃"], ["🦌", "❤️", "🔴"]]
    ]
>;
type test_sudoku_2 = Expect<Equal<test_sudoku_2_actual, true>>;

type test_sudoku_3_actual = Validate<
    [
        [["🦌", "🔴", "💃"], ["🌩️", "☄️", "💨"], ["⚡", "❤️", "🌟"]],
        [["🌟", "⚡", "💨"], ["❤️", "💃", "🔴"], ["☄️", "🌩️", "🦌"]],
        [["☄️", "🌩️", "❤️"], ["⚡", "🌟", "🦌"], ["💃", "🔴", "💨"]],
        [["🌩️", "💃", "🔴"], ["🦌", "💨", "⚡"], ["🌟", "☄️", "❤️"]],
        [["❤️", "☄️", "⚡"], ["💃", "🌩️", "🌟"], ["🦌", "💨", "🔴"]],
        [["💨", "🌟", "🦌"], ["☄️", "🔴", "❤️"], ["🌩️", "💃", "⚡"]],
        [["💃", "💨", "🌟"], ["🔴", "🦌", "☄️"], ["❤️", "⚡", "🌩️"]],
        [["🔴", "❤️", "☄️"], ["🌟", "⚡", "🌩️"], ["💨", "🦌", "💃"]],
        [["⚡", "🦌", "🌩️"], ["💨", "❤️", "💃"], ["🔴", "🌟", "☄️"]]
    ]
>;
type test_sudoku_3 = Expect<Equal<test_sudoku_3_actual, true>>;

type test_sudoku_4_actual = Validate<
    [
        [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
        [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
        [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
        [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
        [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
        [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
        [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["⚡", "🔴", "🌟"]],
        [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
        [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
    ]
>;
type test_sudoku_4 = Expect<Equal<test_sudoku_4_actual, false>>;

type test_sudoku_5_actual = Validate<
    [
        [["🌩️", "💨", "☄️"], ["🌟", "🦌", "⚡"], ["❤️", "🔴", "💃"]],
        [["🌟", "⚡", "❤️"], ["🔴", "💃", "☄️"], ["🌩️", "💨", "🦌"]],
        [["🔴", "🦌", "💃"], ["💨", "❤️", "🌩️"], ["🌟", "⚡", "☄️"]],
        [["❤️", "☄️", "🌩️"], ["💃", "⚡", "🔴"], ["💨", "🦌", "🌟"]],
        [["🦌", "💃", "⚡"], ["🌩️", "🌟", "💨"], ["🔴", "☄️", "❤️"]],
        [["💨", "🌟", "🔴"], ["🦌", "☄️", "❤️"], ["⚡", "💃", "🌩️"]],
        [["☄️", "🔴", "💨"], ["❤️", "💃", "🦌"], ["💃", "🌟", "⚡"]],
        [["💃", "❤️", "🦌"], ["⚡", "🔴", "🌟"], ["☄️", "🌩️", "💨"]],
        [["⚡", "🌩️", "🌟"], ["☄️", "💨", "💃"], ["🦌", "❤️", "🔴"]]
    ]
>;
type test_sudoku_5 = Expect<Equal<test_sudoku_5_actual, false>>;

type test_sudoku_6_actual = Validate<
    [
        [["⚡", "🔴", "🌩️"], ["🦌", "❤️", "💨"], ["💨", "🌟", "☄️"]],
        [["❤️", "🦌", "🌟"], ["💨", "🌟", "🔴"], ["💃", "⚡", "🌩️"]],
        [["💨", "💃", "🌟"], ["☄️", "⚡", "🌩️"], ["🔴", "❤️", "🦌"]],
        [["🦌", "⚡", "🔴"], ["❤️", "💃", "💨"], ["☄️", "🌩️", "🌟"]],
        [["🌟", "🌩️", "💃"], ["⚡", "🔴", "☄️"], ["❤️", "🦌", "💨"]],
        [["☄️", "💨", "❤️"], ["🌟", "🌩️", "🦌"], ["⚡", "💃", "🔴"]],
        [["🌩️", "☄️", "💨"], ["💃", "🦌", "⚡"], ["🌟", "🔴", "❤️"]],
        [["🔴", "❤️", "⚡"], ["🌩️", "☄️", "🌟"], ["🦌", "💨", "💃"]],
        [["💃", "🌟", "🦌"], ["🔴", "💨", "❤️"], ["🌩️", "☄️", "⚡"]]
    ]
>;
type test_sudoku_6 = Expect<Equal<test_sudoku_6_actual, false>>;
