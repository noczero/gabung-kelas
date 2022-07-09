import {api_response} from "../message/response";
import User from "../models/user";
import bcrypt from "bcrypt";
import {comparePassword, hashPassword} from "../utils/auth";
import {envar} from "../config/envar";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        // res.status(200).send(success_message)
        const {email, fullName, phoneNumber, password, agreement, countryCode} = req.body;

        // form validation
        if (!email) {
            return res
                .status(400)
                .send(api_response("01", "Email diperlukan"));
        }

        if (!fullName) {
            return res.status(400).send(api_response("01", "Nama lengkap diperlukan"));
        }

        if (!password || password.length < 8) {
            return res.status(400).send(api_response("01", "Password diperlukan dan panjangnya harus lebih besar dari 8 karakter"));
        }

        if (!agreement) {
            return res.status(400).send(api_response("01", "Ketentuan dan kebijakan diperlukan"));
        }

        // check existing user
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res
                .status(400)
                .send(api_response("01", "Email sudah digunakan, silahkan menggunakan email tersebut untuk login atau registrasi dengan email baru"));
        }

        // hash password
        const hashedPassword = await hashPassword(password);

        // insert user to db
        const user = new User({
            email,
            password: hashedPassword,
            fullName,
            agreement,
            phoneNumber: `${countryCode}${phoneNumber}`
        });
        const dbResult = await user.save();

        // send back response
        res.status(201).send(api_response('00', `Registrasi berhasil dilakukan. Silahkan login ${fullName} menggunakan ${email}.`, [{
            id: dbResult.id,
            email: dbResult.email,
            fullName: dbResult.fullName,
            role: dbResult.role
        }]))
    } catch (error) {
        // res.status(500).send(failed_message)
        console.log(error)
        res.status(500).send(api_response('01', 'Something wrong'))
    }
}


export const loginUser = async (req, res) => {
    try {
        // console.log(req.body);
        const {email, password} = req.body;

        if (!email) {
            return res.status(400).send(api_response("01", "Email diperlukan"));
        }

        if (!password) {
            return res.status(400).send("01", "Password diperlukan");
        }

        // check if our db has user with that email
        const user = await User.findOne({email}).exec();
        if (!user) return res.status(400).send(api_response("01", "Tidak ada user dengan email ini."));

        // check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send(api_response("01", "Password anda salah, silahkan coba lag.i"));
        }

        // create signed jwt
        const token = jwt.sign({_id: user._id}, envar.jwt.secret, {
            expiresIn: envar.jwt.tokenLife,
        });
        if (!token) {
            throw new Error();
        }

        // return user and token to client, exclude hashed password
        user.password = undefined;

        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // only works on https
        });

        // send user as json response
        res.send(api_response("00", `Selamat datang ${user.fullName}, kamu berhasil masuk.`, [user]));
    } catch (err) {
        console.log(err);
        return res.status(400).send("01", "Something went wrong");
    }
};

export const logoutUser = async (req, res) => {
    try {
        // clear cookie
        res.clearCookie("token");

        return res.send(api_response('00', 'Anda berhasil keluar'))
    } catch (err) {
        console.log(err);
    }
}
