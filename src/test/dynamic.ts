import { Table, Column } from '../core';

// some names to generate a membership database with
const givenNames = ['Boris', 'Theresa', 'David', 'Gordon', 'Tony', 'John', 'Margaret', 'James', 'Harold', 'Edward'];
const familyNames = ['Johnson', 'May', 'Cameron', 'Brown', 'Blair', 'Major', 'Thatcher', 'Callaghan', 'Wilson', 'Heath'];
const counties = ['Cambridgeshire', 'East Sussex', 'Essex', 'Kent', 'Suffolk', 'West Sussex'];

// return a random entry from an array of strings
function random(strings: Array<string>): string {
	return strings[Math.floor(Math.random() * strings.length)];
}

// create a table with some columns
const membership = new Table('membership');
const id = new Column('id');
const givenName = new Column('givenName');
const familyName = new Column('familyName');
membership.add(id, givenName, familyName);

// populate the table with some random data
for (let id = 0; id < 10; id++) {
	const row = { id: id, givenName: random(givenNames), familyName: random(familyNames), county: random(counties) };
	const index = membership.insert(row);
}

const county = new Column('county').to(c => c || "Not specified");
membership.add(county);

// populate the table with some more random data, this time with the county column in place
for (let id = 10; id < 20; id++) {
	const row = { id: id, givenName: random(givenNames), familyName: random(familyNames), county: random(counties) };
	const index = membership.insert(row);
}

// run a query
for (const member of membership.where(givenName.in(['David', 'James'])).select(id, givenName, familyName, county)) {
	console.log(member);
}
