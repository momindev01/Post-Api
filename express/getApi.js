const express = require('express');
const dns = require('node:dns');
const connectDB = require('./db/mongoDB');
const Student = require('./models/studentModal');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

connectDB();

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching Employees Data: ", error);
        res.status(500).send("Server Error");
    }
})

app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ msg : 'Student Not Found'})
        }
        res.json(student)
    }
    catch (error) {
        console.error("Error fetching Employee Data: ", error);
        res.status(500).send("Server Error");
    }
})

app.listen(2000, () => {
    console.log("Server is running on port 2 Tarzan")
})