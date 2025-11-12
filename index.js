const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')

dotenv.config()

// initial setting
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// end initial setting


// start server
app.listen(process.env.PORT, (err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server start on : http://localhost:${process.env.PORT}`);
  }
});
// end start server