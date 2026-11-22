
const express = require('express');
const connectDB = require('./db/mongoDB');
const Student = require('./models/studentModal');

const app = express();

connectDB();

app.use(express.json());



app.post('/students', async (req, res) => {
    try {
        const { name, email, position, department } = req.body;

        const newStudent = new Student({
            name,
            email,
            position,
            department
        });

        const student = await newStudent.save();

        res.status(201).json({
            msg: 'Student created successfully',
            student
        });
    }
    catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});



app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});



app.get('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                msg: 'Student not found'
            });
        }

        res.status(200).json(student);
    }
    catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});



app.put('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const { name, email, position, department } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            {
                name,
                email,
                position,
                department
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                msg: 'Student not found'
            });
        }

        res.status(200).json({
            msg: 'Student updated successfully',
            student: updatedStudent
        });
    }
    catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});



app.patch('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                msg: 'Student not found'
            });
        }

        res.status(200).json({
            msg: 'Student updated successfully',
            student: updatedStudent
        });
    }
    catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});



app.delete('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({
                msg: 'Student not found'
            });
        }

        res.status(200).json({
            msg: 'Student deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});



app.listen(2000, () => {
    console.log('Server is running on port no 2000');
});
