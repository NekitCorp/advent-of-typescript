/**
 * Creates a tuple (array) of length `N`, where each element represents its index.
 *
 * @template N - A numeric literal type representing the desired length.
 * @template T - An internal helper, defaulting to an empty tuple (do not pass explicitly).
 * @returns A tuple of length `N`.
 *
 * @example
 * type Empty = List<0>; // []
 * type OneElement = List<1>; // [0]
 * type ThreeElements = List<3>; // [0, 1, 2]
 */
export type List<N extends number, T extends any[] = []> = T["length"] extends N ? T : List<N, [...T, T["length"]]>;

/**
 * Increments a numeric literal type `N` by 1.
 *
 * @template N - A numeric literal type (e.g., 0, 1, 2, ...).
 * @returns The numeric literal type `N + 1`.
 *
 * @example
 * type One = Increment<0>; // 1
 * type Two = Increment<1>; // 2
 * type Four = Increment<Increment<2>>; // 4
 */
export type Increment<N extends number> = [...List<N>, any]["length"] extends infer Length
    ? Length extends number
        ? Length
        : never
    : never;

/**
 * Decrements a numeric literal type `N` by 1.
 *
 * @template N - A numeric literal type (e.g., 1, 2, 3, ...).
 * @returns The numeric literal type `N - 1`, or `-1` if `N` is `0`.
 *
 * @example
 * type Zero = Decrement<1>; // 0
 * type One = Decrement<2>; // 1
 * type NegativeOne = Decrement<0>; // -1
 */
export type Decrement<N extends number> = N extends 0
    ? -1
    : [...List<N>] extends [...infer T, any]
    ? T["length"]
    : never;
