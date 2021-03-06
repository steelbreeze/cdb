import { Operator, Predicate } from './types';

/**
 * Performs a logical and operation of other predicates used within a query.
 * @param operators An arbitory number of operators, all of which must return true for this predicate to return true.
 * @returns Returns the predicate to be used within a query where method.
 */
export function and(...operators: Array<Operator<number>>): Operator<number> {
	return () => {
		const predicates: Array<Predicate<number>> = operators.map(operator => operator());

		return index => { return predicates.every(predicate => predicate(index)); };
	};
}

/**
 * Performs a logical or operation of other predicates used within a query.
 * @param operators An arbitory number of operators, any of which must return true for this predicate to return true.
 * @returns Returns the predicate to be used within a query where method.
 */
export function or(...operators: Array<Operator<number>>): Operator<number> {
	return () => {
		const predicates: Array<Predicate<number>> = operators.map(operator => operator());

		return index => predicates.some(predicate => predicate(index));
	}
}

/**
 * Performs a logical not operation of other predicates used within a query.
 * @param operator A predicate whose result with be negated.
 * @returns Returns the predicate to be used within a query where method.
 */
export function not(operator: Operator<number>): Operator<number> {
	return () => {
		const predicate: Predicate<number> = operator();

		return index => !predicate(index);
	}
}
