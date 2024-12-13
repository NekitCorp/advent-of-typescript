import { Expect, Equal } from "../test";

/**
 * **🎩Bernard's Long List Of Names**
 *
 * [Things are staring to heat up in the North Pole. The reindeer have been blackmailing Mrs. Claus in order to get fair pay, threatening to expose her affair with 🪩Jamie Glitterglum.]
 *
 * [🎅Santa] GET ME THOSE NAMES!!!!!!!!!!
 *
 * [🎩Bernard] I'm workin' on it, I'm workin' on it!
 *
 * [🎅Santa] TODAY! I NEED THEM TODAY!! ACTUALLY I NEED THEM LAST MONTH!!!
 *
 * [🎅Santa throws a giant box of delicate glass Christmas tree ornaments against the factory wall, sending shards of glass flying in every direction]
 *
 * [🎩Bernard] Ah, there's the classic 🎅Santa we all know and love. Smashing priceless ornaments while screaming unintelligibly. Truly, the Christmas spirit personified.
 *
 * [🎅Santa] TODAY! I NEED THEM TODAY!! ACTUALLY I NEED THEM LAST MONTH!!!
 *
 * [🎩Bernard] You want every name? Fine. I'll even get you the ones with seven middle initials and the kids named after TikTok trends.
 *
 * 🎩Bernard has a very long list of names from the Social Security Administration, but we need to format the data into objects so 🎅Santa can ingest it into his existing system.
 *
 * Help 🎩Bernard before 🎅Santa continues his violent tirade.
 *
 * Help 🎩Bernard before 🎅Santa continues his violent tirade. He's not about to spend a bunch of time looking at each child so instead he's just deciding whether a child is naughty or nice based on the number of characters in their name!
 *
 * A HUGE hint
 *
 * Part of the fun/trick of this challenge is that you can't solve it normally by iterating because you'll get:
 * - `Type instantiation is excessively deep and possibly infinite.ts(2589)`
 * - `Type produces a tuple type that is too large to represent.ts(2799)`
 *
 * For example, many people will probably first try:
 *
 * ```ts
 * export type Solution<
 *   Row extends [string, string, string][],
 *   Accumulator extends { name: string, count: number}[] = []
 * > =
 *   Row extends [
 *     [infer Name extends string, string, infer Count],
 *     ...infer Rest extends Row,
 *   ]
 *   ? Solution<
 *       Rest,
 *       [
 *         ...Accumulator,
 *         {
 *           name: Name,
 *           count: Count extends `${infer CountNum extends number}` ? CountNum : never
 *         }
 *       ]
 *     >
 *   : Accumulator;
 * ```
 *
 * or the non tail-call recursive version:
 *
 * ```ts
 * export type Solution<
 *   Row extends [string, string, string][],
 * > =
 *   Row extends [
 *     [infer Name extends string, string, infer Count],
 *     ...infer Rest extends Row,
 *   ]
 *   ? [
 *       {
 *         name: Name,
 *         count: Count extends `${infer CountNum extends number}` ? CountNum : never
 *       },
 *       ...Solution<Rest>
 *     ]
 *   : [];
 * ```
 *
 * but that won't work at these scales. You need to find another way to iterate the array that doesn't involve recursion.
 */
type NaughtyOrNice = {
    Liam: "naughty";
    Yanni: "nice";
    Petra: "nice";
    Aala: "naughty";
    Aagya: "nice";
};

type FormatNames<T extends string[][]> = {
    [K in keyof T]: T[K] extends [infer Name extends string, string, infer Count extends string]
        ? {
              name: Name;
              count: Count extends `${infer CountNum extends number}` ? CountNum : never;
              rating: NaughtyOrNice[Name & keyof NaughtyOrNice];
          }
        : never;
};

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type t0_actual = FormatNames<Names>["length"]; // =>
type t0_expected = 31682; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = FormatNames<Names>[0]; // =>
type t1_expected = {
    // =>
    name: "Liam";
    count: 20802;
    rating: "naughty";
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = FormatNames<Names>[11194]; // =>
type t2_expected = {
    // =>
    name: "Yanni";
    count: 19;
    rating: "nice";
};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = FormatNames<Names>[2761]; // =>
type t3_expected = {
    // =>
    name: "Petra";
    count: 148;
    rating: "nice";
};
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_actual = FormatNames<Names>[31680]; // =>
type t4_expected = {
    // =>
    name: "Aala";
    count: 5;
    rating: "naughty";
};
type t4 = Expect<Equal<t4_actual, t4_expected>>;

type t5_actual = FormatNames<Names>[31681]; // =>
type t5_expected = {
    // =>
    name: "Aagya";
    count: 5;
    rating: "nice";
};
type t5 = Expect<Equal<t5_actual, t5_expected>>;

/**
 * Note that since this is exported, you can import it to play around with it a bit
 *
 * data sourced from https://www.ssa.gov/oact/babynames/names.zip
 */
export type Names = [
    ["Liam", "M", "20802"],
    ["Noah", "M", "18995"],
    ["Oliver", "M", "14741"],
    ["Emma", "F", "13527"]
    // ...
];
