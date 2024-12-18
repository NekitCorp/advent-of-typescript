import { Expect, Equal } from "../test";

/**
 * **Can Decades Of Wage Theft Really Be Corrected?**
 *
 * [After decades of not raising the reindeer's pay, 🎅Santa suddenly and unexpectedly decided to raise their pay quite substantially. The reindeer are in shock.]
 *
 * [☄️Comet] It cannot be overstated enough how unlikely this was. How did he suddenly change.
 *
 * [💃Dancer] We all know what happened. It was 💋Crystal. She convinced him.
 *
 * [🌟Vixen] This is gonna make such a huge difference for my finances. I can finally pay off the debt I accrued from Battlefront II loot boxes.
 *
 * [❤️Cupid] You idiots. This is a win, but it's hardly putting us ahead. Have you forgotten about the 15 consecutive years of us being paid unfairly? All those lost wages will never come back to us. It's gone. We're only being paid a fair average wage now. We're not even paid well. 50% of reindeer make more than we do, and we're supposed to be happy about that!? We're the premiere reindeer the whole world looks up to yet we're paid like a substitute teacher elf.
 *
 * [💃Dancer] Well, irregardless, we've got an easy day in front of us. All we need to do is fix a small problem with the street lights in town. After that... might be time to throw ourselves a little party!
 *
 * [❤️Cupid] Is a party really appropriate given the circumstances? 💨Dasher, didn't your wife's hospitalization 5 years ago bankrupt you - have you recovered from that?
 *
 * [💨Dasher] Yeah, that is true, but look at the bright side! We're paid more now!
 *
 * [❤️Cupid] Do I have to get out my inflation calculator again for you nincompoops??
 *
 * [💃Dancer] Alright alright ❤️Cupid, we all heard you. Let's just fix the street lights, can we?
 *
 * [❤️Cupid] One day 🎅Santa is gonna come to his senses and realize what happened here. When that day comes, we're in for an exceedingly bad time. Mark. My. Words.
 *
 * Hint
 *
 * If you're tempted to do something like this
 *
 * ```ts
 * const createStreetLight = <
 *   C extends string,
 *   D extends C,
 * >(
 *   colors: C[],
 *   defaultColor: D,
 * ) => {
 *   // ...
 * }
 * ```
 *
 * That won't work here. We're trying to signal to TypeScript not to dig in and match against the inner types to find candidates for type inference.
 */
const createStreetLight = <T>(colors: T[], defaultColor: T extends T ? T : never): T => {
    console.log(colors);
    return defaultColor;
};

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

const colors = ["red" as const, "yellow" as const, "green" as const];
//    ^?
type Color = (typeof colors)[number];
//   ^?

// red is a valid color, no generic parameters needed
const t0_const = createStreetLight(colors, "red");
type t0_actual = typeof t0_const; // =>
type t0_expected = Color; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

// one generic parameter is ok
const t1_const = createStreetLight<Color>(colors, "red");
type t1_actual = typeof t1_const; // =>
type t1_expected = Color; // =>
type t1 = Expect<Equal<t1_actual, t1_expected>>;

// @ts-expect-error (no generic parameters) blue is not a valid option
const e0 = createStreetLight(colors, "blue");

// @ts-expect-error does not accept two generic parameters, even providing a valid option
const e1 = createStreetLight<Color, "red">(colors, "red");

// @ts-expect-error does not accept two generic parameters, and blue isn't a valid option
const e2 = createStreetLight<Color, "blue">(colors, "blue");

// @ts-expect-error (with one generic parameter) blue is not a valid option
const e3 = createStreetLight<Color>(colors, "blue");
