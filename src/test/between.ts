import { Column, Table } from '../core';

// create a table
const table = new Table('ranges');
const name = new Column('name');
const from = new Column('from');
const to = new Column('to');
table.add(name, from, to);

// create some data
for (let year = 1000; year < 3000; ++year) {
	table.insert({ name: `${year} - ${year + 5}`, from: new Date(year, 0, 1), to: new Date(year + 5, 11, 31) });
}

// create a query in two steps, showing cascading qu
const today = new Date();
const query1 = table.where(from.evaluate(value => value <= today));
const query2 = query1.where(to.evaluate(value => value >= today));

for (const row of query2.select(name)) {
	console.log(row);
}
