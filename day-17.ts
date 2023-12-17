import { Expect, Equal } from "./test";

/**
 * **Rock, Paper, Scissors**
 *
 * It's Sunday and there's one week to go before the big day (Christmas Eve) when the elfs' work for the year will finally be complete. For the last 20 years the only game the elves have had to play together is StarCraft. They're looking for a fresh game to play.
 *
 * So, they get the idea to try a Rock, Paper, Scissors tournament.
 *
 * But the elves are sorta nerdy so they want to accomplish this using TypeScript types. The `WhoWins` should type to correctly determine the winner in a Rock-Paper-Scissors game. The first argument is the opponent and the second argument is you!
 *
 * **What's Rock, Paper, Scissors?**
 *
 * In case you haven't played it before, basically:
 * - it's a two player game where each player picks one of three options: Rock (👊🏻), Paper (🖐🏾), and Scissors (✌🏽)
 * - game rules:
 *      - Rock crushes Scissors (Rock wins)
 *      - Scissors cuts Paper (Scissors wins)
 *      - Paper covers Rock (Paper wins)
 *      - otherwise, a draw
 */
// prettier-ignore
type WhoWins<
	T1 extends RockPaperScissors,
	T2 extends RockPaperScissors
> = 
	  T1 extends '👊🏻' ? T2 extends '👊🏻' ? 'draw' : T2 extends '🖐🏾' ? 'win' : 'lose'
	: T1 extends '🖐🏾' ? T2 extends '🖐🏾' ? 'draw' : T2 extends '✌🏽' ? 'win' : 'lose'
	: T1 extends '✌🏽' ? T2 extends '✌🏽' ? 'draw' : T2 extends '👊🏻' ? 'win' : 'lose'
	: never;

type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type test_0_actual = WhoWins<"👊🏻", "🖐🏾">;
//   ^?
type test_0_expected = "win";
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = WhoWins<"👊🏻", "✌🏽">;
//   ^?
type test_1_expected = "lose";
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = WhoWins<"👊🏻", "👊🏻">;
//   ^?
type test_2_expected = "draw";
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type test_3_actual = WhoWins<"🖐🏾", "👊🏻">;
//   ^?
type test_3_expected = "lose";
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type test_4_actual = WhoWins<"🖐🏾", "✌🏽">;
//   ^?
type test_4_expected = "win";
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;

type test_5_actual = WhoWins<"🖐🏾", "🖐🏾">;
//   ^?
type test_5_expected = "draw";
type test_5 = Expect<Equal<test_5_expected, test_5_actual>>;

type test_6_actual = WhoWins<"✌🏽", "👊🏻">;
//   ^?
type test_6_expected = "win";
type test_6 = Expect<Equal<test_6_expected, test_6_actual>>;

type test_7_actual = WhoWins<"✌🏽", "✌🏽">;
//   ^?
type test_7_expected = "draw";
type test_7 = Expect<Equal<test_7_expected, test_7_actual>>;

type test_8_actual = WhoWins<"✌🏽", "🖐🏾">;
//   ^?
type test_8_expected = "lose";
type test_8 = Expect<Equal<test_8_expected, test_8_actual>>;
