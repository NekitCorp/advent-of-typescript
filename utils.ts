export type List<N extends number, T extends any[] = []> = T["length"] extends N
    ? T
    : List<N, [...T, T["length"]]>;

export type Increment<N extends number> = [...List<N>, any]["length"] extends infer Length
    ? Length extends number
        ? Length
        : never
    : never;

export type Decrement<N extends number> = N extends 0
    ? -1
    : [...List<N>] extends [...infer T, any]
    ? T["length"]
    : never;
