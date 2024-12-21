import { Expect, Equal } from "../test";

/**
 * **🎩Bernard's New Demands 2: Electric Boogaloo**
 *
 * After discovering the unused variables in the elves' code, 🎩Bernard has one more request...
 *
 * [🎩Bernard] These scripts are getting better, but we need to track ALL the variables - both the ones being used AND the ones collecting dust. We had a close call where a toy almost got left out of its gift box because the variable was declared but never used - if we have to check all this by hand it's going to take forever and kids might not get their presents!
 *
 * The elves need to improve their code analyzer one final time to create a complete linting tool that will:
 * 1. Track all variable declarations and usage
 * 2. Identify unused variables
 * 3. Return everything in a single, organized report
 *
 * For example, when analyzing this script:
 * ```ts
 * let robotDog = "standard_model";
 * const giftBox = "premium_wrap";
 * var ribbon123 = "silk";
 *
 * wrapGift(giftBox);
 * addRibbon(ribbon123);
 * ```
 *
 * The linter should produce:
 * ```ts
 * {
 *   scope: {
 *     declared: ["robotDog", "giftBox", "ribbon123"],
 *     used: ["giftBox", "ribbon123"]
 *   },
 *   unused: ["robotDog"]  // robotDog was never put in the box!
 * }
 * ```
 *
 * Implement a type `Lint` that performs this analysis, handling:
 * - All previous functionality (variable declarations and usage tracking)
 * - Identification of unused variables in a separate `unused` array
 * - Various amounts of whitespace, tabs, and empty lines
 * - Empty scripts (which should return empty arrays for all fields)
 *
 * Hint
 *
 * Build upon your previous analyzers! The unused variables are those that appear in `declared` but not in `used`. Think about how you can compare these two arrays at the type level.
 */
type Lint<T extends string> = AnalyzeUsed<AnalyzeScope<T>>;

type AnalyzeUsed<T extends AnalyzeResult> = {
    scope: T;
    unused: ExcludeArrays<T["declared"], T["used"]>;
};

type ExcludeArrays<T extends string[], U extends string[]> = T extends [
    infer First,
    ...infer Rest extends string[]
]
    ? First extends U[number]
        ? ExcludeArrays<Rest, U>
        : [First, ...ExcludeArrays<Rest, U>]
    : [];

type AnalyzeScope<
    T extends string,
    R extends AnalyzeResult = { declared: []; used: [] }
> = T extends `\n${infer Rest}`
    ? AnalyzeScope<Rest, R>
    : T extends `${infer Start}\n${infer Rest}`
    ? AnalyzeScope<
          Rest,
          {
              declared: [...R["declared"], ...ParseLine<Start>["declared"]];
              used: [...R["used"], ...ParseLine<Start>["used"]];
          }
      >
    : R;

type ParseLine<T extends string> =
    T extends `${infer _}${VariableDeclarations} ${infer Id} = ${infer _}`
        ? { declared: [Id]; used: [] }
        : T extends `${infer _}(${infer Argument});`
        ? { declared: []; used: [Argument] }
        : { declared: []; used: [] };

type AnalyzeResult = { declared: string[]; used: string[] };
type VariableDeclarations = "let" | "const" | "var";

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type t0_actual = Lint<`
let teddyBear = "standard_model";
`>;
type t0_expected = {
    scope: { declared: ["teddyBear"]; used: [] };
    unused: ["teddyBear"];
};
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Lint<`
buildToy(teddyBear);
`>;
type t1_expected = {
    scope: { declared: []; used: ["teddyBear"] };
    unused: [];
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = Lint<`
let robotDog = "deluxe_model";
assembleToy(robotDog);
`>;
type t2_expected = {
    scope: { declared: ["robotDog"]; used: ["robotDog"] };
    unused: [];
};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = Lint<`
let robotDog = "standard_model";
  const giftBox = "premium_wrap";
    var ribbon123 = "silk";
  
  \t
  wrapGift(giftBox);
  \r\n
      addRibbon(ribbon123);
`>;
type t3_expected = {
    scope: { declared: ["robotDog", "giftBox", "ribbon123"]; used: ["giftBox", "ribbon123"] };
    unused: ["robotDog"];
};
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_actual = Lint<"\n\t\r \t\r ">;
type t4_expected = {
    scope: { declared: []; used: [] };
    unused: [];
};
type t4 = Expect<Equal<t4_actual, t4_expected>>;
