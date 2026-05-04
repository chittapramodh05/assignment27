import React, { useState, useEffect } from 'react';
import { getCourses, getStudents } from '../api';
import CourseModule from './CourseModule';
import StudentModule from './StudentModule';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');

  const loadData = async () => {
    try {
      const [courseRes, studentRes] = await Promise.all([
        getCourses(),
        getStudents()
      ]);
      setCourses(courseRes.data);
      setStudents(studentRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>University Management Dashboard</h1>
      <p>Capstone Demonstration: One-to-Many & Many-to-Many Relationships</p>
      
      <div>
        <button onClick={() => setActiveTab('courses')}>
          Courses & Lessons (1:N)
        </button>
        <button onClick={() => setActiveTab('students')}>
          Students (N:M)
        </button>
      </div>

      <div>
        {activeTab === 'courses' && (
          <CourseModule courses={courses} refresh={loadData} />
        )}
        
        {activeTab === 'students' && (
          <StudentModule students={students} courses={courses} refresh={loadData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
