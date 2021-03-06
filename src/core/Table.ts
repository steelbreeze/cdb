import { Operator, Row } from './types';
import { Column } from './Column';
import { Query } from './Query';

/**
 * Represents a table of data, comprising a number of columns.
 */
export class Table {
	/** All the columns within the table */
	public readonly columns: Array<Column>;

	/**
	 * Creates a new instance of the Table class.
	 * @param name The name of the table.
	 * @param table Another table to copy as a baseline or JSON rendering of a table.
	 */
	public constructor(public readonly name: string, table?: Table) {
		this.columns = table ? table.columns.map(column => new Column(column.name, column)) : [];
	}

	/**
	 * Adds one or more columns to the table
	 * @param columns The new columns to add.
	 */
	public add(...columns: Array<Column>): void {
		for (const column of columns) {
			// pre-populate with nulls for existing rows
			column.insert(this.indexes());

			// add the columns to the table
			this.columns.push(column);
		}
	}

	/**
	 * Adds a new row of data to the table
	 * @param data The row of data to add
	 * @returns Returns the row index within the table
	 */
	public insert(row: Row): void {
		const range = [this.rows];

		// add a new row with appropriate value, or undefined if not found, to each column
		for (const column of this.columns) {
			column.insert(range, row[column.name]);
		}
	}

	/**
	 * Returns the number of rows within the table.
	 */
	public get rows(): number {
		return this.columns[0] ? this.columns[0].index.length : 0;
	}

	/**
	 * Gets a row for a given index.
	 * @param index The index of the row.
	 * @param columns The columns from the table to return in the row.
	 * @return Returns the row of data
	 */
	public row(index: number, columns: Array<Column>): Row {
		return Object.fromEntries(columns.map(column => [column.name, column.value(index)]));
	}

	/**
	 * Returns all the row within the table; a row being the columns specified, or if not specified, all colunms.
	 * @param columns The columns from the table to return in the row; if omitted, returns all columns.
	 */
	public * select(...columns: Array<Column>): IterableIterator<Row> {
		columns = columns.length ? columns : this.columns;

		for (const index of this.indexes()) {
			yield this.row(index, columns);
		}
	}

	/**
	 * Creates a query to filter the contents of a table based on a predicate.
	 * @param operator An Operator object that creates the filter predicate at query execution time.
	 */
	public where(operator: Operator<number>): Query {
		return new Query(this, operator);
	}

	/**
	 * Returns the indexes of all rows in the table with an optional filter criteria.
	 * @private
	 */
	* indexes(operator?: Operator<number>): IterableIterator<number> {
		const predicate = operator ? operator() : () => true;

		for (let i = 0, l = this.rows; i < l; ++i) {
			if (predicate(i)) {
				yield i;
			}
		}
	}
}
