
const express = require('express');
const app = express();
const cors = require("cors");
const Account = require('./Router/Account');
const Home = require('./Router/Home');
const NUser = require('./Router/NUser');
const BUser = require('./Router/BUser');
const Job = require('./Router/Job');
const job_normal_user = require('./Router/NUser_Job');
const job_business_user = require('./Router/BUser_Job');

app.use(cors());
app.use(express.json());

app.use("/NUser", NUser);
app.use("/accounts", Account);
app.use("/BUser", BUser);
app.use("/Jobs", Job);
app.use("/NUserJobs", job_normal_user);
app.use("/BUserJobs", job_business_user);


app.get('/', Home);
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

