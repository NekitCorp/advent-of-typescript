import { Expect, Equal } from "../test";

/**
 * **The Lazy Elf's Code Generator**
 *
 * Some of the lazier elves in the workshop are trying to automate their toy-making duties using code with a familiar syntax. Before 🎅Santa finds out about their automation scheme, the code needs to be parsed and validated by 🎩Bernard to make sure no corners are being cut!
 *
 * Implement a type `Parse` that analyzes these scripts and breaks them down into their basic components. The scripts include:
 * - Variable declarations (using `let`, `const`, or `var`)
 * - Function calls (like `wrapGift` or `buildToy`)
 *
 * For example, when an elf writes:
 *
 * ```ts
 * let teddyBear = "standard_model";
 * buildToy(teddyBear);
 * ```
 *
 * It needs to be decoded for 🎩Bernard's review as:
 *
 * ```ts
 * [
 *   {
 *     id: "teddyBear",
 *     type: "VariableDeclaration"
 *   },
 *   {
 *     argument: "teddyBear",
 *     type: "CallExpression"
 *   }
 * ]
 * ```
 *
 * The code validator needs to handle:
 * - Different ways of declaring variables (`let`, `const`, and `var`)
 * - Any function call that takes a parameter
 * - Various amounts of spacing, tabs, and empty lines (elves aren't great at formatting)
 *
 * Hint
 *
 * Use recursive type patterns with string template literals to decode the automation scripts step by step. Be careful with whitespace - elves are notoriously inconsistent with their formatting!
 */
type Parse<T extends string> = T extends `\n${infer Rest}`
    ? [...Parse<Rest>]
    : T extends `${infer Start}\n${infer Rest}`
    ? ParseLine<Start> extends never
        ? Parse<Rest>
        : [ParseLine<Start>, ...Parse<Rest>]
    : [];

type ParseLine<T extends string> =
    T extends `${infer _}${VariableDeclarations} ${infer Id} = ${infer _}`
        ? { id: Id; type: "VariableDeclaration" }
        : T extends `${infer _}(${infer Argument});`
        ? { argument: Argument; type: "CallExpression" }
        : never;

type VariableDeclarations = "let" | "const" | "var";

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type t0_actual = Parse<`
let teddyBear = "standard_model";
`>;
type t0_expected = [
    {
        id: "teddyBear";
        type: "VariableDeclaration";
    }
];
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Parse<`
buildToy(teddyBear);
`>;
type t1_expected = [
    {
        argument: "teddyBear";
        type: "CallExpression";
    }
];
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = Parse<`
let robotDog = "deluxe_model";
assembleToy(robotDog);
`>;
type t2_expected = [
    {
        id: "robotDog";
        type: "VariableDeclaration";
    },
    {
        argument: "robotDog";
        type: "CallExpression";
    }
];
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = Parse<`
  const giftBox = "premium_wrap";
    var ribbon123 = "silk";
  
  \t
  wrapGift(giftBox);
  \r\n
      addRibbon(ribbon123);
`>;
type t3_expected = [
    {
        id: "giftBox";
        type: "VariableDeclaration";
    },
    {
        id: "ribbon123";
        type: "VariableDeclaration";
    },
    {
        argument: "giftBox";
        type: "CallExpression";
    },
    {
        argument: "ribbon123";
        type: "CallExpression";
    }
];
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_input = "\n\t\r \t\r ";
type t4_actual = Parse<t4_input>;
type t4_expected = [];
type t4 = Expect<Equal<t4_actual, t4_expected>>;
