const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const { register, login } = require("./controller/auth.controller");
const { apiKey } = require("./middleware/api_token");
const { jwtToken } = require("./middleware/jwt");
const { index, create, destroy } = require("./controller/book.controller");
const { storage, fileFilter } = require("./lib/multer")
const multer = require('multer')


dotenv.config()

// initial setting
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const upload = multer({ storage, fileFilter })
// end initial setting




// initial routes
app.post('/api/auth/register', apiKey, register);
app.post('/api/auth/login', apiKey, login);

app.get('/api/books', apiKey, jwtToken, index)
app.post('/api/book/create', apiKey, jwtToken, upload.single('img'), create)
app.delete('/api/book/delete/:id', apiKey, jwtToken, destroy)
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