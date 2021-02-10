import { Function, Operator } from './types';
import { IColumn } from './IColumn';
/** Represents a column and its data within a table. */
export declare class Column implements IColumn {
    readonly name: string;
    /**
     * The set of distinct, raw values for this column within the table.
     */
    readonly distinct: Array<unknown>;
    /**
     * The index into the array of distinct values for each row.
     * @private
     */
    private readonly index;
    /**
     * A function to convert the returned value to a defined type.
     * @private
     */
    private convert;
    /**
     * Creates a new instance of the Column class.
     * @param name The name of the column.
     */
    constructor(name: string);
    /**
     * Copy constructor; creates a new instance of the Column class from another object with the same values.
     * @param name The name of the column.
     * @param column Another column to copy as a baseline.
     */
    constructor(name: string, column: Column);
    /**
     * Creates a column alias with a different name.
     * @param name The alias name for the column.
     * @returns A virtual column.
     */
    as(name: string): Column;
    /**
     * Allows the column to be converted to a specific type.
     * @param convert A function used to convert to the defined type.
     * @return Fluent API call, so returns this.
     */
    to<T>(convert: Function<unknown, T>): this;
    /**
     * Inserts a new row into the column.
     * @param value The value to add.
     * @param indexes The set of indexes to insert the value into.
     * @private Package private.
     */
    insert(value: unknown, indexes: Iterable<number>): void;
    /**
     * Returns a value from the column for a specific row index.
     * @param index The row index to return.
     * @private Package private.
     */
    value(index: number): any;
    /**
     * Generates an operator to be used in Query.where to filter a column by a list of values.
     * @param values The list of values to filter the column by.
     */
    in(values: Array<any>): Operator;
    /**
     * Generates an operator to be used in the where method of a query to select rows from a table based on equality.
     * @param value The value to test against.
     * @returns Returns the predicate to be used within a query where method.
     */
    equals(value: unknown): Operator;
}
