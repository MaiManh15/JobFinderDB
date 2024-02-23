const JobFinderDb = require("../db");
const NUser = require("express").Router();

//create new NUser
NUser.post("/:account_id", async(req, res) => {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {account_id} = req.params;
    const {NUser_id, NUser_email, NUser_phone_num, NUser_name, age} = req.body;
    const result = await conn.query(
        `INSERT INTO public."Normal_User"( "NUser_id", account_id, "NUser_email", "NUser_phone_num", "NUser_name", age) 
        VALUES ($1, $2, $3, $4, $5, $6)`,[NUser_id, account_id, NUser_email, NUser_phone_num, NUser_name, age]);
    res.json(result);
});


//get all NUser
NUser.get("/", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const result = await conn.query(`SELECT * FROM public."Normal_User"`);
    res.json(result.rows);
});


//get NUser by NUser_id
NUser.get("/:NUser_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {NUser_id} = req.params;
    const result = await conn.query(`SELECT * FROM public."Normal_User" where "NUser_id" = $1 `, [NUser_id]);
    res.json(result.rows[0]);
});


//Update NUser
NUser.put("/:NUser_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {NUser_id} = req.params;
    const {NUser_email, NUser_phone_num, NUser_name, age} = req.body;
    const result = await conn.query(
        `UPDATE public."Normal_User" 
        SET "NUser_email"=$2, "NUser_phone_num"=$3, "NUser_name"=$4, age=$5
        WHERE "NUser_id" = $1`, [NUser_id, NUser_email, NUser_phone_num, NUser_name, age]);
    res.json("NUser was updated!");
});

//delete NUser
NUser.delete("/:NUser_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {NUser_id} = req.params;
    const result = await conn.query(
        `DELETE FROM public."Normal_User"
        WHERE "NUser_id" = $1`, [NUser_id]);
    res.json("NUser was deleted!");
});

module.exports = NUser;