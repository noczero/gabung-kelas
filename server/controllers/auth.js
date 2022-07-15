import {api_response} from "../message/response";
import User from "../models/user";
import {comparePassword, hashPassword} from "../utils/auth";
import {envar} from "../config/envar";
import jwt from "jsonwebtoken";
import {nanoid, customAlphabet} from 'nanoid/async'
import {sendEmail} from "../services/mail";
import {USER_STATUS_ACTIVE} from "../constants";

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
            phoneNumber: `${countryCode}${phoneNumber}`,
            emailVerificationCode: await customAlphabet('1234567890', 6)(), // 6 digit number
            emailVerificationExpires: Date.now() + 3600000 // + 1 hours
        });
        // generate verification code

        const dbResult = await user.save();

        // send email for welcoming
        await sendEmail(email, 'signup', null, fullName)

        // account verification
        const emailContent = {
            fullName: user.fullName,
            emailVerificationCode: user.emailVerificationCode,
            emailVerificationExpires: user.emailVerificationExpires
        }
        await sendEmail(user.email, 'account-verification', null, emailContent)

        // send back response
        res.status(201).send(api_response('00', `Registrasi berhasil dilakukan. Silahkan login ${fullName} menggunakan ${email}.`, [{
            id: dbResult.id,
            email: dbResult.email,
            fullName: dbResult.fullName,
            role: dbResult.role
        }]))
    } catch (error) {
        // res.status(500).send(failed_message)
        console.error(error)
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
        console.error(err);
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


export const currentUser = async (req, res) => {
    try {
        // The decoded JWT payload is now available as req.auth rather than req.user
        if (req.auth) {
            const user = await User.findById(req.auth._id).select('-password') // exclude current user
            return res.send(api_response('00', 'Success', [user]))
        } else {
            res.sendStatus(403);
            return res.send(api_response('01', 'Failed, invalid request body'))
        }
        // return res.send(api_response('00','Test'))
    } catch (e) {
        console.error(e)
        res.sendStatus(403);
        return res.send(api_response('01', 'Invalid authorization due token verification'))
    }
}


export const forgetPassword = async (req, res) => {
    // will send secret code to email
    try {
        const {email} = req.body
        if (!email) return res.status(400).send(api_response('01', "Field email diperlukan!"))

        // generate code
        const shortCode = (await nanoid(6)).toUpperCase()

        // find user and update it
        const user = await User.findOneAndUpdate(
            {email},
            {resetPasswordToken: shortCode, resetPasswordExpires: Date.now() + 3600000}
        );

        // if not found
        if (!user) return res.status(400).send(api_response('01', 'Tidak ada user dengan email ini.'));

        await sendEmail(email, 'forgot-password', null, {code: shortCode, fullName: user.fullName})

        return res.status(200).send(api_response('00', `Kode verifikasi sedang dikirim ke ${email}. Silahkan cek email kamu.`))

    } catch (e) {
        console.error(e)
        return res.status(500).send(api_response('01', 'Terjadi kesalahan'))
    }
}

export const resetPassword = async (req, res) => {
    try {

        const {newPassword, code} = req.body

        if (!newPassword) return res.status(400).send(api_response('01', 'Password baru diperlukan'))
        if (!code) return res.status(400).send(api_response('01', 'Kode verifikasi diperlukan'))

        // find user
        const resetUser = await User.findOne({
            resetPasswordToken: code,
            resetPasswordExpires: {$gt: Date.now()}
        });

        if (!resetUser) return res.status(400).send(api_response('01', 'Kode verifikasi salah atau sudah usang. Silahkan coba kembali'))

        // hash password
        // update the user
        resetUser.password = await hashPassword(newPassword);
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;
        resetUser.save();

        await sendEmail(resetUser.email, 'reset-confirmation', null, {fullName: resetUser.fullName});

        return res.status(200).send(api_response('00', 'Password berhasil diperbarui. Silahkan login kembali'))
    } catch (e) {
        console.error(e)
        return res.status(500).send(api_response('01', 'Terjadi kesalahan'))
    }
}


export const verifyUser = async (req, res) => {
    try {
        const {emailVerificationCode} = req.body

        const user = await User.findById(req.auth._id)
        if (!user) return res.status(400).send(api_response('01', 'User tidak ditemukan'))

        if (user.emailVerificationCode !== emailVerificationCode) return res.status(400).send(api_response('01', 'Kode verifikasi salah.'))
        if (user.emailVerificationExpires < Date.now()) return res.status(400).send(api_response('01', 'Kode verifikasi sudah usang, silahkan kirim ulang.'))

        // update field
        user.emailVerificationCode = undefined
        user.emailVerificationExpires = undefined
        user.status = USER_STATUS_ACTIVE
        user.save()

        await sendEmail(user.email, 'account-verification-success', null, {fullName: user.fullName})

        return res.status(200).send(api_response('00', 'Verifikasi akun berhasil.'))

    } catch (e) {
        console.error(e)
        return res.status(500).send(api_response('01', 'Terjadi kesalahan'))
    }
}

export const resendVerificationCode = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id)
        if (!user) return res.status(400).send(api_response('01', 'User tidak ditemukan'))

        // update field
        user.emailVerificationCode = await customAlphabet('1234567890', 6)()
        user.emailVerificationExpires = Date.now() + 3600000
        user.status = USER_STATUS_ACTIVE
        user.save()

        const emailContent = {
            fullName: user.fullName,
            emailVerificationCode: user.emailVerificationCode,
            emailVerificationExpires: user.emailVerificationExpires
        }

        await sendEmail(user.email, 'account-verification', null, emailContent)

        return res.status(200).send(api_response('00', 'Kode verifikasi sedang dikirim. Silahkan cek email kamu.'))

    } catch (e) {
        console.error(e)
        return res.status(500).send(api_response('01', 'Terjadi kesalahan'))
    }
}