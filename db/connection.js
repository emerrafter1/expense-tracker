const {Pool} = require("pg")



const ENV = process.env.NODE_ENV || 'development'

//load environment variables
require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})


if (!process.env.PGDATABASE) {
    throw new Error("PGDATABASE not set")
} else { 
    console.log(`Connected to ${process.env.PGDATABASE} `)
}

const db = new Pool();

module.exports = db;
