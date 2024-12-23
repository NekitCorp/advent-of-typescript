import { Expect, Equal } from "../test";

/**
 * **Upgrade the Assembly Line**
 *
 * The North Pole's toy assembly line is getting a major upgrade! To streamline production, the elves need to build a type-safe conveyor belt system that can standardize their operations and make them reusable. The system should introduce an `Apply` type that can be used to apply operations to values.
 *
 * The system should support the following operations:
 * - `Push`: Add an item to a tuple
 * - `Extends`: Check if a type extends another type
 * - `Filter`: Filter items in a tuple based on any criteria
 * - `ApplyAll`: Apply an operation to all items in a tuple
 * - `Cap`: Capitalize the first letter of a string
 *
 * Example usage of the conveyor belt system:
 * ```ts
 * type Station1 = Apply<Cap, "robot">; // "Robot"
 * type Station2 = Apply<Apply<Push, Station1>, ["Tablet", "teddy bear"]>; // ["Tablet", "teddy bear", "Robot"]
 * type Station3 = Apply<
 *   Apply<Filter, Apply<Extends, Apply<Cap, string>>>,
 *   Station2
 * >; // ["Tablet", "Robot"]
 * ```
 *
 * Hint
 *
 * Generic types like `Array` let you abstract over the type of the element (`T`) in the container (`Array`). But what if you need to abstract over the type of the container itself?
 */
type Description = any;

/** Apply */
// prettier-ignore
type Apply<Method, Param> =
    Method extends Cap
        ? Capitalize<Param & string>
    : Method extends Push
        ? [PushImpl, Param]
    : Method extends Filter
        ? [FilterImpl, Param]
    : Method extends Extends
        ? [ExtendsImpl, Param]
    : Method extends ApplyAll
        ? [ApplyAllImpl, Param]
    : Method extends [PushImpl, infer LocalParam]
        ? (Param extends unknown[] ? [...Param, LocalParam] : never)
    : Method extends [ExtendsImpl, infer ExtendType]
        ? (Param extends ExtendType ? true : false)
    : Method extends [FilterImpl, infer LocalParam]
        ? (Param extends unknown[] ? FilterFn<Param, LocalParam> : never)
    : Method extends [ApplyAllImpl, infer LocalParam]
        ? (Param extends unknown[] ? ApplyAllFn<Param, LocalParam> : never)
    : never;

type FilterFn<T extends unknown[], Cond> = T extends [infer Head, ...infer Tail]
    ? Apply<Cond, Head> extends true
        ? [Head, ...FilterFn<Tail, Cond>]
        : FilterFn<Tail, Cond>
    : [];

type ApplyAllFn<T extends unknown[], Method> = T extends [infer Head, ...infer Tail]
    ? [Apply<Method, Head>, ...ApplyAllFn<Tail, Method>]
    : [];

/** Push an element to a tuple */
type Push = "Push";
type PushImpl = "PushImpl";

/** Filter a tuple */
type Filter = "Filter";
type FilterImpl = "FilterImpl";

/** Determine if the given type extends another */
type Extends = "Extends";
type ExtendsImpl = "ExtendsImpl";

/** Apply an operation to all inputs */
type ApplyAll = "ApplyAll";
type ApplyAllImpl = "ApplyAllImpl";

/** Capitalize a string */
type Cap = "Cap";

// *************************************************************************************
// ***                                    Tests                                      ***
// *************************************************************************************

type t0_actual = Apply<Cap, "hello">; // =>
type t0_expected = "Hello"; // =>
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = Apply<
    // =>
    Apply<Push, "world">,
    ["hello"]
>;
type t1_expected = ["hello", "world"]; // =>
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = Apply<
    // =>
    Apply<ApplyAll, Cap>,
    Apply<Apply<Push, "world">, ["hello"]>
>;
type t2_expected = ["Hello", "World"]; // =>
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = Apply<
    // =>
    Apply<Filter, Apply<Extends, number>>,
    [1, "foo", 2, 3, "bar", true]
>;
type t3_expected = [1, 2, 3]; // =>
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type Station1 = Apply<Cap, "robot">; // =>
type Station2 = Apply<Apply<Push, Station1>, ["Tablet", "teddy bear"]>; // =>
type Station3 = Apply<Apply<Filter, Apply<Extends, Apply<Cap, string>>>, Station2>;
type t4_actual = Station3;
type t4_expected = ["Tablet", "Robot"];
type t4 = Expect<Equal<t4_actual, t4_expected>>;
