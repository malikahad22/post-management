const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/users/index');
const postRoute = require('./routes/posts/index');
const authRoute = require('./routes/auth/index');

const connectDB = require("./config/db_config");

const responseFormatter = require("./middlewares/response-formatter/index");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(responseFormatter);

app.use('/', userRoute);
app.use('/', postRoute);
app.use('/', authRoute);


app.listen(process.env.PORT, () => {
   console.log(`Server running on port ${process.env.PORT}`);
});
