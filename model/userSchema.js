const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: Number,
        unique: true,
    },
    work: {
        type: String,
    },
    password: {
        type: String,
    },
    social: [
        {
            socialName: String,
            link: String
        }
    ],
    profilePic: String,
    messages: [
        {
            message: String,
            date: {
                type: Date,
                default: Date
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]
}, { timestamps: true })

// hashing the password
userschema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userschema.methods = {
    generateAuthToken: async function () {
        try {
            // generate toekn
            let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            // over write token
            this.tokens = this.tokens.concat({ token: token })

            this.save();

            return token;
        } catch (error) {
            console.log(error);
        }
    }
}

const Users = mongoose.model("USERS", userschema);

module.exports = Users;

