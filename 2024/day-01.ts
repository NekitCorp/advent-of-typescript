import { Expect, Equal } from "../test";

/**
 * **The Reindeer Have Had Enough**
 *
 * [🎅Santa's reindeer, ☄️Comet and 💨Dasher, have a secret meeting with 🎩Bernard, the head of the elves]
 *
 * [☄️Comet] It's the economy, stupid!
 *
 * [💨Dasher] ☄️Comet! I'm sick of your shit. Read a book or something, wouldja?? Our productivity far outpaced North Pole's inflation like two decades ago. Our wage hasn't changed since 2009 and if you take inflation into account we make half of what we made then! We could have the best economy of the last 500 years and it still wouldn't change anything.
 *
 * [🎩Bernard] Boys, boys! calm down. We'll fix this. We can fix this.
 *
 * [☄️Comet] Oh, I’m sorry, Mr. Bernard the Keynesian scholar. Maybe you can explain why we’re still getting paid in candy canes like it’s 1947. Apparently we're dealing with reindeer here [glares at 💨Dasher] that don't even know the difference between any and unknown.
 *
 * [🎩Bernard] Boys, boys, calm the hell down! You’re not the only ones with problems. I’ve got 600 elves in the workshop huffing reindeer wax and unionizing over bathroom breaks. You just need to come up with a number for our Demand.
 *
 * [💨Dasher] What kind of number?
 *
 * [🎩Bernard] At this point, any number will do. But we need to start somewhere.
 *
 * [💨Dasher] Why not go all in? Write down ‘infinity carrots’ and tell him it’s non-negotiable. What’s he gonna do, hire reindeer scabs?
 *
 * [🎩Bernard] Do you know how hard it is to get Santa to focus these days? Half the time, he’s passed out in his workshop muttering about crypto and Mrs. Claus’s book club drama. ANY number will be fine as a staring point.
 *
 * **Welcome To Advent of TypeScript 2024!**
 *
 * **The Stories**
 *
 * What you just read above is part of the story for this year's challenge. This year picks up from last year's story. If it interests you, you can quickly read all of last year's stories on the AoT 2023 site. In these stories, we get to know Santa in a much more... personal way than what you might be used to from picture books and cartoons.
 *
 * The story will often give you a lot of context about the changes you need to make to the TypeScript code. In today's example, we see that we're supposed to modify Demand (the TypeScript type) to be a number.
 *
 * **The Tests**
 *
 * Truth be told, though, you don't really need to read the stories. If you like, you can jump right in to reading the tests to see what the behavior of your type is supposed to be. We'll usually start you off with something, but it'll always be incomplete in some way. Take a look at the tests and make a change to make the tests pass.
 *
 * **The Hints**
 *
 * If you need a hint, sometimes you'll see something like this:
 *
 * Expand me to reveal a hint!
 * [Example]
 *
 * Try doing XYZ to ABC and see if the tests pass!
 */
type Demand = number;

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

/** `Demand` corresponds to the type you supply/modify */
type t0_actual = Demand; // =>

/** This line shows what the expected result of `Demand` should be */
type t0_expected = number; // =>

/**
 * We compare the two results here with `Expect` and `Equal`
 *
 * These are special TypeScript types that will cause a type error if the two types are not equal.
 *
 * If every `Expect`/`Equal` line passes, then it means you've completed today's challenge!
 */
type t0 = Expect<Equal<t0_actual, t0_expected>>;
