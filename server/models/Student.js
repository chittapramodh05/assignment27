const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // MANY-TO-MANY Relationship setup
  // A Student can be enrolled in MULTIPLE Courses.
  // We store an array of Course ObjectIds.
  enrolledCourses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
