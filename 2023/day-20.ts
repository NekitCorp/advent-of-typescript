import { Expect, Equal } from "../test";

/**
 * **TypeScript ASCII Art!**
 *
 * Your goal for this challenge is to take an input like Hi and turn it into ASCII art!
 *
 * So for example Hi would turn into:
 *
 * ```
 * █ █ █
 * █▀█ █
 * ▀ ▀ █
 * ```
 * **but there's a twist!**
 *
 * You'll also need to handle newlines! Take a look at the tests to see some examples of that in action.
 *
 * Enjoy!
 *
 * ---
 *
 * ...wait
 *
 * ....what's that.....
 *
 * **!! BREAKING NEWS JUST-IN FROM THE TYPEHERO INVESTIGATIVE REPORTING TEAM !!**
 *
 * We have just received word that the term "ASCII art" is commonly used to refer to text-based visual art in general. That means that although characters are not part of the ISO-8859-1 character encoding set, it's still ASCII art! We also just received word that pencil lead has actually been made of graphite since the 16th century but we all still call it "lead" even though it's not made from the 82nd atomic element, lead(!!). News, Sports, and Weather at 11. Back to you Carol.
 */
type ToAsciiArt<S extends string> = ToAsciiArtUppercase<Uppercase<S>>;

type ToAsciiArtUppercase<S extends string, R extends string[] = ["", "", ""]> = S extends `${infer First}${infer Rest}`
    ? First extends keyof Letters
        ? ToAsciiArtUppercase<Rest, AddLetter<R, Letters[First]>>
        : First extends "\n"
        ? [...R, ...ToAsciiArtUppercase<Rest>]
        : never
    : R;

type AddLetter<R extends string[], L extends string[]> = [`${R[0]}${L[0]}`, `${R[1]}${L[1]}`, `${R[2]}${L[2]}`];

// prettier-ignore
type Letters = {
	A: [
		"█▀█ ",
		"█▀█ ",
		"▀ ▀ ",
	];
	B: [
		"█▀▄ ",
		"█▀▄ ",
		"▀▀  ",
	];
	C: [
		"█▀▀ ",
		"█ ░░",
		"▀▀▀ ",
	];
	E: [
		"█▀▀ ",
		"█▀▀ ",
		"▀▀▀ ",
	];
	H: [
		"█ █ ",
		"█▀█ ",
		"▀ ▀ ",
	];
	I: [
		"█ ",
		"█ ",
		"▀ ",
	];
	M: [
		"█▄░▄█ ",
		"█ ▀ █ ",
		"▀ ░░▀ ",
	];
	N: [
		"█▄░█ ",
		"█ ▀█ ",
		"▀ ░▀ ",
	];
	P: [
		"█▀█ ",
		"█▀▀ ",
		"▀ ░░",
	];
	R: [
		"█▀█ ",
		"██▀ ",
		"▀ ▀ ",
	];
	S: [
		"█▀▀ ",
		"▀▀█ ",
		"▀▀▀ ",
	];
	T: [
		"▀█▀ ",
		"░█ ░",
		"░▀ ░",
	];
	Y: [
		"█ █ ",
		"▀█▀ ",
		"░▀ ░",
	];
	W: [
		"█ ░░█ ",
		"█▄▀▄█ ",
		"▀ ░ ▀ ",
	];
	" ": [
		"░",
		"░",
		"░",
	];
	":": [
		"#",
		"░",
		"#",
	];
	"*": [
		"░",
		"#",
		"░",
	];
};

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type test_0_actual = ToAsciiArt<"   * : * Merry * : *   \n  Christmas  ">;
//   ^?
type test_0_expected = [
    "░░░░░#░░░█▄░▄█ █▀▀ █▀█ █▀█ █ █ ░░░#░░░░░",
    "░░░#░░░#░█ ▀ █ █▀▀ ██▀ ██▀ ▀█▀ ░#░░░#░░░",
    "░░░░░#░░░▀ ░░▀ ▀▀▀ ▀ ▀ ▀ ▀ ░▀ ░░░░#░░░░░",
    "░░█▀▀ █ █ █▀█ █ █▀▀ ▀█▀ █▄░▄█ █▀█ █▀▀ ░░",
    "░░█ ░░█▀█ ██▀ █ ▀▀█ ░█ ░█ ▀ █ █▀█ ▀▀█ ░░",
    "░░▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ░▀ ░▀ ░░▀ ▀ ▀ ▀▀▀ ░░"
];
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;

type test_1_actual = ToAsciiArt<"  Happy new  \n  * : * : * Year * : * : *  ">;
//   ^?
type test_1_expected = [
    "░░█ █ █▀█ █▀█ █▀█ █ █ ░█▄░█ █▀▀ █ ░░█ ░░",
    "░░█▀█ █▀█ █▀▀ █▀▀ ▀█▀ ░█ ▀█ █▀▀ █▄▀▄█ ░░",
    "░░▀ ▀ ▀ ▀ ▀ ░░▀ ░░░▀ ░░▀ ░▀ ▀▀▀ ▀ ░ ▀ ░░",
    "░░░░#░░░#░░░█ █ █▀▀ █▀█ █▀█ ░░░#░░░#░░░░",
    "░░#░░░#░░░#░▀█▀ █▀▀ █▀█ ██▀ ░#░░░#░░░#░░",
    "░░░░#░░░#░░░░▀ ░▀▀▀ ▀ ▀ ▀ ▀ ░░░#░░░#░░░░"
];
type test_1 = Expect<Equal<test_1_actual, test_1_expected>>;

type test_2_actual = ToAsciiArt<"  * : * : * : * : * : * \n  Trash  \n  * : * : * : * : * : * ">;
//   ^?
type test_2_expected = [
    "░░░░#░░░#░░░#░░░#░░░#░░░",
    "░░#░░░#░░░#░░░#░░░#░░░#░",
    "░░░░#░░░#░░░#░░░#░░░#░░░",
    "░░▀█▀ █▀█ █▀█ █▀▀ █ █ ░░",
    "░░░█ ░██▀ █▀█ ▀▀█ █▀█ ░░",
    "░░░▀ ░▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ░░",
    "░░░░#░░░#░░░#░░░#░░░#░░░",
    "░░#░░░#░░░#░░░#░░░#░░░#░",
    "░░░░#░░░#░░░#░░░#░░░#░░░"
];
type test_2 = Expect<Equal<test_2_actual, test_2_expected>>;

type test_3_actual = ToAsciiArt<"  : * : * : * : * : * : * : \n  Ecyrbe  \n  : * : * : * : * : * : * : ">;
//   ^?
type test_3_expected = [
    "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
    "░░░░#░░░#░░░#░░░#░░░#░░░#░░░",
    "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
    "░░█▀▀ █▀▀ █ █ █▀█ █▀▄ █▀▀ ░░",
    "░░█▀▀ █ ░░▀█▀ ██▀ █▀▄ █▀▀ ░░",
    "░░▀▀▀ ▀▀▀ ░▀ ░▀ ▀ ▀▀  ▀▀▀ ░░",
    "░░#░░░#░░░#░░░#░░░#░░░#░░░#░",
    "░░░░#░░░#░░░#░░░#░░░#░░░#░░░",
    "░░#░░░#░░░#░░░#░░░#░░░#░░░#░"
];
type test_3 = Expect<Equal<test_3_actual, test_3_expected>>;
