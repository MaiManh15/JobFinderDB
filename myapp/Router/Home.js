const Home = require("express").Router();

Home.get("/", async(req, res)=> {
    res.send('Hello, this is Home!');
});

module.exports = Home;