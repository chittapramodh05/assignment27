require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const Student = require('./models/Student');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected to', process.env.MONGODB_URI))
  .catch(err => console.log('DB Connection Error:', err));

// --- COURSE ROUTES ---
app.get('/api/courses', async (req, res) => {
  try {
    // Populate the 1-to-N (lessons) and N-to-M (students) relationships!
    const courses = await Course.find()
      .populate('lessons')    // 1-to-N
      .populate('students');  // N-to-M
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    // Cleanup relationships
    await Lesson.deleteMany({ course: req.params.id });
    await Student.updateMany(
      { enrolledCourses: req.params.id },
      { $pull: { enrolledCourses: req.params.id } }
    );
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LESSON ROUTES (One-to-Many) ---
app.post('/api/lessons', async (req, res) => {
  try {
    const lesson = new Lesson(req.body); // requires title, course
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/lessons/:id', async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- STUDENT ROUTES (Many-to-Many) ---
app.get('/api/students', async (req, res) => {
  try {
    // Populate the courses!
    const students = await Student.find().populate('enrolledCourses');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body); 
    await student.save();
    const populatedStudent = await Student.findById(student._id).populate('enrolledCourses');
    res.status(201).json(populatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update student (e.g. adding/removing enrolled courses)
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('enrolledCourses');
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
