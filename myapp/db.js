
require('dotenv').config();

const {Pool} = require("pg");

const config={
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
};

class JobFinderDb {

    constructor() {
        this.conn = null;
        this.pool = new Pool(config);
    }

    static getInstance() {
        if(!JobFinderDb.instance) {
            JobFinderDb.instance = new JobFinderDb();
        }

        return JobFinderDb.instance;
    }

    async connect() {
        // connect to database
        if(!this.conn){
            this.conn = await this.pool.connect();
        }

        return this.conn;
    }

    async query(text, params) {
        if(!this.conn){
            return "err";
        }

        const result = await this.conn.query(text, params);
        return result;

    }

    async close() {
        this.conn = await this.pool.end();
    }

}

module.exports = JobFinderDb;