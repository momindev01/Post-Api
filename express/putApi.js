const express = require('express');
const dns = require('node:dns');
const connectDB = require('./db/mongoDB');
const Student = require('./models/studentModal');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

connectDB();

app.use(express.json());

app.put('/student/:id', async (req, res) => {
    try{
        const studentId = req.params.id;
        const { name, password , email, department } = req.body;
        const updateStudent = await Student.findByIdAndUpdate(
            studentId,
            { name, password, email, department },
            { new : true }
        );
        if(!updateStudent){
            return res.status(404).json({ msg: "Student not Found"})
        }
        res.json(updateStudent);
    }
    catch (error) {
        console.log("Error updating Student Data: ",error);
        res.status(500).send("Server Error");
    }
})

app.listen(2000, () => {
    console.log("Server is running on port no 2000")
})