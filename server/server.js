import express from 'express';
import cors from 'cors';
import {readdirSync} from "fs";

const morgan = require('morgan');

// utils
import {envar} from "./config/envar"; // environment variable
import {setupDB} from "./utils/db"; // mongodb database setup connection

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

// invoke database setup
setupDB().then(r => console.log("try to connect MongoDB..."));

// import route folders sync
readdirSync('./routes').map((r) =>
    app.use(`/${envar.app.apiPrefix}`,require(`./routes/${r}`))
);

// run port
app.listen(envar.port,'0.0.0.0', ()=>console.log(`server is running on port ${envar.port}`));
