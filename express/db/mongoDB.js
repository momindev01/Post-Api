
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://<user>:<password>@cluster0.ckonicz.mongodb.net/studentDB'
        );

        console.log("Mongo DB Connected Successfully");
    }
    catch (err) {
        console.log("Mongo DB Connection Error:", err);
    }
};

module.exports = connectDB;
