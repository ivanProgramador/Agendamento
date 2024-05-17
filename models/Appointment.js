const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
    name:String,
    email:String,
    descritption: String,
    cpf: String,
    date: Date,
    time: String
});

module.exports = appointment;