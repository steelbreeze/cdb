/** A function taking a value of one type returning another type. */
export declare type Function<TValue, TResult> = (value: TValue) => TResult;
/** A function that takes a value and returns a boolean. Used in the construction of where clauses. */
export declare type Predicate<TValue> = Function<TValue, boolean>;
/** A supplier function, one with no parameters that returns a result. */
export declare type Supplier<TResult> = () => TResult;
/** Represents a row of data; essentially a JavaScript Object with an arbitory number of properties. */
export declare type Row = Record<string, unknown>;
/** An operator used in queries. */
export declare type Operator<T> = Supplier<Predicate<T>>;
