const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
        timstamps: true
});

// static signup method
// encryption to be added later
userSchema.statics.signup = async function(username, password, email) {

    // validation
    if (!username || !password || !email) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
/*     if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    } */

    const user = await this.create({username, password, email});

    return user;
};

// static login method
userSchema.statics.login = async function(username, password) {
    // validation
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
/*     if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    } */

    const user = await this.findOne({username});

    if (!user) {
        throw Error('Incorrect username');
    };

    if (password != user.password) {
        throw Error('Incorrect password');
    };

    return user;
};

module.exports = mongoose.model('User', userSchema);
