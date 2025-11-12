const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const { register, login } = require("./controller/auth.controller");

dotenv.config()

// initial setting
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// end initial setting

// initial routes
app.post('/api/auth/register', register );
app.post('/api/auth/login', login );
// end routes


// start server
app.listen(process.env.PORT, (err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server start on : http://localhost:${process.env.PORT}`);
  }
});
// end start server