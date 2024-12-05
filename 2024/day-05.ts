import { Expect, Equal } from "../test";

/**
 * **Drafting This Year's Routes**
 *
 * [❤️Cupid and 🌟Vixen are presenting 🎅Santa with their work on the route for this year's Christmas present delivery.]
 *
 * [🎅Santa] What is it? Are you guys working blindfolded or what!??
 *
 * [❤️Cupid] Hardly. We've been working on this for weeks and weeks.
 *
 * [🎅Santa] What am I even shelling out these beautiful carrots for? It's like it's suddenly amateur hour at the North Pole!
 *
 * [🌟Vixen] Actually, funny you should raise that point because you pay us for a quality of work far below what we've just provided. You should be thrilled.
 *
 * [🎅Santa] I don't want any more of that attitude from you, 🌟Vixen. I think you should think of the position that puts your colleagues in when you talk like that. Should I pay them less just so I can pay you more? Huh?
 *
 * [🌟Vixen] I'm getting tired of going around-and-around with you on this. Just tell us what you want.
 *
 * [🎅Santa] Well for one thing, the route should be should be able to handle any arbitrary input! And while you’re at it, make the route solar-powered. The PR team says it’s time we went carbon neutral.
 *
 * 🎅Santa is hard to please. That much is for sure. To appease him, we want a function that will accept any input and return a value that has exactly the same type.
 *
 * Hint
 *
 * You need to find some way to pass this function a _parameter_ which is, itself, a type. There's a generic and general purpose syntax for doing this. Are you familiar with it?
 */
const createRoute = <T>(author: string, route: T): T => {
    console.log(`[createRoute] route created by ${author} at ${Date.now()}`);
    return route;
};

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

const oneMill = createRoute("💨Dasher", 100_000_000);
type t0_actual = typeof oneMill; // =>
type t0_expected = 100_000_000; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

const two = createRoute("💃Dancer", 2);
type t1_actual = typeof two; // =>
type t1_expected = 2; // =>
type t1 = Expect<Equal<t1_actual, t1_expected>>;

const three = createRoute("🦌Prancer", 2);
type t2_actual = typeof three; // =>
type t2_expected = 2; // =>
type t2 = Expect<Equal<t2_actual, t2_expected>>;

const four = createRoute("🌟Vixen", "1");
type t3_actual = typeof four; // =>
type t3_expected = "1"; // =>
type t3 = Expect<Equal<t3_actual, t3_expected>>;

const five = createRoute("☄️Comet", true);
type t4_actual = typeof five; // =>
type t4_expected = true; // =>
type t4 = Expect<Equal<t4_actual, t4_expected>>;

const six = createRoute("❤️Cupid", [1]);
type t5_actual = typeof six; // =>
type t5_expected = number[]; // =>
type t5 = Expect<Equal<t5_actual, t5_expected>>;

const seven = createRoute("🌩️Donner", { 1: 1 });
type t6_actual = typeof seven; // =>
type t6_expected = { 1: number }; // =>
type t6 = Expect<Equal<t6_actual, t6_expected>>;

const eight = createRoute("⚡Blitzen", Symbol("🔴 === evil"));
type t7_actual = typeof eight; // =>
type t7_expected = symbol; // =>
type t7 = Expect<Equal<t7_actual, t7_expected>>;
