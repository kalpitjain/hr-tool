const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const candidatesRouter = require("./src/routes/candidates");
const hrRouter = require("./src/routes/hr");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/candidates", candidatesRouter);
app.use("/hr", hrRouter);

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
