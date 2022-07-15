import mongoose from "mongoose";

const {ROLE_ADMIN, ROLE_SUBSCRIBER, ROLE_INSTRUCTOR, USER_STATUS_ACTIVE, USER_STATUS_INACTIVE} = require('../constants');

const {Schema} = mongoose;

// User Schema
const userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            required: () => {
                return this.provider !== 'email' ? false : true;
            }
        },
        phoneNumber: {
            type: String
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 64
        },
        agreement: {
            type: Boolean,
            default: true
        },
        status : {
            type : String,
            default : USER_STATUS_INACTIVE,
            enum : [USER_STATUS_INACTIVE, USER_STATUS_ACTIVE]
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
        picture: {
            type: String,
            default: "/avatar.png"
        },
        role: {
            type: [String],
            default: [ROLE_SUBSCRIBER],
            enum: [ROLE_ADMIN, ROLE_SUBSCRIBER, ROLE_INSTRUCTOR]
        },
        stripeAccountId: "",
        stripeSeller: {},
        stripeSession: {},
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        emailVerificationCode : {
            type: String
        },
        emailVerificationExpires : {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema)
