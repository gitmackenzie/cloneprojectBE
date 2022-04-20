const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userProfile: {
        type: String,
        required: true,
    },
});

// 솔트와 해시 만들기


UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')) {
    //  비밀번호 암호화
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
    
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
            // Store hash in your password DB.
        });
    });
    }
})

module.exports = mongoose.model('User', UserSchema);
