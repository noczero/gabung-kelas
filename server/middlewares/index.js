import {expressjwt} from "express-jwt";
import {envar} from "../config/envar";

// verify token
export const requireSignin = expressjwt({
    getToken: (req) => req.cookies.token,
    secret: envar.jwt.secret,
    algorithms: ["HS256"],
});