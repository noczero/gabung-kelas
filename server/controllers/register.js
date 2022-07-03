import {api_response} from "../message/response";
import User from "../models/user";
import bcrypt from "bcrypt";
import {hashPassword} from "../utils/auth";

export const registerUser = async (req, res) => {
    try {
        // res.status(200).send(success_message)
        const {email, fullName, phoneNumber, password, agreement, countryCode} = req.body;

        // form validation
        if (!email) {
            return res
                .status(400)
                .send(api_response("01","Email diperlukan"));
        }

        if (!fullName) {
            return res.status(400).send(api_response("01","Nama lengkap diperlukan"));
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