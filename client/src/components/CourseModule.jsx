import React, { useState } from 'react';
import { createCourse, deleteCourse, createLesson, deleteLesson } from '../api';

const CourseModule = ({ courses, refresh }) => {
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });
  const [newLesson, setNewLesson] = useState({ title: '', content: '', courseId: '' });

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name) return;
    await createCourse(newCourse);
    setNewCourse({ name: '', description: '' });
    refresh();
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    if (!newLesson.title || !newLesson.courseId) return;
    await createLesson({ title: newLesson.title, content: newLesson.content, course: newLesson.courseId });
    setNewLesson({ title: '', content: '', courseId: '' });
    refresh();
  };

  return (
    <div>
      <h2>Course & Lesson Management</h2>
      <p>Demonstrating a <strong>One-to-Many (1:N)</strong> relationship. A Course can contain multiple Lessons, but a Lesson belongs to only one Course.</p>
      
      <div>
        {/* Create Form */}
        <div>
          <h3>Add New Course</h3>
          <form onSubmit={handleCreateCourse}>
            <label>Course Name: </label>
            <input 
              value={newCourse.name} 
              onChange={e => setNewCourse({...newCourse, name: e.target.value})} 
              placeholder="e.g. Advanced Mathematics" 
            />
            <br />
            <label>Description: </label>
            <textarea 
              value={newCourse.description} 
              onChange={e => setNewCourse({...newCourse, description: e.target.value})} 
              placeholder="Course overview..." 
              rows="3"
            />
            <br />
            <button type="submit">Create Course</button>
          </form>

          <hr />

          <h3>Add Lesson to Course</h3>
          <form onSubmit={handleCreateLesson}>
            <label>Select Parent Course: </label>
            <select 
              value={newLesson.courseId} 
              onChange={e => setNewLesson({...newLesson, courseId: e.target.value})}
            >
              <option value="">-- Choose a Course --</option>
              {courses.map(c => (
                <option key={c.id || c._id} value={c.id || c._id}>{c.name}</option>
              ))}
            </select>
            <br />
            <label>Lesson Title: </label>
            <input 
              value={newLesson.title} 
              onChange={e => setNewLesson({...newLesson, title: e.target.value})} 
              placeholder="e.g. Intro to Calculus" 
            />
            <br />
            <button type="submit">Add Lesson</button>
          </form>
        </div>
        <hr />
        {/* Display List */}
        <div>
          {courses.length === 0 ? <p>No courses available. Create one!</p> : null}
          {courses.map(course => (
            <div key={course._id || course.id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
              <div>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <button onClick={async () => { await deleteCourse(course.id || course._id); refresh(); }}>
                  Delete Course
                </button>
              </div>

              <div>
                <h4>Lessons ({course.lessons?.length || 0})</h4>
                {course.lessons && course.lessons.length > 0 ? (
                   <ul>
                     {course.lessons.map(lesson => (
                       <li key={lesson._id || lesson.id}>
                         {lesson.title}{' '}
                         <button onClick={async () => { await deleteLesson(lesson._id || lesson.id); refresh(); }}>
                           Delete
                         </button>
                       </li>
                     ))}
                   </ul>
                ) : (
                  <p>No lessons found for this course.</p>
                )}
              </div>
              
              <div>
                  <p>Enrolled Students: {course.students?.length || 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseModule;
