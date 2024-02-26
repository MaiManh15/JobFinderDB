const JobFinderDb = require("../db");
const BUser = require("express").Router();

//create new BUser
BUser.post("/:account_id", async(req, res) => {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {account_id} = req.params;
    const {BUser_id, BUser_email, BUser_phone_num, BUser_name, business_type, detail} = req.body;
    const result = await conn.query(
        `INSERT INTO Business_User(
        "BUser_id", account_id, "BUser_email", "BUser_phone_num", "BUser_name", business_type, detail)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,[BUser_id, account_id, BUser_email, BUser_phone_num, BUser_name, business_type, detail]);
    res.json(result);
});


//get all BUser
BUser.get("/", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const result = await conn.query(`SELECT * FROM Business_User`);
    res.json(result.rows);
});


//get BUser by BUser_id
BUser.get("/:BUser_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {BUser_id} = req.params;
    const result = await conn.query(`SELECT * FROM Business_User where "BUser_id" = $1 `, [BUser_id]);
    res.json(result.rows[0]);
});


//Update BUser
BUser.put("/:BUser_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {BUser_id} = req.params;
    const {BUser_email, BUser_phone_num, BUser_name, business_type, detail} = req.body;
    const result = await conn.query(
        `UPDATE Business_User 
        SET "BUser_email"=$2, "BUser_phone_num"=$3, "BUser_name"=$4, business_type=$5, detail=$6
        WHERE "BUser_id" = $1`, [BUser_id, BUser_email, BUser_phone_num, BUser_name, business_type, detail]);
    res.json("BUser was updated!");
});

//delete BUser
BUser.delete("/:BUser_id", async(req, res)=> {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const {BUser_id} = req.params;
    const result = await conn.query(
        `DELETE FROM Business_User
        WHERE "BUser_id" = $1`, [BUser_id]);
    res.json("BUser was deleted!");
});

module.exports = BUser;