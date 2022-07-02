import mongoose from "mongoose";
const {ROLE_ADMIN, ROLE_STUDENT, ROLE_INSTRUCTOR} = require('../constants');

const {Schema} = mongoose;

// User Schema
const userSchema = new Schema({
        email: {
            type: String,
            required: () => {
                return this.provider !== 'email' ? false : true;
            }
        },
        phoneNumber: {
            type: String
        },
        fullName: {
            type: String
        },
        password: {
            type: String
        },
        agreement: {
            type: Boolean
        },
        provider: {
            type: String,
            required: true,
            default: 'email'
        },
        googleId: {
            type: String
        },
        facebookId: {
            type: String
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            default: ROLE_STUDENT,
            enum: [ROLE_ADMIN, ROLE_STUDENT, ROLE_INSTRUCTOR]
        },
        resetPasswordToken: {type: String},
        resetPasswordExpires: {type: Date},
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User',userSchema)
