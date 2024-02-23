
const express = require('express');
const app = express();
const cors = require("cors");
const Account = require('./Router/Account');
const Home = require('./Router/Home');
const NUser = require('./Router/NUser');

app.use(cors());
app.use(express.json());

app.use("/NUser", NUser);
app.use("/accounts", Account);


app.get('/', Home);
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

