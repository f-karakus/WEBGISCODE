const Pool = require('pg').Pool
require("dotenv").config()

const pool = new Pool({
    user: 'postgres',
    password: 'lGyEH6Oj9z3cz5tZf7E5',
    host: 'containers-us-west-106.railway.app',
    port: 7156,
    database:'railway'

})
module.exports = pool

