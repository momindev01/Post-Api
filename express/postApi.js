const express = require("express")
const dns = require('node:dns');
const connectDB = require("./db/mongoDB")
const Student = require("./models/studentModal")
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express()

connectDB()

app.use(express.json())

app.post('/students', async (req, res)=>{
    try{
        const {name, password, email, department } = req.body
        const newStudent = new Student({
            name,
            password,
            email,
            department
        })
        const student = await newStudent.save()
        res.json(student)
    }
    catch(error){
        console.log("Error saving data", error)
        res.status(500).send("server Error")
    }
})

app.listen(2000, ()=>{
    console.log("server is running on 2 Tarzan")
} )