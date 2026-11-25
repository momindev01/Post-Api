const express = require('express');
const dns = require('node:dns');
const connectDB = require('./db/mongoDB');
const Student = require('./models/studentModal');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

connectDB();

app.use(express.json());

app.patch('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: updatedData },
            { new : true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ msg : "Student not found"})
        }
        res.json(updatedStudent)
    }
    catch (error) {
        console.log("Error updating Data: ", error);
        res.status(500).send("Server Error")
    }
})

app.listen(2000, () => {
    console.log("Server is running on port 2 Tarzan")
})