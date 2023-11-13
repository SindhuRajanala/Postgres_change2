const Pool = require('pg').Pool
const pool = new Pool({
	  user: 'admin',
	  host: 'localhost',
	  database: 'uhainsurce',
	  password: 'OurDbMachine%12151992',
	  port: 5432,
});
