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
                .json({error: 'email is required'});
        }

        if (!fullName) {
            return res.status(400).json({error: 'fullname is required'});
        }

        if (!password || password.length < 8) {
            return res.status(400).json({error: 'password is required and should be min 8 characters long '});
        }

        if (!agreement) {
            return res.status(400).json({error: 'you must accept agreement.'});
        }

        // check existing user
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res
                .status(400)
                .json({error: 'That email address is already in use.'});
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
        res.status(201).send(api_response('00', 'success', [{
            id: dbResult.id,
            email: dbResult.email,
            fullName: dbResult.fullName,
            role: dbResult.role
        }]))
    } catch (error) {
        // res.status(500).send(failed_message)
        console.log(error)
        res.status(500).send(api_response('01', 'failed', 'err'))
    }
}