// backend/db.js
const mongoose = require('mongoose');
const { string, boolean } = require('zod');

mongoose.connect("mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/Splitbill")


const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
    },
    username:{
        type:String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
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
    total:{
        type: mongoose.Types.Decimal128,
        require : true
    },
})

const AccountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require : true
    },
    heading:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    price : {
        type: mongoose.Types.Decimal128,
        require : true
    },
    date : {
        type: Date,
        require:true
    }
})

const PartygroupSchema = new mongoose.Schema({
    Id : {
        type:String,
        ref:'Party'
    },
    location : String,
    total : {
        type: mongoose.Types.Decimal128,
        require : true
    },
    settled:boolean
})

const User = mongoose.model('User', userSchema); 
const Party = mongoose.model('Party', PartySchema);
const Partygroup = mongoose.model('Partygroup', PartygroupSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
	User,   
    Party,
    Account,
    Partygroup
};