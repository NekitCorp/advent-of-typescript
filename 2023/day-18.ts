import { Expect, Equal } from "../test";

/**
 * **Santa's Remaining Deliveries**
 *
 * Santa needs your help to count the number of presents he has to deliver! He's got all kinds of presents, from video game consoles (🎮), stuffed animals (🧸), toy cars (🏎️), books (📚), and more!
 *
 * We need a general purpose type that can take a tuple of items as its first arguemnt and an item to search for as the second argument. It should return a count of the item specified.
 *
 * For example:
 *
 * ```ts
 * Count<['👟', '👟', '💻', '🎸', '🧩', '👟', '🧸'], '👟'>;
 * ```
 *
 * should return 3 because there are three 👟.
 */
type Count<
    A extends string[],
    T extends string,
    I extends number[] = [],
    C extends number[] = []
> = I["length"] extends A["length"]
    ? C["length"]
    : A[I["length"]] extends T
    ? Count<A, T, [...I, 0], [...C, 0]>
    : Count<A, T, [...I, 0], C>;

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

// prettier-ignore
type ToySack = [
	'🎸', '🎧', '👟', '👟', '💻', '🪀', '🧩', '🎮',
	'🎨', '🕹️', '📱', '🧩', '🧸', '🎧', '👟', '🚲',
	'📚', '⌚', '🎨', '👟', '🎸', '🧸', '👟', '🎸',
	'📱', '🎧', '🎮', '🎒', '📱', '🧩', '🧩', '🚲',
	'🕹️', '🧵', '📱', '🕹️', '🕰️', '🧢', '🕹️', '👟',
	'🧸', '📚', '🧁', '🧩', '🎸', '🎮', '🧁', '📚',
	'💻', '⌚', '🛹', '🧁', '🧣', '🪁', '🎸', '🧸',
	'🧸', '🧸', '🧩', '🪁', '🏎️', '🏎️', '🧁', '📚',
	'🧸', '🕶️', '💻', '⌚', '⌚', '🕶️', '🎧', '🎧',
	'🎧', '💻', '👟', '🎸', '💻', '🪐', '📚', '🎨',
	'📱', '🎧', '📱', '🎸', '🏎️', '👟', '🚲', '📱',
	'🚲', '🎸'
];

type test_0_actual = Count<ToySack, "👟">;
//   ^?
type test_0_expected = 8;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Count<ToySack, "🧦">;
//   ^?
type test_1_expected = 0;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Count<ToySack, "🧩">;
//   ^?
type test_2_expected = 6;
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type test_3_actual = Count<ToySack, "🛹">;
//   ^?
type test_3_expected = 1;
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type test_4_actual = Count<ToySack, "🏎️">;
//   ^?
type test_4_expected = 3;
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;

type test_5_actual = Count<ToySack, "📚">;
//   ^?
type test_5_expected = 5;
type test_5 = Expect<Equal<test_5_expected, test_5_actual>>;
