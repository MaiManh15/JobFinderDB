
const express = require('express');
const app = express();
const cors = require("cors");
const Account = require('./callback/Account');

app.use(cors());
app.use(express.json());

app.use("/accounts", Account);

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
