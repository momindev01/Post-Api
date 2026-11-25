const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    password: String || Number,
    email: String,
    department: String
});

module.exports = mongoose.model('Student', studentSchema);
