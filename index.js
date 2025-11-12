const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const { register, login } = require("./controller/auth.controller");
const { apiKey } = require("./middleware/api_token");
const { jwtToken } = require("./middleware/jwt");
const { index, create, destroy, update } = require("./controller/book.controller");
const { storage, fileFilter } = require("./lib/multer")
const multer = require('multer')
const fav = require('./controller/favorite.controller')
const { roleGuard } = require("./middleware/role_guard")
const path = require('path')


dotenv.config()

// initial setting
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const upload = multer({ storage, fileFilter })
app.use(express.static(path.join(__dirname, 'storage')));

// end initial setting


// initial routes
app.post('/api/auth/register', apiKey, register);
app.post('/api/auth/login', apiKey, login);

app.get('/api/books', apiKey, jwtToken, index)
app.post('/api/book/create', apiKey, jwtToken, roleGuard, upload.single('img'), create)
app.patch('/api/book/update/:id', apiKey, jwtToken, roleGuard, upload.single('img'), update)
app.delete('/api/book/delete/:id', apiKey, jwtToken, roleGuard, destroy)

app.get('/api/favorites', apiKey, jwtToken, fav.index)
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