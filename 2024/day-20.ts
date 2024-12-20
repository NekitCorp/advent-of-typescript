import { Expect, Equal } from "../test";

/**
 * **Variable Scope Analysis: 🎩Bernard's New Demands**
 *
 * After discovering the elves' code automation scheme, 🎩Bernard was... impressed! But now he's sending it back along with every lazy elf's worst nightmare: more work...
 *
 * [🎩Bernard] This is a good start, but we need to track which variables are actually being used. We can't have unused variables cluttering up our toy production scripts - who knows what kind of bugs that could cause!
 *
 * The elves need to enhance their code analyzer to track both declared variables AND their usage. For each script, they need to report:
 * - All variables that are declared (using `let`, `const`, or `var`)
 * - All variables that are actually used (as function arguments)
 *
 * For example, when analyzing:
 * ```ts
 * let robotDog = "deluxe_model";
 * assembleToy(robotDog);
 * ```
 *
 * The analyzer should produce:
 * ```ts
 * {
 *   declared: ["robotDog"],
 *   used: ["robotDog"]
 * }
 * ```
 *
 * And if variables are declared but never used (like in `let teddyBear = "standard_model";`), they should only appear in the `declared` array, not the `used` array.
 *
 * Implement a type `AnalyzeScope` that performs this analysis, handling:
 * - Variable declarations with any amount of whitespace
 * - Function calls with variable references
 * - Multiple declarations and usages in the same script
 * - Empty or whitespace-only scripts
 *
 * Hint
 *
 * Consider breaking down the analysis into two parts: one for gathering declarations and another for finding usages. Remember that variables can be declared without being used, and whitespace can appear anywhere!
 */
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

type t0_actual = AnalyzeScope<`
let teddyBear = "standard_model";
`>;
type t0_expected = {
    declared: ["teddyBear"];
    used: [];
};
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = AnalyzeScope<`
buildToy(teddyBear);
`>;
type t1_expected = {
    declared: [];
    used: ["teddyBear"];
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = AnalyzeScope<`
let robotDog = "deluxe_model";
assembleToy(robotDog);
`>;
type t2_expected = {
    declared: ["robotDog"];
    used: ["robotDog"];
};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = AnalyzeScope<`
  let robotDog = "standard_model";
  const giftBox = "premium_wrap";
    var ribbon123 = "silk";
  
  \t
  wrapGift(giftBox);
  \r\n
      addRibbon(ribbon123);
`>;
type t3_expected = {
    declared: ["robotDog", "giftBox", "ribbon123"];
    used: ["giftBox", "ribbon123"];
};
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_input = "\n\t\r \t\r ";
type t4_actual = AnalyzeScope<t4_input>;
type t4_expected = {
    declared: [];
    used: [];
};
type t4 = Expect<Equal<t4_actual, t4_expected>>;
