import { Expect, Equal } from "../test";

/**
 * **⚡Blitzen Fixes The Mess**
 *
 * [🎅Santa's reindeer,⚡Blitzen, has a secret meeting with 🎩Bernard, the head of the elves after ☄️Comet and 💨Dasher presented 🎅Santa with their a pay increase demand./]
 *
 * [⚡Blitzen] Did Santa go for it? Did he accept our Demand for a pay increase?
 *
 * [🎩Bernard] Those moron's ☄️Comet and 💨Dasher just wrote down number. I told them to write down a number.
 *
 * [⚡Blitzen] What in the actual F...
 *
 * [🎩Bernard] I know I know. You have to really spell it out for them.
 *
 * [⚡Blitzen] Alright. I'll take care of it. I'll budget 100k for each of us Reindeer. That’s enough to cover therapy for pulling Santa’s bloated cheeks across three continents, plus a little left over for a sleigh-side mojito bar.
 *
 * [🎩Bernard] I swear if I have to hold their hand anymore we're gonna put Reindeer sausage on the menu like the humans in Alaska seem to enjoy so much.
 *
 * [⚡Blitzen, agast] You realize I'm a reindeer? You gotta lay off the powered sugar bro.
 *
 * [🎩Bernard] Over my dead body. It's the only thing that makes me feel good in this nightmare of a job.
 *
 * Yesterday ☄️Comet and 💨Dasher just gave number as their demand to 🎅Santa. That's not nearly specific enough. We're gonna need something much more specific.
 *
 * Look at the tests. See what we can change to make them all pass.
 *
 * Hint
 *
 * In TypeScript, we can specify types with primitives like `number` and `boolean` and `string` but we can also specify types with _type literals_ like `1`, `true`, and `"abcd"`. In this case, you can see that the tests are showing you that you need to provide a _number literal_ to make the tests pass.
 */
type Demand = 900_000;

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type t0_actual = Demand; // =>
type t0_expected = 900_000; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

/*
 * Sometimes, throughout Advent of TypeScript, you'll see a test that asserts there _is_ a type error, often to ensure that you're providing a correct implementation.
 * In this example, passing `number` isn't good enough, so we're highlighting that to you by showing that would cause a type error if `number` is the value of `Demand`.
 */

// @ts-expect-error
type e0 = Expect<Equal<Demand, number>>;
