import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Courses
export const getCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// Lessons (1:N)
export const createLesson = (data) => api.post('/lessons', data);
export const deleteLesson = (id) => api.delete(`/lessons/${id}`);

// Students (N:M)
export const getStudents = () => api.get('/students');
export const createStudent = (data) => api.post('/students', data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;
