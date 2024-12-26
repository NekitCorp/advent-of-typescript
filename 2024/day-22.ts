import { Expect, Equal } from "../test";

/**
 * **A JSON Parsing Emergency**
 *
 * [🎅Santa, bursting into the workshop, waving a piece of paper frantically] EMERGENCY! The sleigh's navigation system is sending messages about some kind of critical malfunction but I can't make heads or tails of it!
 *
 * [🎩Bernard, grabbing the paper] Let me see that... Oh no. OH NO. It looks like JSON, but... with TRAILING COMMAS!? It's a MESS!
 *
 * [⚡Blitzen, peering over their shoulders] Can't we just use `JSON.parse()`?
 *
 * [🎩Bernard, gasps in horror] And risk a runtime error at 30,000 feet? On CHRISTMAS EVE?! We need something type-safe. Something that can catch these issues as early as possible. Something...
 *
 * [🎅Santa, interrupting] Just fix it! If we can't parse these messages correctly, we might end up delivering presents to fish in the Pacific Ocean instead of children in the Pacific Northwest!
 *
 * The elves need your help to build a type-safe JSON parser that can decode these critical messages from the sleigh! The parser should convert JSON strings into their equivalent TypeScript types, catching any errors as early as possible.
 *
 * For example:
 * ```ts
 * type test = Parse<`{
 *   "altitude": 123,
 *   "warnings": [
 *     "low_fuel",\t\n
 *     "strong_winds",
 *   ],
 * }`>;
 * // Should become:
 * type test = {
 *   altitude: 123;
 *   warnings: ["low_fuel", "strong_winds"];
 * };
 * ```
 *
 * The parser MUST handle:
 * - Objects with string/number keys and any JSON value
 * - Arrays with mixed types
 * - Primitive values (strings, numbers, booleans, null)
 * - Nested objects and arrays
 * - Those dreaded trailing commas in objects and arrays
 * - Various amounts of whitespace and newlines
 *
 * Hint
 *
 * Break this challenge into smaller parts, parsing each part of the JSON structure one at a time and building up to the full parser.
 */
type Parse<T extends string> = Eval<T> extends [infer V, infer U] ? V : never;

// prettier-ignore
type Eval<T>
  = T extends `${' '|'\n'|'\t'}${infer U}` ? Eval<U>
  : T extends `true${infer U}` ? [true, U]
  : T extends `false${infer U}` ? [false, U]
  : T extends `null${infer U}` ? [null, U]
  : T extends `${infer _ extends number}${infer __}` ? EvalNumber<T>
  : T extends `"${infer U}` ? EvalString<U>
  : T extends `${'['}${infer U}` ? EvalArray<U>
  : T extends `${'{'}${infer U}` ? EvalObject<U>
  : false

type Escapes = { r: "\r"; n: "\n"; b: "\b"; f: "\f" };

// prettier-ignore
type EvalString<T, S extends string = ''>
  = T extends `"${infer U}` ? [S, U]
  : (T extends `\\${infer C}${infer U}` ? C extends keyof Escapes ? [C, U] : false : false) extends [infer C, infer U]
    ? EvalString<U, `${S}${C extends keyof Escapes ? Escapes[C] : never}`>
  : T extends `${infer C}${infer U}` ? EvalString<U, `${S}${C}`>
  : false

type EvalNumber<
  T,
  S extends string = ""
> = T extends `${infer Number extends number}${infer U}`
  ? EvalNumber<U, `${S}${Number}`>
  : S extends `${infer Number extends number}`
  ? [Number, T]
  : false;

// prettier-ignore
type EvalArray<T, A extends any[] = []>
  = T extends `${' '|'\n'}${infer U}` ? EvalArray<U, A>
  : T extends `]${infer U}` ? [A, U]
  : T extends `,${infer U}` ? EvalArray<U, A>
  : Eval<T> extends [infer V, infer U] ? EvalArray<U, [...A, V]> 
  : false

// prettier-ignore
type EvalObject<T, K extends string = '', O = {}>
  = T extends `${' '|'\n'}${infer U}` ? EvalObject<U, K, O>
  : T extends `}${infer U}` ? [O, U]
  : T extends `,${infer U}` ? EvalObject<U, K, O>
  : T extends `"${infer U}` ? Eval<`"${U}`> extends [`${infer KK}`, infer UU] ? EvalObject<UU, KK, O> : false
  : T extends `:${infer U}` ? Eval<U> extends [infer V, infer UU] ? EvalObject<UU, '', Merge<{[P in K]: V} & O>> : false
  : T extends `${infer Number extends number}:${infer U}` ? Eval<U> extends [infer V, infer UU] ? EvalObject<UU, '', Merge<{[P in Number]: V} & O>> : false
  : false

type Merge<T> = { [P in keyof T]: T[P] };

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type t0_actual = Parse<// =>
`{
  "a": 1, 
  "b": false, 
  "c": [
    true,
    false,
    "hello",
    {
      "a": "b",
      "b": false
    },
  ],
  "nil": null,
}`>;
type t0_expected = {
  a: 1;
  b: false;
  c: [
    true,
    false,
    "hello",
    {
      a: "b";
      b: false;
    }
  ];
  nil: null;
};
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Parse<"1">;
type t1_expected = 1;
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = Parse<"{}">;
type t2_expected = {};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = Parse<"[]">;
type t3_expected = [];
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_actual = Parse<"[1]">;
type t4_expected = [1];
type t4 = Expect<Equal<t4_actual, t4_expected>>;

type t5_actual = Parse<"true">;
type t5_expected = true;
type t5 = Expect<Equal<t5_actual, t5_expected>>;

type t6_actual = Parse<'["Hello", true, false, null]'>;
type t6_expected = ["Hello", true, false, null];
type t6 = Expect<Equal<t6_actual, t6_expected>>;

type t7_actual = Parse<`{
"hello\\r\\n\\b\\f": "world",
}`>;
type t7_expected = {
  "hello\r\n\b\f": "world";
};
type t7 = Expect<Equal<t7_actual, t7_expected>>;

type t8_actual = Parse<'{ 1: "world" }'>;
type t8_expected = { 1: "world" };
type t8 = Expect<Equal<t8_actual, t8_expected>>;

type t9_actual = Parse<`{
"altitude": 123,
"warnings": [
  "low_fuel",\t\n
  "strong_winds",
],
}`>;
type t9_expected = {
  altitude: 123;
  warnings: ["low_fuel", "strong_winds"];
};
type t9 = Expect<Equal<t9_actual, t9_expected>>;
