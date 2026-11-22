const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    position: String,
    department: String
});

module.exports = mongoose.model('Student', studentSchema);
