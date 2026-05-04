import React, { useState } from 'react';
import { createStudent, deleteStudent } from '../api';

const StudentModule = ({ students, courses, refresh }) => {
  const [newStudent, setNewStudent] = useState({ name: '', email: '', enrolledCourses: [] });

  const handleToggleCourse = (courseId) => {
    setNewStudent(prev => {
      const isEnrolled = prev.enrolledCourses.includes(courseId);
      if (isEnrolled) {
        return { ...prev, enrolledCourses: prev.enrolledCourses.filter(id => id !== courseId) };
      } else {
        return { ...prev, enrolledCourses: [...prev.enrolledCourses, courseId] };
      }
    });
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;
    await createStudent(newStudent);
    setNewStudent({ name: '', email: '', enrolledCourses: [] });
    refresh();
  };

  return (
    <div>
      <h2>Student Enrollment</h2>
      <p>Demonstrating a <strong>Many-to-Many (N:M)</strong> relationship. A Student can enroll in multiple Courses simultaneously, and a Course can have many enrolled Students.</p>
      
      <div>
        {/* Create Form */}
        <div>
          <h3>Register New Student</h3>
          <form onSubmit={handleCreateStudent}>
            <label>Full Name: </label>
            <input 
              value={newStudent.name} 
              onChange={e => setNewStudent({...newStudent, name: e.target.value})} 
              placeholder="e.g. Jane Doe" 
            />
            <br />
            <label>Email Address: </label>
            <input 
              type="email"
              value={newStudent.email} 
              onChange={e => setNewStudent({...newStudent, email: e.target.value})} 
              placeholder="jane@university.edu" 
            />
            <br />
            
            <p>Enroll in Courses (N:M):</p>
            <div>
              {courses.length === 0 && <span>No courses available.</span>}
              {courses.map(course => (
                 <div key={course._id || course.id}>
                   <label>
                     <input 
                       type="checkbox" 
                       checked={newStudent.enrolledCourses.includes(course._id || course.id)}
                       onChange={() => handleToggleCourse(course._id || course.id)}
                     />
                     {course.name}
                   </label>
                 </div>
              ))}
            </div>
            <br />
            <button type="submit">Register Student</button>
          </form>
        </div>
        <hr />
        {/* Display List */}
        <div>
          {students.length === 0 ? <p>No students registered. Create one!</p> : null}
          {students.map(student => (
            <div key={student._id || student.id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
              <div>
                <h3>{student.name}</h3>
                <p>Email: {student.email}</p>
                <button onClick={async () => { await deleteStudent(student._id || student.id); refresh(); }}>
                  Remove Student
                </button>
              </div>

              <div>
                <h4>Enrolled Courses ({student.enrolledCourses?.length || 0})</h4>
                <ul>
                  {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
                     student.enrolledCourses.map(course => (
                       <li key={course._id || course.id}>
                         {course.name}
                       </li>
                     ))
                  ) : (
                     <li>Not enrolled in any courses.</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentModule;
