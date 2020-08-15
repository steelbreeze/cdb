import { Predicate } from '../types';
/**
 * Performs a logical and operation of other predicates used within a query.
 * @param predicates An arbitory number of predicates, all of which must return true for this predicate to return true.
 * @returns Returns the predicate to be used within a query where method.
 */
export declare function and(...predicates: Array<Predicate>): Predicate;
