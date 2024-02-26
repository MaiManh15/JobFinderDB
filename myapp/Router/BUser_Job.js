const JobFinderDb = require("../db");
const job_business_user = require("express").Router();

//create new job_business_user
job_business_user.post("/:user_id/:job_id", async(req, res) => {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    console.log(req.params);
    console.log(req.params.user_id);
    console.log(req.params.job_id);
    const {user_id} = req.params.user_id;
    const {job_id} = req.params.job_id;
    const { rating, review} = req.body;
    const result = await conn.query(
        `INSERT INTO job_business_user(job_id, user_id, rating, review)
        VALUES ($1, $2, $3, $4);`,[job_id, user_id, rating, review]);
    res.json(result);
});


//get all job_business_user
job_business_user.get("/", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const result = await conn.query(`SELECT * FROM job_business_user`);
    res.json(result.rows);
});


//get job_business_user by job_id
job_business_user.get("/:job_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {job_id} = req.params;
    const result = await conn.query(`SELECT * FROM job_business_user where "job_id" = $1 `, [job_id]);
    res.json(result.rows[0]);
});


//Update job_business_user
job_business_user.put("/:job_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {job_id} = req.params;
    const { rating, review} = req.body;
    const result = await conn.query(
        `UPDATE job_business_user
        SET rating=$2, review=$3
        WHERE "job_id" = $1;`, [job_id, rating, review]);
    res.json("job_business_user was updated!");
});

//delete job_business_user
job_business_user.delete("/:job_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {job_id} = req.params;
    const result = await conn.query(
        `DELETE FROM job_business_user
        WHERE "job_id" = $1`, [job_id]);
    res.json("job_business_user was deleted!");
});

module.exports = job_business_user;