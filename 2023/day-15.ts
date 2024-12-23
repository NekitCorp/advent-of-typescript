import { Expect, Equal } from "../test";

/**
 * **Box The Toys!**
 *
 * [Santa walks by as Bernard, the head elf, is yelling at the other elves..]
 *
 * [Bernard (to his staff)] LET'S GO ELVES! LET'S GO! KEEP BOXING TOYS!
 *
 * [Santa] Bernard.. Seems like it's not going well.
 *
 * [Bernard] Was anyone asking you!?
 *
 * [Santa] Did you deploy the new toy boxing API yesterday?
 *
 * [Bernard] No, we didn't get to it. Julius called out sick.
 *
 * [Santa] Taking too many sick days shows a lack of commitment. We should get rid of Julius.
 *
 * [Bernard (rolling eyes)] And then not replace him? Yeah. No Thanks.
 *
 * [Santa] Well it was on the sprint and today's the last day of the sprint.
 *
 * [Bernard] We don't deploy on Fridays.
 *
 * [Santa] Aren't we doing continuous deployment now? You had this whole big thing at the last shareholder meeting about it?
 *
 * [Bernard] No. For the 100th time. We're doing continuous delivery, which is completely different and gives us control over when we deploy.
 *
 * [Santa] Well I need that `BoxToys` type. If you can't handle this project, Bernard, there are plenty of other elves who can. I need your full commitment.
 *
 * [Bernard] Ok. Fine. I'll do it myself.
 *
 * [Santa] That's what I like to see!
 *
 * **The `BoxToys` API**
 *
 * The `BoxToys` type takes two arguments:
 *
 * the name of a toy
 * the number of of boxes we need for this toy
 * And the type will return a tuple containing that toy that number of times.
 *
 * But there's one little thing.. We need to support the number of boxes being a union. That means our resulting tuple can also be a union. Check out `test_nutcracker` in the tests to see how that works.
 */
type BoxToys<S extends string, N extends number> = N extends 1 ? [S] : [S, ...BoxToys<S, Decrement[N]>];

type Decrement = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type test_doll_actual = BoxToys<"doll", 1>;
//   ^?
type test_doll_expected = ["doll"];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<"nutcracker", 3 | 4>;
//   ^?
type test_nutcracker_expected =
    | ["nutcracker", "nutcracker", "nutcracker"]
    | ["nutcracker", "nutcracker", "nutcracker", "nutcracker"];
type test_nutcracker = Expect<Equal<test_nutcracker_expected, test_nutcracker_actual>>;
