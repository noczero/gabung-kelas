import express from 'express';
import cors from 'cors';
import {readdirSync} from "fs";
import csrf from "csurf";
import cookieParser from "cookie-parser"

const morgan = require('morgan');

// utils
import {envar} from "./config/envar"; // environment variable
import {setupDB} from "./utils/db";
import {api_response} from "./message/response"; // mongodb database setup connection

// services
import {testEmail} from "./services/mail";

// csrf
const csrfProtection = csrf({cookie:true})

// create express app
const app = express();

// applied middlewares (some code will run before send back to our client).
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // get cookie data
app.use(morgan('dev'));
// app.use((req,res,next) => {
//     console.log("this is own middleware")
//     next();
// });

// invoke database setup
setupDB().then(r => console.log("try to connect MongoDB..."));

// mail server
testEmail().then(r => console.log("try to connect mail Service..."))

// import route folders sync
readdirSync('./routes').map((r) =>
    app.use(`/${envar.app.apiPrefix}`,require(`./routes/${r}`))
);

// apply csrf
app.use(csrfProtection);
app.get(`/${envar.app.apiPrefix}/csrf-token`, async (req,res) => {
    try {
        res.send({csrfToken: req.csrfToken()});
    } catch (e) {
        console.log(e)
        return res.send(api_response('01','Failed, generate csrf'))
    }
})

// run port
app.listen(envar.port,'0.0.0.0', ()=>console.log(`server is running on port ${envar.port}`));
