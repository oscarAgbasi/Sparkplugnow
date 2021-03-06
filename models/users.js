var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//user schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique:true,
        index: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    password: {
        type: String
    },
    password2: {
        type: String
    },
    address:{
        type:String
    },
    about: {
        type: String
    },
    skills: {
        type: String
    },
    stack:{
        type:String
    },
    interest1:{
        type:String
    },
    interest2:{
        type:String
    },
    interest3:{
        type:String
    },
    github: {
        type: String
    },
    twitter: {
        type: String
    },
    codepen:{
        type:String
    },
    website: {
        type: String
    },
    picture: {
        originalname: String
    }
})

//create a model of the schema
var User = module.exports = mongoose.model('User', UserSchema);


//hash password 
module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB. 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
//custom functions for accessing the database
module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
module.exports.getAllUsers = function (callback) {
    User.find({}, callback);
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
module.exports.updateUser = function (id, source, callback) {
    User.findByIdAndUpdate(id, source, callback);
}
module.exports.deleteUser = function (id, callback) {
    User.findByIdAndRemove(id, callback)
}


