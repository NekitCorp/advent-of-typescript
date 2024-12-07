import { Expect, Equal } from "../test";

/**
 * **💋Crystal Panics**
 *
 * [💋Crystal Claus, 🎅Santa's wife, has been unhappy in her marriage. 🎅Santa goes on days-long benders where he's almost impossible to tolerate. 💋Crystal has needs too, after all. 🪩Jamie Glitterglum, 💋Crystal's long time friend, has recently made some... advances, and 💋Crystal isn't sure what to do. 💋Crystal confides in 🎩Bernard.]
 *
 * [💋Crystal] He's gonna kill me, 🎩Bernard. Or worse, he’ll leave me stranded at the North Pole with no Wi-Fi and zero prospects.
 *
 * [🎩Bernard] Did anything actually happen though?
 *
 * [💋Crystal] Well not exactly.........
 *
 * [🎩Bernard, looking skeptical] ??
 *
 * [💋Crystal] It’s complicated!! Things just kinda... escalated over mulled wine and snowman-shaped Jello shots!
 *
 * [🎩Bernard] How exactly does one sorta have an affair behind the back of the Patron of Yuletide, himself? Did you trip and fall into 🪩Jamie's lap or something?
 *
 * [💋Crystal] 🪩Jamie and I haven't quite exactly... well... it's complicated!!
 *
 * [🎩Bernard] You better make it less complicated! and soon! Although, thankfully it's 🎅Santa we're talkin' about. The guy thinks JSON is a new kind of cookie.
 *
 * [💋Crystal] I know exactly what to do. 🎅Santa's been super frustrated with the work of those damn reindeer. They've been developing this subroutine to create new routes on Christmas night, but it's not working correctly. The literal values won't infer like they're supposed to. It's close but.... I think if I can fix it, I can keep 🎅Santa from going on another rage-filled tirade. I gotta keep him content.
 *
 * [🎩Bernard] Then this would mark the first time I’ve seen him not rage-punch a snow globe over the slightest inconvenience.
 *
 * Hint
 *
 * How can you get TypeScript to automatically infer a more narrow type?
 */
const createRoute = <const Route extends string[]>(author: string, route: Route) => ({
    author,
    route,
    createdAt: Date.now(),
});

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

const oneMill = createRoute("💨Dasher", ["Atherton", "Scarsdale", "Cherry Hills Village"]).route;
type t0_actual = typeof oneMill; // =>
type t0_expected = [
    // =>
    "Atherton",
    "Scarsdale",
    "Cherry Hills Village"
];
type t0 = Expect<Equal<t0_actual, t0_expected>>;

const two = createRoute("🌟Vixen", ["Detroit", "Cleveland", "Dayton"]).route;
type t1_actual = typeof two; // =>
type t1_expected = [
    // =>
    "Detroit",
    "Cleveland",
    "Dayton"
];
type t1 = Expect<Equal<t1_actual, t1_expected>>;
