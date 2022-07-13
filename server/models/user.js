import mongoose from "mongoose";

const {ROLE_ADMIN, ROLE_SUBSCRIBER, ROLE_INSTRUCTOR} = require('../constants');

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
        resetPasswordToken: {type: String},
        resetPasswordExpires: {type: Date},
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema)
