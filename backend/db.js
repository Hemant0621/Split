// backend/db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/Splitbill")


const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const PartySchema = new mongoose.Schema({
    Id : {
        type : String,
        require : true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require : true
    },
    balance:{
        type: mongoose.Types.Decimal128,
        require : true
    },
    total : {
        type: mongoose.Types.Decimal128,
        require : true
    }
})

const User = mongoose.model('User', userSchema); 
const Party = mongoose.model('Party', PartySchema);

module.exports = {
	User,   
    Party
};