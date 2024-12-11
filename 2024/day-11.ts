import { Expect, Equal } from "../test";

/**
 * **Excuses, Excuses**
 *
 * [Last night, while the reindeer plotted on how to leverage 💋Crystal Claus with their knowledge of her affair with 🪩Jamie Glitterglum, 💋Crystal and 🪩Jamie met up in a panic. Today, 🎅Santa is beginning to suspect something]
 *
 * [🎅Santa] Dear.. Where were you last night?
 *
 * [💋Crystal, turning bright red in embarrassment] Oh. Uh, I was out doing karaoke with some friends. Kendrick Lamar and Opeth both released albums on the same day last month, so we've been learning all the songs to both. [coughing nervously] Oh [cough] and also we were trying out a new drink one of the elves came up with. It's a bit like a mojito but instead of mint it's.. well it's a whole thing. Then we also
 *
 * [🎅Santa] You seem nervous.
 *
 * [💋Crystal, sweating] Oh, no, not at all! Not at all! It's just so hard to remember, you can understand!
 *
 * [Later that night 💋Crystal and 🪩Jamie met again.]
 *
 * [💋Crystal] We're in BIG trouble. What are we gonna do!!? We need a new excuse, and we need to add something to it. But... what??
 *
 * [🪩Jamie] Talk to him again, but this time be ready to add to your excuse! Just bury him in details. 🎅Santa tunes out if you say anything longer than two sentences about non-cookie-related topics. Think of a few different excuses, just in case.
 *
 * We already have a Excuse that 💋Crystal provided 🎅Santa, but now we need to extend it in some way. We need it to be general-purpose, so 💋Crystal can try a few different ideas out.
 *
 * Hint
 *
 * How do you create a "newable" object in JavaScript (i.e. one that you use the `new` keyword with)? How do you provide TypeScript types to such a thing?
 */
interface Excuse<T> {
    new (value: any): T extends Record<infer K extends string, string> ? `${K}: ${T[K]}` : never;
}

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

const existingExcuses = {
    karaoke: ["Kendrick Lamar, Opeth"],
    margarita: "Peppermint-Jalapeño Mojito",
};

const helpingTheReindeer = {
    helping: "the reindeer",
} as const;
declare const Excuse0: Excuse<typeof helpingTheReindeer>;
const excuse0 = new Excuse0({
    ...existingExcuses,
    ...helpingTheReindeer,
});
type t0_actual = typeof excuse0; // =>
type t0_expected = "helping: the reindeer"; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

const eatingFudge = {
    eating: "fudge",
} as const;
declare const Excuse1: Excuse<typeof eatingFudge>;
const excuse1 = new Excuse1({
    ...existingExcuses,
    ...eatingFudge,
});
type t1_actual = typeof excuse1; // =>
type t1_expected = "eating: fudge"; // =>
type t1 = Expect<Equal<t1_actual, t1_expected>>;
