const JobFinderDb = require("../db");
const Job = require("express").Router();

//create new Job
Job.post("/", async(req, res) => {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {Job_id, date, salary, status, employee_amount, Job_title, start_time, end_time} = req.body;
    const result = await conn.query(
        `INSERT INTO Job(
        "Job_id", date, salary, status, employee_amount, "Job_title", start_time, end_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,[Job_id, date, salary, status, employee_amount, Job_title, start_time, end_time]);
    res.json(result);
});


//get all Job
Job.get("/", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const result = await conn.query(`SELECT * FROM Job`);
    res.json(result.rows);
});


//get Job by Job_id
Job.get("/:Job_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {Job_id} = req.params;
    const result = await conn.query(`SELECT * FROM Job where "Job_id" = $1 `, [Job_id]);
    res.json(result.rows[0]);
});


//Update Job
Job.put("/:Job_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {Job_id} = req.params;
    const {date, salary, status, employee_amount, Job_title, start_time, end_time} = req.body;
    const result = await conn.query(
        `UPDATE Job
        SET date=$2, salary=$3, status=$4, employee_amount=$5, "Job_title"=$6, start_time=$7, end_time=$8
        WHERE "Job_id" = $1;`, [Job_id, date, salary, status, employee_amount, Job_title, start_time, end_time]);
    res.json("Job was updated!");
});

//delete Job
Job.delete("/:Job_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {Job_id} = req.params;
    const result = await conn.query(
        `DELETE FROM Job
        WHERE "Job_id" = $1`, [Job_id]);
    res.json("Job was deleted!");
});

module.exports = Job;