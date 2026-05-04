const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  // ONE-TO-MANY Relationship setup
  // This lesson belongs to EXACTLY ONE Course.
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
