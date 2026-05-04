const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ONE-TO-MANY Virtual: A Course has many Lessons
CourseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course'
});

// MANY-TO-MANY Virtual: A Course has many Students, and a Student has many Courses.
// We maintain the ID array on the Student model, so we virtualize it on the Course.
CourseSchema.virtual('students', {
  ref: 'Student',
  localField: '_id',
  foreignField: 'enrolledCourses'
});

module.exports = mongoose.model('Course', CourseSchema);
