import { Expect, Equal } from "../test";

/**
 * **🎅Santa Hides Behind Perf Review**
 *
 * [🎅Santa] Sadly, she's no longer a 10.
 *
 * [🎩Bernard] Are we talking about the same thing??
 *
 * [🎅Santa] Huh? Oh. Right, you were talking about the reindeer.
 *
 * [🎩Bernard] Yeah, what were you talking about?
 *
 * [🎅Santa] Nothing, nothing. So just tell them they'll get their raise when they can show some dedication to this business.
 *
 * [🎩Bernard] The thing is they feel like they've more than accomplished that over the last 15 years since they last got a pay increase.
 *
 * [🎅Santa] Tell them we'll review it during the next performance review.
 *
 * [🎩Bernard, facepalming] And when is that?
 *
 * [🎅Santa] When their performance improves! You think I just give raises to anyone who pulls a sleigh? This isn’t charity.
 *
 * We need a type for a function that represents the performance review cycle. With this function in hand, perhaps 🎩Bernard will be able to convince 🎅Santa to take the reindeer's demands more seriously.
 *
 * Hint
 *
 * Learn some more about how to create and type async functions that are also iterable (generators).
 */
type PerfReview<T> = T extends AsyncGenerator<infer R, any, any> ? R : never;

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

async function* numberAsyncGenerator() {
    yield 1;
    yield 2;
    yield 3;
}
type t0_type = typeof numberAsyncGenerator;
type t0_actual = PerfReview<ReturnType<t0_type>>;
type t0_expected = 1 | 2 | 3;
type t0 = Expect<Equal<t0_actual, t0_expected>>;

async function* stringAsyncGenerator() {
    yield "1%";
    yield "2%";
}
type t1_type = typeof stringAsyncGenerator;
type t1_actual = PerfReview<ReturnType<t1_type>>;
type t1_expected = "1%" | "2%";
type t1 = Expect<Equal<t1_actual, t1_expected>>;
