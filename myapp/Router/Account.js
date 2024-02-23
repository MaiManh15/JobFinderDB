const JobFinderDb = require("../db");
const Account = require("express").Router();

//create account
Account.post("/", async(req, res) => {
  const db1 = JobFinderDb.getInstance();
  const conn = await db1.connect();
  const {account_id, password, type} = req.body;
  const newAccount = await conn.query("INSERT INTO account(account_id, password, type) VALUES ($1, $2, $3)",[account_id, password, type]);
  res.json(newAccount);
});

//get all account
Account.get("/", async(req, res)=> {
  try {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const results = await conn.query("SELECT * FROM account");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        account: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
  
});

//find account by account_id
Account.get("/:account_id", async (req, res) => {
  try {
    const db1 = JobFinderDb.getInstance();
    const conn = await db1.connect();
    const { account_id } = req.params;
    const account = await conn.query(`SELECT * FROM account WHERE account_id = $1`, [account_id]);
    res.status(200).json({
      status: "success",
      results: account.rows.length, 
      data: {
        account: account.rows, 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});


//update account
Account.put("/:account_id", async(req, res)=>{
  const db1 = JobFinderDb.getInstance();
  const conn = await db1.connect();
  const {account_id} = req.params;
  const {password} = req.body;
  const updatePassword= await conn.query("UPDATE account SET password = $1 WHERE account_id = $2", [password,account_id]);
  res.json("password was updated!");
})

//delete account
Account.delete("/:account_id", async(req, res)=>{
  const db1 = JobFinderDb.getInstance();
  const conn = await db1.connect();
  const {account_id} = req.params;
  const deletePassword= await conn.query("DELETE FROM account WHERE account_id = $1", [account_id]);
  res.json("password was deleted!");
})

module.exports = Account;