import express from 'express';
import cors from 'cors';
import {readdirSync} from "fs";

const morgan = require('morgan');
require('dotenv').config();

// create express app
const app = express();

// applied middlewares (some code will run before send back to our client).
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req,res,next) => {
    console.log("this is own middleware")
    next();
});

// import route folders sync
readdirSync('./routes').map((r) =>
    app.use('/api',require(`./routes/${r}`))
);


// run port
const port = process.env.PORT || 8080; // || means if not available use 8001
app.listen(port,'0.0.0.0', ()=>console.log(`server is running on port ${port}`));
