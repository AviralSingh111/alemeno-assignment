import { createSlice } from '@reduxjs/toolkit';
import courseData from './data.json';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: courseData.map(course => ({
      ...course,
      progress: course.enrollmentStatus === 'In Progress' ? Math.floor(Math.random() * 100) : 0,
      dueDate: course.enrollmentStatus === 'In Progress' ? 
        new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0] : null
    })),
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    enrollCourse: (state, action) => {
      const course = state.list.find(c => c.id === action.payload);
      if (course && course.enrollmentStatus === 'Open') {
        course.enrollmentStatus = 'In Progress';
        course.progress = Math.floor(Math.random() * 100);
        course.dueDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]; // 30 days from now
      }
    },
    markCourseCompleted: (state, action) => {
      const course = state.list.find(c => c.id === action.payload);
      if (course && course.enrollmentStatus === 'In Progress') {
        course.enrollmentStatus = 'Completed';
        course.progress = 100;
      }
    },
  },
});

export const { setSearchTerm, enrollCourse, markCourseCompleted } = coursesSlice.actions;
export default coursesSlice.reducer;